import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";


// middlewares
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: "*",
    credentials: true
}));




// db connection
const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .catch((err) => { throw err });
}

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);
app.get("/", (req, res) => {
    res.send("hello")
})


// error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).send({
        success: false,
        status: errorStatus,
        message: errorMessage,
    });
})


// server
app.listen(process.env.PORT || 8800, () => {
    connect();
})


