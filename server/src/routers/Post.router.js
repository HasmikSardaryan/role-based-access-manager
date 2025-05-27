import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";
import { invite_user , get_users,
         delete_user, activate_user,
         reset_password, new_password,
         edit_user} from "../contollers/Post.controller.js";

const PostRouter = express.Router();

PostRouter.get("/api/users", verifyToken, get_users); //correct
PostRouter.put('/api/users/:id/delete', verifyToken, delete_user) //correct
PostRouter.post('/admin/invite-user', verifyToken, invite_user); // correct
PostRouter.post('/activate/:token', upload.single('photo') , activate_user); //correct
PostRouter.post('/reset-password', reset_password);
PostRouter.post('/new-password', new_password);
PostRouter.patch('/edit/user/:userId', verifyToken, upload.single('photo'), edit_user);

export default PostRouter;
