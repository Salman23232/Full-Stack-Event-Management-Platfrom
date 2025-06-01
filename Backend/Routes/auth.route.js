import e from "express"
import { login, logout, signup } from "../Controllers/auth.controller.js"
import { upload } from "../Middlewares/fileUpload.js"

const authRouter = e.Router()
authRouter.post('/signup',upload.single('image'), signup)
authRouter.post('/login',login)
authRouter.post('/logout',logout)

export default authRouter