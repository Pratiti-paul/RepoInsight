from typing import TypedDict

# This defines the data our agents will pass to each other
class ReviewState(TypedDict):
    username: str
    github_data: list  
    user_profile: dict
    metrics: dict
    feedback: dict

