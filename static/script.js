const topicInput = document.getElementById("topic");
const counter = document.getElementById("counter");
const resultBox = document.getElementById("result");

const recentPosts = [
    "Built a Chatbot using NLP and Python",
    "Created an AI Resume Screening System using Python",
    "Developed a Machine Learning model to predict student performance",
    "Built an AI LinkedIn Post Generator using Flask and OpenAI"
];

topicInput.addEventListener("input", () => {

    counter.innerText =
        topicInput.value.length + " characters";
});

function loadRecentPosts() {

    const container =
        document.getElementById("recentPosts");

    container.innerHTML = "";

    recentPosts.forEach(post => {

        const div =
            document.createElement("div");

        div.classList.add("recent-post");

        div.innerText = post;

        div.addEventListener("click", () => {

            topicInput.value = post;

            counter.innerText =
                post.length + " characters";
        });

        container.appendChild(div);
    });
}

async function generatePost() {

    const topic =
        topicInput.value.trim();

    const tone =
        document.getElementById("tone").value;

    const btn =
        document.getElementById("generateBtn");

    if (!topic) {
        alert("Please enter a topic");
        return;
    }

    btn.innerText = "⏳ Generating...";
    btn.disabled = true;

    resultBox.innerHTML = "Generating post...";

    try {

        const response =
            await fetch("/generate-post", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    topic,
                    tone
                })

            });

        const data =
            await response.json();

        resultBox.innerText =
            data.post;

        document.getElementById("charCount")
            .innerText =
            "Characters: " +
            data.post.length;

        document.getElementById("wordCount")
            .innerText =
            "Words: " +
            data.post.split(" ").length;

    } catch (error) {

        resultBox.innerText =
            "❌ Backend connection failed";

        console.log(error);
    }

    btn.innerText = "⚡ Generate Post";
    btn.disabled = false;
}

function copyPost() {

    navigator.clipboard.writeText(
        resultBox.innerText
    );

    alert("Post Copied!");
}

function downloadPost() {

    const text =
        resultBox.innerText;

    const blob =
        new Blob([text], {
            type: "text/plain"
        });

    const a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download =
        "linkedin_post.txt";

    a.click();
}

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerText =
            "☀ Light Mode";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }else{

        themeBtn.innerText =
            "🌙 Dark Mode";

        localStorage.setItem(
            "theme",
            "light"
        );
    }

});

window.onload = () => {

    loadRecentPosts();

    if(localStorage.getItem("theme")
        === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerText =
            "☀ Light Mode";
    }
};