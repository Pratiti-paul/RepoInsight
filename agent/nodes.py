import os
import requests
import json
import re
from datetime import datetime
from collections import Counter
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
        # 1. Fetch User Profile Metadata
        user_url = f"https://api.github.com/users/{username}"
        user_resp = requests.get(user_url, headers=headers)
        user_profile = {
            "name": username,
            "followers": 0,
            "public_repos": 0,
            "created_at": "",
            "bio": "No bio provided"
        }
        
        if user_resp.status_code == 200:
            u = user_resp.json()
            user_profile = {
                "name": u.get("name") or username,
                "followers": u.get("followers", 0),
                "public_repos": u.get("public_repos", 0),
                "created_at": u.get("created_at", ""),
                "bio": u.get("bio") or "No bio provided"
            }

        # 2. Fetch Repositories
        repos_url = f"https://api.github.com/users/{username}/repos?per_page=100"
        repos_resp = requests.get(repos_url, headers=headers)
        
        if user_resp.status_code == 200 and repos_resp.status_code == 200:
            all_repos = repos_resp.json()
            
            # Compute General Metrics (using all fetched repos)
            total_stars = sum(r.get("stargazers_count", 0) for r in all_repos)
            langs = [r.get("language") for r in all_repos if r.get("language")]
            top_langs = [l for l, _ in Counter(langs).most_common(3)]
            
            # --- RANKING LOGIC ---
            # 1. Filter out Forks
            original_repos = [r for r in all_repos if not r.get("fork", False)]
            
            def calculate_repo_score(repo):
                # Raw Stats
                stars = repo.get("stargazers_count", 0)
                forks = repo.get("forks_count", 0)
                
                # Recency Score (updated_at)
                now = datetime.now()
                updated_at_str = repo.get("updated_at")
                updated_at = datetime.strptime(updated_at_str, "%Y-%m-%dT%H:%M:%SZ") if updated_at_str else now
                days_since_update = (now - updated_at).days
                
                if days_since_update < 30: recency_pts = 10
                elif days_since_update < 90: recency_pts = 7
                elif days_since_update < 365: recency_pts = 4
                else: recency_pts = 1
                
                # Activity Score (pushed_at)
                pushed_at_str = repo.get("pushed_at")
                pushed_at = datetime.strptime(pushed_at_str, "%Y-%m-%dT%H:%M:%SZ") if pushed_at_str else updated_at
                days_since_push = (now - pushed_at).days
                
                if days_since_push < 30: activity_pts = 10
                elif days_since_push < 90: activity_pts = 7
                elif days_since_push < 365: activity_pts = 4
                else: activity_pts = 1
                
                # Description Score
                desc = repo.get("description") or ""
                desc_pts = 10 if len(desc.strip()) > 20 else (5 if len(desc.strip()) > 0 else 0)
                
                # Formula: (stars * 0.4) + (forks * 0.2) + (recency * 0.2) + (activity * 0.1) + (desc * 0.1)
                # We cap raw stars/forks contribution to keep the score manageable
                base_score = (min(stars, 100) * 0.4) + (min(forks, 50) * 0.2) + (recency_pts * 0.2) + (activity_pts * 0.1) + (desc_pts * 0.1)
                
                # Penalties / Boosts
                bonus = 0
                penalty = 0
                
                # Penalty: Inactive > 2 years
                if days_since_update > 730: penalty = 5
                
                # Boost: Modern Tech (AI, Web, Cloud)
                modern_keywords = ['ai', 'ml', 'gpt', 'llm', 'react', 'nextjs', 'fastapi', 'cloud', 'aws', 'docker']
                text_to_scan = f"{repo.get('name', '')} {desc} {repo.get('language', '')}".lower()
                if any(kw in text_to_scan for kw in modern_keywords): bonus = 2
                
                score = max(0, base_score + bonus - penalty)
                
                # Ranking Reason helper
                if penalty > 0: reason = "Project is stale/inactive"
                elif stars > 50: reason = "Significant community trust and engagement"
                elif recency_pts == 10: reason = "Highly active project with recent updates"
                elif bonus > 0: reason = "Modern technology stack and relevant skills"
                else: reason = "Original project with clear scope"
                
                return score, reason

            scored_repos = []
            for r in original_repos:
                score, reason = calculate_repo_score(r)
                scored_repos.append({
                    "name": r.get("name") or "Unnamed",
                    "description": r.get("description") or "No description provided",
                    "stars": r.get("stargazers_count") or 0,
                    "forks": r.get("forks_count") or 0,
                    "language": r.get("language") or "Unknown",
                    "updated_at": r.get("updated_at") or "",
                    "score": round(score, 1),
                    "reason": reason
                })
            
            # Sort by Score descending
            scored_repos.sort(key=lambda x: x["score"], reverse=True)
            top_repos = scored_repos[:10]
            
            metrics = {
                "total_stars": total_stars,
                "top_languages": top_langs,
                "activity_level": "High" if any(r["score"] > 20 for r in scored_repos[:3]) else "Medium",
                "analyzed_count": len(all_repos)
            }
                    
            return {
                "github_data": top_repos,
                "user_profile": user_profile,
                "metrics": metrics
            }
        else:
            return {"github_data": {"error": f"API Error: User {username} not found."}}
            
    except Exception as e:
        return {"github_data": {"error": str(e)}}

