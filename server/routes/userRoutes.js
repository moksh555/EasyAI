import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getUserCreations,
  getPublishedImage,
  toggleLikeCreation,
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/get-user-creations", auth, getUserCreations);

userRouter.get("/get-published-creations", auth, getPublishedImage);

userRouter.post("/toggle-like-creation", auth, toggleLikeCreation);

export default userRouter;
