const ulElement = document.querySelector(".titleUl")

getData("http://localhost:2000/blog").then(data =>{
    
    data.forEach(element => {
        
        const liTitle = document.createElement("li")
        const div = document.createElement("div")
        div.classList.add("titleDiv")
        const h4 = document.createElement("h4")
        const p = document.createElement("p")

        h4.textContent = element.title
        p.textContent = element.publishedDate

        div.appendChild(h4)
        div.appendChild(p)

        liTitle.appendChild(div)
        ulElement.appendChild(liTitle)
        

    });




}).catch((e) => {    
    alert(e.message)
})


async function getData(url) {
    
    try {
        
        const response = await fetch(url)
        
        if(!response.ok){
           alert(response.message)
        }

        const { data } = await response.json()
        return data


    } catch (error) {
        throw new Error(error.message)
    }
}

