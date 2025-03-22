import express from "express"
import { apiRouter } from "./routes/index.js"
import cors from "cors"
import path from "node:path"
import { errorMiddleware } from "./middleware/index.js";

const app = express()

const PORT = process.env.PORT || 2000

app.use(express.static(path.join(process.cwd(), "src","public")))
// Middleware
app.use(express.json())
app.use(cors())

app.use("/", apiRouter)

app.use(errorMiddleware)

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))