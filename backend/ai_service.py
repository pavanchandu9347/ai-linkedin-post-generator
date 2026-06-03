def generate_linkedin_post(topic, tone):

    prompt = f"""
Create a LinkedIn post.

Topic: {topic}
Tone: {tone}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return "AI service unavailable. Please check API billing or quota."