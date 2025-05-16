import express from "express";
import {
  register_post,
  login_post,
  logout_post,
  activate_user,
} from "../contollers/Auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const AuthRouter = express.Router();
AuthRouter.post("/register", register_post);
AuthRouter.post("/login", login_post);
AuthRouter.post("/logout", logout_post);
AuthRouter.post("/activate/:token", activate_user);

export default AuthRouter;
