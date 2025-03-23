const titleElement = document.querySelector("#title");
const dateElement = document.querySelector("#date");
const contentElement = document.querySelector("#content");
const updateBtn = document.querySelector(".main-form");

const articleId = localStorage.getItem("lastEditedArticle")

if(!articleId){
    alert(`${articleId} not found`)
    window.location.href = "/admin"
} 


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

        window.location.href = "/blog/admin"; 
    } catch (error) {
        alert(error.message);
    }
});

loadArticle();
