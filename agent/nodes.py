import os
import requests
import json
import re
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from .state import ReviewState

load_dotenv()

# Set up the Groq AI brain using Llama 3.1
llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.0)

def extract_github_data(state: ReviewState):
    username = state["username"]
    github_token = os.getenv("GITHUB_TOKEN")
    headers = {"Authorization": f"Bearer {github_token}"} if github_token else {}
    
    try:
        user_url = f"https://api.github.com/users/{username}"
        user_resp = requests.get(user_url, headers=headers)
        
        repos_url = f"https://api.github.com/users/{username}/repos?per_page=100"
        repos_resp = requests.get(repos_url, headers=headers)
        
        if user_resp.status_code == 200 and repos_resp.status_code == 200:
            repos_data = repos_resp.json()
            
            # Sort by stargazers_count descending and updated_at descending
            repos_data.sort(key=lambda x: (x.get("stargazers_count") or 0, x.get("updated_at") or ""), reverse=True)
            top_repos = repos_data[:10]
            
            detailed_repos = []
            for repo in top_repos:
                detailed_repos.append({
                    "name": repo.get("name") or "",
                    "description": repo.get("description") or "",
                    "stars": repo.get("stargazers_count") or 0,
                    "forks": repo.get("forks_count") or 0,
                    "language": repo.get("language") or "",
                    "updated_at": repo.get("updated_at") or ""
                })
                    
            return {"github_data": detailed_repos}
        else:
            return {"github_data": {"error": f"API Error: User {username} not found."}}
            
    except Exception as e:
        return {"github_data": {"error": str(e)}}

def code_mentor_review(state: ReviewState):
    username = state["username"]
    repos = state.get("github_data", [])
    context = f"GitHub Username: {username}"
    
    prompt = f"""You are a senior software engineer conducting a portfolio review.

DEVELOPER CONTEXT:
{context}

REPOSITORIES TO ANALYZE (exactly {len(repos)} repos):
{json.dumps(repos, indent=2)}

QUALITY RUBRIC (use this strictly):
- Beginner: no README, single file, no structure, tutorial/copy-paste level
- Intermediate: has README, organized folders, some abstraction, no tests or CI
- Strong: README + tests or CI/CD, clear architecture, non-trivial original logic

SCORING RUBRIC (use this to score each project out of 10):
- Code complexity & originality: 0-3 pts (0 = copied tutorial, 3 = original non-trivial logic)
- Project completeness: 0-2 pts (0 = abandoned/empty, 2 = working with README and clear purpose)
- Best practices: 0-2 pts (0 = none, 2 = has tests, CI/CD, or meaningful commit history)
- Real-world usefulness: 0-2 pts (0 = no practical use, 2 = solves a real problem)
- Documentation quality: 0-1 pt (0 = no README, 1 = clear README with setup instructions)

STRICT RULES:
- Base ALL analysis ONLY on the provided repository data
- If description is missing, say "No description provided" — do NOT invent purpose
- Be specific: reference actual repo names, languages, and topics
- Never use phrases like "diverse tech stack" or "strong foundation"
- Same input must always produce same output
- Scores must be justified by specific signals in the data, not assigned randomly

TASKS:
1. For EACH repository:
   - Summarize purpose (from description and topics only)
   - Identify tech stack
   - Evaluate quality using the rubric above
   - Score it out of 10 using the scoring rubric above, showing the breakdown
   - Give 1 specific actionable improvement

2. Identify top 3 strongest projects with reasoning tied to specific signals
3. List technical strengths as patterns you see across multiple repos
4. List concrete weaknesses (e.g. "0 of 10 repos have tests")
5. List missing skills based on gaps in the stack
6. Flag any red flags honestly
7. Give an OVERALL portfolio score out of 10 (average of all project scores, rounded to 1 decimal)

Return STRICT JSON only, no markdown, no explanation outside the JSON:
{{
  "projects": [{{
    "name": "",
    "summary": "",
    "tech_stack": [],
    "quality": "Beginner | Intermediate | Strong",
    "score": {{
      "total": 0,
      "breakdown": {{
        "complexity_originality": 0,
        "completeness": 0,
        "best_practices": 0,
        "real_world_usefulness": 0,
        "documentation": 0
      }},
      "justification": ""
    }},
    "improvement": ""
  }}],
  "top_projects": [{{
    "name": "",
    "score": 0,
    "reasoning": ""
  }}],
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "red_flags": [],
  "overall_portfolio_score": {{
    "score": 0.0,
    "summary": ""
  }}
}}"""

    response = llm.invoke([HumanMessage(content=prompt)])
    
    try:
        content = response.content.strip()
        
        # Extract JSON using regex to handle extra preamble or postamble
        match = re.search(r'```(?:json)?\s*(.*?)\s*```', content, re.DOTALL)
        if match:
            clean_content = match.group(1)
        else:
            # Fallback if no markdown blocks are used
            clean_content = content
            
        parsed_feedback = json.loads(clean_content.strip())
    except json.JSONDecodeError as e:
        print("JSON DECODE ERROR:", e)
        print("FAILED ON CONTENT:", content)
        # Fallback if malformed
        parsed_feedback = {
            "projects": [],
            "top_projects": [],
            "strengths": [],
            "weaknesses": ["Failed to parse AI response. Please try again."],
            "missing_skills": [],
            "red_flags": [],
            "overall_portfolio_score": {
                "score": 0.0,
                "summary": "Parse failure."
            }
        }

    return {"feedback": parsed_feedback}
