import bcryptjs from "bcryptjs";
import mongoose from "mongoose"; 

export const userSchema = new mongoose.Schema({
  username:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String,required:true},
  profilePicture:String,
  role:{type:String,enum:['admin','user'], default:'user'},
  savedEvents:[{type:mongoose.Schema.Types.ObjectId, ref:'Event'}],
  createdEvents:[{type:mongoose.Schema.Types.ObjectId, ref:'Event'}]
},{timestamps:true})

userSchema.pre('save',async function (next) {
  if(!this.isModified('password')) return next()
  this.password = await bcryptjs.hash(this.password,10)
  next()
})
userSchema.methods.isMatched = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}
export const User = mongoose.model('User', userSchema)

