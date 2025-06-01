import e from "express"
import { findUserById, getAllUser, getLoggedInUser, updateUser } from "../Controllers/user.controller.js"
import { protect } from "../Middlewares/protect.js"

const userRouter = e.Router()
userRouter.get('/me', protect, getLoggedInUser)
userRouter.get('/',protect, getAllUser)
userRouter.get('/:id', protect, findUserById)
userRouter.put('/:id', protect, updateUser)


export default userRouter