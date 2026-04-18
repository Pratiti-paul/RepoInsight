import asyncio
from main import get_or_compute_review, ReviewRequest

async def main():
    print("Testing review_portfolio...")
    req = ReviewRequest(username="torvalds")
    try:
        # get_or_compute_review is synchronous
        res = get_or_compute_review(req.username)
        print("Result received successfully.")
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    asyncio.run(main())
