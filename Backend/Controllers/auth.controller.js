import { User } from "../Models/user.model.js"
import jwt from 'jsonwebtoken'
export const signup = async (req, res) => {
    try {
      const {username, email, password} = req.body
    const profilePicture = req.file?.path
    //check if user already exists
    const user = await User.findOne({email})
    if(user) return res.status(401).json({message:'user with the email already exists'})
    const newUser = await User.create({
        username,
        email,
        password,
        profilePicture
})
return res.status(201).json(newUser)
    } catch (error) {
      console.log(error);
      
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
if (!user || !(await user.isMatched(password))) {
  return res.status(400).json({ message: "Incorrect email or password" });
}
    const payload = await jwt.sign({userId:user._id}, process.env.JWT_SECRET)
            if (user) {
            res.cookie('ev_token', payload, {
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV === "production",
            maxAge:30 * 24 * 60 * 60 * 1000
            })
            return res.status(201).json(
              user
            )
        }
};

export const logout =async (req, res) => {
          return res.cookie('token', '',{maxAge:0}).json({
          success: true,
          message: "Logged out successfully",})
          }


