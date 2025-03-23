import {join} from "node:path"
import { readBlog, writeBlog } from "../libs/index.js"

export const blogController = {

    findAll: async (req,res,next)=>{
        
        try {
            
            const blogs = await readBlog()
            res.status(200).json({data:blogs})

        } catch (error) {            
            next(error)
        }

    },
    
    findHome: (req,res,next)=>{
        
        try {
            const filePath = join(process.cwd(), "src","public","html","homePage.html")
            res.sendFile(filePath)
        } catch (error) {
            next(error)
        }
    },

    findOne: async (req,res,next)=>{
        
        try {
            
            const {id} =  req.params
            const blogs =  await readBlog()
            const blog = blogs.find(element => element.id === +id)
            
            if(!blog){
               throw new Error('Blog not found')
            }

            res.status(200).json({data:blog})

        } catch (error) {
            next(error)
        }
    },

    findArticleById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const datas = await readBlog();
            const data = datas.find(elem => elem.id == id);

            if (!data) {
                return res.status(404).json({ message: "Maqola topilmadi!" });
            }

            const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${data.title}</title>
                <link rel="stylesheet" href="/css/article.css">
            </head>
            <body>
                
                <div class="main-container">
                    <h1>${data.title}</h1>
                    <p>${data.publishedDate}</p>
                    <p>${data.content}</p>
                </div>
                
            </body>
            </html>
        `;

        res.send(htmlContent);
        } catch (error) {
            next(error);
        }
    },

    adminPage:(req,res,next)=>{
        
        try {
            
            const filePath = join(process.cwd(),"src","public","html","adminPage.html")
            res.sendFile(filePath)

        } catch (error) {
            next(error)
        }
    },


    create: async (req, res, next) => {
        try {
            const { title, content, publishedDate } = req.body;
    
            const blogs = await readBlog();
            let newId = blogs.length ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
    
            const blog = { id: newId, title, content, publishedDate };
            blogs.push(blog);
    
            await writeBlog(blogs);
    
            res.status(201).json({data: blog });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const data = req.body;
            const { id } = req.params;
    
            let blogs = await readBlog(); 
            let blogIndex = blogs.findIndex(blog => blog.id === +id);
    
            if (blogIndex === -1) {
                return res.status(404).json({ message: "Maqola topilmadi!" });
            }
    
            const newArticle = {
                ...blogs[blogIndex],
                ...data
            }
            
            blogs.splice(blogIndex,1,newArticle)
            await writeBlog(blogs);
            res.status(200).json({data: newArticle })
        } catch (error) {
            next(error);
        }
    },
    

    adminEditPage:(req,res,next)=>{
        
        try {
            
            const filePath = join(process.cwd(),"src", "public","html","adminEdit.html")
            res.sendFile(filePath)

        } catch (error) {
            next(error)
        }
    },

    adminAddPage:(req,res,next)=>{
        
        try {
            
            const filePath = join(process.cwd(),"src", "public","html","adminAdd.html")
            res.sendFile(filePath)
            
        } catch (error) {
            next(error)
        }
    },


    delete: async (req,res,next)=>{
        
        try {
            
            const {id} = req.params
            let blogs = await readBlog()

            const index = blogs.findIndex(element => element.id == id)

            if(index === -1){
                throw new Error(`${id} not found`)
            }

            blogs.splice(index,1)
            await writeBlog(blogs)

            res.status(200).json({ message: "Blog deleted successfully" });
        } catch (error) {
            next(error)
        }

    }
}