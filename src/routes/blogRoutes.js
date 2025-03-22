import {Router} from "express"
import {blogController} from "../controller/index.js"

const router = Router()

router.get("/admin", blogController.adminPage)
router.get("/",blogController.findAll)
router.get("/home", blogController.findHome)
router.get("/article/:id", blogController.findArticleById)
router.get("/edit", blogController.adminEditPage)
router.get("/add", blogController.adminAddPage)
router.get("/:id",blogController.findOne)
router.post("/",blogController.create)
router.put("/:id",blogController.update)
router.delete("/:id",blogController.delete)



export {router as blogRoutes}