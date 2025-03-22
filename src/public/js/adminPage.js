const ulElement = document.querySelector(".titleUl")
const divHeadElement = document.querySelector(".head-content") 

const addButton = document.createElement("button")
addButton.classList.add("addBtn")
addButton.textContent = "+ Add"
divHeadElement.appendChild(addButton)

getData("http://localhost:2000/blog").then(data =>{
    
    data.forEach(element => {
        
       
        const liTitle = document.createElement("li")
        const div = document.createElement("div")
        div.classList.add("titleDiv")

        const h4 = document.createElement("h4")
        const editButton = document.createElement("button")
        const deleteButton = document.createElement("button")
        
        editButton.classList.add("editBtn")
        deleteButton.classList.add("deleteBtn")
        
        h4.textContent = element.title
        editButton.textContent = "Edit"
        deleteButton.textContent = "Delete"
        
        deleteButton.dataset.id = element.id 

        div.appendChild(h4)
        div.appendChild(editButton)
        div.appendChild(deleteButton)
        

        liTitle.appendChild(div)
        ulElement.appendChild(liTitle)

        
        editButton.addEventListener("click", (e)=>{
            
            e.preventDefault()

            window.location.href = "/blog/edit"
            
        })

        addButton.addEventListener("click", (e)=>{
             
            e.preventDefault()

            window.location.href = "/blog/add"
        })

        deleteButton.addEventListener("click", async (e)=>{
            
            e.preventDefault()
            
            try {
                const targetId = e.currentTarget.dataset.id
                
                if(!targetId){
                    throw new Error('Target ID not found')
                }
                const response = await fetch(`http://localhost:2000/blog/${targetId}`,{
                    method: "DELETE"
                })

                if(!response.ok){
                   throw new Error('Data not found or could not be deleted')
                }

                liTitle.remove();
            } catch (error) {
                alert(error.message)
            }
        })
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