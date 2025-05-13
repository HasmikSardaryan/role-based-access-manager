import User from "../schemas/User.js";
import Comment from "../schemas/comment.js";
import Post from "../schemas/Post.js";
import Reply from "../schemas/reply.js";

export const create_post = async (req, res) => { 
  const { title, url, text } = req.body;
  
  if (!title || !url) {
    return res.status(400).json({ error: 'Missing title or url' });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newPost = new Post({ title, url, author: user._id });
    const savedPost = await newPost.save();

    user.posts.push(savedPost._id);
    await user.save();

    res.status(201).json({ message: 'Post created successfully!', post: savedPost });

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
export const get_posts = async (req, res) => {
    try {
      const posts = await Post.find({}).populate("author", "username");
      res.json(posts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      res.status(500).json({ error: "Server Error" });
    }
};
export const get_user = async (req, res) =>  {
    try {
      const user = await User.findById(req.params.id).populate("posts");
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Server error' });
    }
};
export const post_comment = async (req, res) => {
  const { text } = req.body;
  const postId = req.params.id;

  if (!text) return res.status(400).json({ error: 'Missing text' });

  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(postId);

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = await Comment.create({ text, author: user._id });

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({ message: 'Comment created!', comment });
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
export const get_comments = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      });  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json(post.comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};
export const get_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    .populate('author', 'username')
    .populate('comments');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
export const get_commentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
    .populate("author", "username") 
    .populate("children"); 
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
export const get_user_posts = async (req, res) => {

  const { id } = req.params;

  try {
    const posts = await Post.find({ author: id }).populate("author", "username");
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.json(posts);
  } catch (err) {
    console.error("Failed to fetch user posts:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
export const get_allcomments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("author", "username") 
      .populate("children");           
      return res.json(comments);
  } catch (err) {
    console.error("Failed to fetch comments:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const post_reply = async (req, res) => {
  const { text } = req.body;
  const id = req.params.id;

  if (!text) return res.status(400).json({ error: 'Missing text' });

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const user = req.user;
    if (!user) return res.status(401).json({ error: 'no token' });

    const reply = await Reply.create({
      text,
      author: user.username,
      parent: comment._id
    });

    comment.children.push(reply._id);
    await comment.save();

    res.status(201).json({ message: 'Reply created!', reply });
  } catch (err) {
    console.error('Error creating reply:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const get_reply =  async (req, res) => {
  try {
    const replies = await Reply.find({ parent: req.params.id })
      .populate( 'parent', 'text')
      .sort({ time: 1 });
    res.status(200).json(replies);
  } catch (err) {
    console.error('Error fetching replies:', err);
    res.status(500).json({ error: 'Server error' });
  }
};