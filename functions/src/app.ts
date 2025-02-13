import * as functions from "firebase-functions";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { taskRouter } from "./routes/task.router";
import userRouter from "./routes/user.router";
import "./config/firebase";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/task", taskRouter);
app.use("/api/users", userRouter);

export const api = functions.https.onRequest(app);
export default app;
