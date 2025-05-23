import express from "express";
import {
  register_post,
  login_post,
  logout_post,
} from "../contollers/Auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const AuthRouter = express.Router();
AuthRouter.post("/register", register_post);
AuthRouter.post("/login", login_post);
AuthRouter.post("/logout", logout_post);

export default AuthRouter;
