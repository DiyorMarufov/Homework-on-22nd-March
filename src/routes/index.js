import { Router } from "express";
import { blogRoutes } from "./blogRoutes.js";

const router = Router()

router.use("/blog", blogRoutes)

export {router as apiRouter}