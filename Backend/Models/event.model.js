import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  price: Number,
  startDate: Date,
  endDate: Date,
  bannerImage: String,
  saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Event = mongoose.model('Event', eventSchema);


// https://www.eporner.com/video-c5obBBNfK9h/heyzo-0288-uncensored/
// https://www.eporner.com/video-AfHyWsFpsOT/sexy-japanese-babe-miss-sana-minami-sucks-a-cock-and-gets-fucked-too/
