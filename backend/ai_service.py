from openai import OpenAI
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_linkedin_post(topic, tone):
    try:

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": f"Write a {tone} LinkedIn post about: {topic}"
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:

        print("ERROR:", e)

        return f"""
🚀 Excited to share my latest achievement!

{topic}

This project helped me strengthen my skills in AI, Python, Flask, and web development.

I enjoyed solving real-world challenges and learning throughout the development process.

Looking forward to building more impactful projects!

#AI #Python #Flask #OpenAI #LinkedIn
"""