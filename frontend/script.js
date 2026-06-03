async function generatePost() {

    const topic = document.getElementById("topic").value;
    const tone = document.getElementById("tone").value;

    const loading = document.getElementById("loading");

    loading.innerHTML = "Generating post...";

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/generate-post",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    topic,
                    tone
                })
            }
        );

        const data = await response.json();

        document.getElementById("result").innerText =
            data.post;

    } catch (error) {

        document.getElementById("result").innerText =
            "Error: " + error.message;
    }

    loading.innerHTML = "";
}
function copyPost() {
    const text = document.getElementById("result").innerText;

    navigator.clipboard.writeText(text);

    alert("Post copied successfully!");
}
document.getElementById("topic").addEventListener("input", function () {
    document.getElementById("counter").innerText =
        this.value.length + " characters";
});