def code_mentor_review(state: ReviewState):
    username = state["username"]
    repos = state.get("github_data", [])
    profile = state.get("user_profile", {})
    metrics = state.get("metrics", {})
    
    # 1. Build Structured Context String
    acc_age = "Unknown"
    if profile.get("created_at"):
        try:
            created_date = datetime.strptime(profile["created_at"], "%Y-%m-%dT%H:%M:%SZ")
            years = (datetime.now() - created_date).days // 365
            acc_age = f"{years} years" if years > 0 else "Less than 1 year"
        except:
            pass

    context = f"""DEVELOPER PROFILE:
- Username: {username}
- Account Age: {acc_age}
- Followers: {profile.get('followers', 0)}
- Public Repos: {profile.get('public_repos', 0)}
- Bio: {profile.get('bio', 'No bio provided')}

REPOSITORY SUMMARY:
- Total repos analyzed: {metrics.get('analyzed_count', 0)}
- Total stars: {metrics.get('total_stars', 0)}
- Top languages: {', '.join(metrics.get('top_languages', []))}
- Activity level: {metrics.get('activity_level', 'Medium')}"""

    # 2. Upgraded Persona & Tasks
    prompt = f"""You are a senior software engineer and hiring manager evaluating a GitHub portfolio.

DEVELOPER CONTEXT:
{context}

REPOSITORIES TO ANALYZE (detailed data for top {len(repos)} repos):
{json.dumps(repos, indent=2)}

QUALITY RUBRIC (use this strictly):
- Beginner: no README, single file, no structure, tutorial/copy-paste level
- Intermediate: has README, organized folders, some abstraction, no tests or CI
- Strong: README + tests or CI/CD, clear architecture, non-trivial original logic

SCORING RUBRIC (score each project out of 10):
- Code complexity & originality: 0-3 pts (0 = copied tutorial, 3 = original non-trivial logic)
- Project completeness: 0-2 pts (0 = abandoned/empty, 2 = working with README and clear purpose)
- Best practices: 0-2 pts (0 = none, 2 = has tests, CI/CD, or meaningful commit history)
- Real-world usefulness: 0-2 pts (0 = no practical use, 2 = solves a real problem)
- Documentation quality: 0-1 pt (0 = no README, 1 = clear README with setup instructions)

STRICT RULES:
- Base ALL analysis ONLY on the provided developer profile and repository statistics.
- If description is missing, say "No description provided" — do NOT invent purpose.
- Be specific: reference actual repo names, languages, and signals in the data.
- Never use phrases like "diverse tech stack" or "strong foundation".
- Scores must be justified by specific signals in the data (e.g., "High star count suggests community trust").

TASKS:
1. For EACH repository: assess purpose, identify stack, evaluate quality, score it out of 10 (with breakdown), and give 1 specific actionable improvement.
2. Identify top 3 strongest projects with reasoning tied to specific signals.
3. List technical strengths as patterns (e.g., "Strong mastery of C++ system libraries").
4. List concrete weaknesses (e.g. "0 of 10 repos have unit tests").
5. List missing skills based on gaps (e.g. "No evidence of cloud deployment or CI/CD").
6. Flag any red flags (e.g. "Multiple years of inactivity", "Plagiarized tutorials").
7. Give an OVERALL portfolio score out of 10 (average) and assess hireability.

Return STRICT JSON only:
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
    "summary": "Assess hireability (High/Medium/Low) and explain reasoning here."
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
