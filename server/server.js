import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userroutes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();
const port = process.env.Port || 3000;
await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server is Live!"));

app.use(requireAuth());

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

export default async function handler(req, res) {
  try {
    await ensureCloudinary();
  } catch (e) {
    console.error("Cloudinary init failed:", e);
    // still respond; your routes may not need Cloudinary for every request
  }
  return app(req, res);
}
