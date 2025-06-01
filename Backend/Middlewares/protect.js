import jwt from 'jsonwebtoken'
import { User } from '../Models/user.model.js';
export const protect = async (req, res, next) => {
      let token = req.cookies.ev_token;
      if(!token) return res.status(401).json({message:"Unauthorized!"})

  if (token) {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.userId);
      
      req.user = await User.findById(decoded.userId).select("-password");
      req.userId = decoded.userId
      next();
}
}