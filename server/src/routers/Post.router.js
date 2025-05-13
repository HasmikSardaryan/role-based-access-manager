import express from "express";
import { create_post, get_posts, get_user,
        get_post, post_comment, get_comments,
        get_user_posts, get_allcomments,
        get_commentById, post_reply, get_reply} from "../contollers/Post.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const PostRouter = express.Router();

PostRouter.get("/posts", get_posts);
PostRouter.get("/user/:id", get_user);
PostRouter.get("/comments/:id", get_comments);
PostRouter.post("/submit", verifyToken, create_post);
PostRouter.get("/comments/post/:postId", get_post);
PostRouter.post('/comments/:id',verifyToken, post_comment);
PostRouter.get('/users/:id/posts', get_user_posts);
PostRouter.get('/comments', get_allcomments);
PostRouter.get('/comment/:commentId', get_commentById);
PostRouter.post('/reply/:id', verifyToken, post_reply);
PostRouter.get('/replies/:id', get_reply);
export default PostRouter;
