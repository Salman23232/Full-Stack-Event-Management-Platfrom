import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./Routes/auth.route.js";
import userRouter from "./Routes/user.route.js";
import { connectDB } from "./connectDB.js";
import eventRouter from "./Routes/event.route.js";

dotenv.config();

const app = express();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
