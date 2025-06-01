import e from "express"
import { protect } from "../Middlewares/protect.js"
import { upload } from "../Middlewares/fileUpload.js"
import { createEvent, deleteEvent, findEventById, getAllEvent, saveEvent, updateEvent } from "../Controllers/event.controller.js"
import { isAdmin } from "../Middlewares/isAdmin.js"

const eventRouter = e.Router()
eventRouter.post('/',protect, isAdmin, upload.single('image'), createEvent)
eventRouter.get('/',protect, getAllEvent)
eventRouter.get('/:id',protect, findEventById)
eventRouter.put('/:id',protect, isAdmin, updateEvent)
eventRouter.delete('/:id',protect, isAdmin, deleteEvent)
eventRouter.put('/:id',protect, isAdmin, updateEvent)
eventRouter.put('/save/:id',protect, saveEvent)
export default eventRouter
