const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  console.log("blogsRoute: hello from inside POST");
  const { title, author, url, likes } = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  // const user = await User.findById(decodedToken.id);
  const user = request.user;

  console.log("user from blogsRouter.post: ", user);

  if (!user) {
    return response.status(400).send("No user found. Create a user first.");
  }

  if (!title || !author) {
    return response.status(400).send("Title and author are required");
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user.id,
  });

  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "Token invalid" });
    }

    // const user = await User.findById(decodedToken.id);
    const user = request.user;

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // Check if the blog with the given ID belongs to the user
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "Unauthorized: Blog does not belong to the user" });
    }

    await Blog.findByIdAndDelete(id);

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { title, author, url, likes } = request.body;

  const updatedBlog = { title, author, url, likes };

  try {
    const updated = await Blog.findByIdAndUpdate(id, updatedBlog, {
      new: true,
    });

    if (!updated) {
      return response.status(404).send("Blog not found");
    }

    response.status(200).json(updated);
  } catch (err) {
    response.status(400).send(err.message);
  }
});

module.exports = blogsRouter;
