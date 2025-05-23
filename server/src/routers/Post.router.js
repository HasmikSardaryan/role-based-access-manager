import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";
import { invite_user , get_users, get_photo,
         delete_user, activate_user,
         reset_password, new_password, edit_email} from "../contollers/Post.controller.js";

const PostRouter = express.Router();

PostRouter.get("/api/users", get_users);
PostRouter.put('/api/users/:id/delete', verifyToken, delete_user)
PostRouter.post('/admin/invite-user', verifyToken, invite_user);
PostRouter.post('/activate/:token', upload.single('photo') , activate_user);
PostRouter.post('/reset-password', reset_password);
PostRouter.post('/new-password', new_password);
PostRouter.patch('/edit/email/:userId', verifyToken, edit_email);
PostRouter.get('/api/photos/:photo_id', get_photo);

export default PostRouter;
