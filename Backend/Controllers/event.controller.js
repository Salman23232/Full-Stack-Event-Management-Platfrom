import {Event}  from '../Models/event.model.js'
import { User } from '../Models/user.model.js'

export const createEvent = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if(user.role === 'admin'){
        const {title, description, category, location, price, startDate,endDate} = req.body
        const img = req.file?.path
        const event = await Event.create({
            title,
            description,
            category,
            location,
            price,
            startDate,
            endDate,
            bannerImage:img,
            createdBy:req.user._id,
        })
        user.createdEvents.push(event._id)
        await user.save()
        return res.status(200).json(event)
        } else{
            return res.status(403).json({message:'403 unauthorized!'})
        }
    } catch (error) {
        console.log(error);
        
    }
}
export const getAllEvent = async (req, res) => {
    try {
        const Events = await Event.find({}).populate('createdBy', '-password').populate('saves','name email').sort('createdAt')
        return res.status(200).json(Events)
    } catch (error) {
        console.log(error);
        
    }
}
export const saveEvent = async (req, res) => {
    try {
        // check if event is already in the array
        const {id} = req.params
        const event = await Event.findById(id)
        const user = await User.findById(req.user._id)
        const isSaved = user.savedEvents.includes(id)
        if (isSaved) {
            user.savedEvents.pull(id)
            event.saves.pull(req.user._id)
            await user.save()
            await event.save()
            return res.status(200).json({message:'Unsaved', user:user, event:event})
        }else{
            
            user.savedEvents.push(id)
            event.saves.push(req.user._id)
            await user.save()
            await event.save()
            return res.status(200).json({message:'Saved',user:user, event:event})
        }
    } catch (error) {
        console.log(error);
    }
}
export const findEventById = async (req, res) => {
    try {
        const {id} = req.params
        const event = await Event.findById(id).populate('createdBy', '-password').populate('saves','name email').sort('createdAt')
        return res.status(200).json(event)
    } catch (error) {
        console.log(error);
        
    }
}
export const updateEvent = async (req, res) => {
    try {
        const {id} = req.params
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
        return res.status(200).json(updatedEvent)
    } catch (error) {
        console.log(error);
    }
}
export const deleteEvent = async (req, res) => {
    try {
        const {id} = req.params
        const deletedEvent = await Event.findByIdAndDelete(id)
        return res.status(200).json(deletedEvent)
    } catch (error) {
        console.log(error);
    }
}

