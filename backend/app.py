from flask import Flask, request, jsonify
from ai_service import generate_linkedin_post
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI LinkedIn Post Generator Backend Running!"
@app.route("/generate-post", methods=["POST"])
def generate_post():

    data = request.get_json()

    topic = data.get("topic")
    tone = data.get("tone")

    post = generate_linkedin_post(topic, tone)

    return jsonify({
        "post": post
    })


if __name__ == "__main__":
    app.run(debug=True)