const titleElement = document.querySelector("#title");
const dateElement = document.querySelector("#date");
const contentElement = document.querySelector("#content");
const publishForm = document.querySelector(".main-form");

publishForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleElement.value.trim();
    const publishedDate = dateElement.value.trim();
    const content = contentElement.value.trim();


    try {
        const postResponse = await fetch("http://localhost:2000/blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content, publishedDate }) 
        });

        if (!postResponse.ok) {
            throw new Error("Maqola qoshishda xatolik yuz berdi!");
        }

        window.location.href = "/blog/admin"; 
    } catch (error) {
        alert(error.message);
    }
});
