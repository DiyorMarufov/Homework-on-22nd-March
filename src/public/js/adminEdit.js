const titleElement = document.querySelector("#title");
const dateElement = document.querySelector("#date");
const contentElement = document.querySelector("#content");
const updateBtn = document.querySelector(".main-form");

const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("id"); 

if (!articleId) alert("ID topilmadi!");

async function loadArticle() {
    try {
        const response = await fetch(`http://localhost:2000/blog/${articleId}`)
        if (!response.ok) throw new Error("Maqolani olishda xatolik!");
        
        const responseData = await response.json();
        const data = responseData.data

        titleElement.value = data.title;
        dateElement.value = data.publishedDate;
        contentElement.value = data.content;
    } catch (error) {
        alert(error.message);
    }
}

updateBtn.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const updatedArticle = {
            title: titleElement.value,
            publishedDate: dateElement.value,
            content: contentElement.value
        };

        const response = await fetch(`http://localhost:2000/blog/${articleId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedArticle)
        });

        if (!response.ok) throw new Error("Maqolani yangilashda xatolik!");

        alert("Maqola muvaffaqiyatli yangilandi!");
        window.location.href = "/admin"; 
    } catch (error) {
        alert(error.message);
    }
});

loadArticle();
