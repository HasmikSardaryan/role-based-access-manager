import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { invite_user , get_users, delete_user, activate_user, reset_password, new_password} from "../contollers/Post.controller.js";

const PostRouter = express.Router();

PostRouter.get("/api/users", get_users);
PostRouter.put('/api/users/:id/delete', verifyToken, delete_user)
PostRouter.post('/admin/invite-user', verifyToken, invite_user);
PostRouter.post('/activate/:token', activate_user);
PostRouter.post('/reset-password', reset_password);
PostRouter.post('/new-password', new_password);

export default PostRouter;
