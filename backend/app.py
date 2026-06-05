from flask import Flask, request, jsonify, render_template
from ai_service import generate_linkedin_post
from flask_cors import CORS

app = Flask(
    __name__,
    template_folder="../templates",
    static_folder="../static"
)

CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

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