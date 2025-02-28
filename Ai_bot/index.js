const apiKey = "YOUR_OPENAI_API_KEY"; // ضع مفتاح API هنا

document.getElementById("generateBtn").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value;
    const imagesContainer = document.querySelector(".images-container");
    
    if (!prompt) {
        alert("Please enter a prompt!");
        return;
    }

    imagesContainer.innerHTML = "<p>Generating images...</p>";

    const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: prompt,
            n: 3,
            size: "256x256"
        }),
    });

    if (!response.ok) {
        imagesContainer.innerHTML = "<p>Failed to fetch images. Try again!</p>";
        return;
    }

    const data = await response.json();
    imagesContainer.innerHTML = "";

    data.data.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imagesContainer.appendChild(imgElement);
    });
});
