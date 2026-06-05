const topicInput = document.getElementById("topic");
const counter = document.getElementById("counter");
const resultBox = document.getElementById("result");

// Character Counter
topicInput.addEventListener("input", function () {
    counter.innerText = `${this.value.length} characters`;
});

// Generate LinkedIn Post
async function generatePost() {
    const topic = document.getElementById("topic").value.trim();
    const tone = document.getElementById("tone").value;

    if (!topic) {
        alert("Please enter a topic or achievement.");
        return;
    }

    resultBox.innerHTML = "⏳ Generating your LinkedIn post...";

    try {
        const response = await fetch(
            "http://127.0.0.1:5000/generate-post",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    topic: topic,
                    tone: tone
                })
            }
        );

        const data = await response.json();

        if (data.post) {
            resultBox.innerText = data.post;
        } else if (data.error) {
            resultBox.innerText = "❌ " + data.error;
        } else {
            resultBox.innerText =
                "⚠️ Unexpected response received.";
        }
    } catch (error) {
        console.error(error);

        resultBox.innerText =
            "❌ Unable to connect to backend server.";
    }
}

// Copy Generated Post
function copyPost() {
    const text = resultBox.innerText;

    if (
        text === "" ||
        text === "Your generated LinkedIn post will appear here..."
    ) {
        alert("No post available to copy.");
        return;
    }

    navigator.clipboard.writeText(text);

    alert("✅ Post copied successfully!");
}