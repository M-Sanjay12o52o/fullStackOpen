const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;
  if (!title || !author) {
    return response.status(400).send("Title and author are required");
  }

  const blog = new Blog({ title, author, url, likes: likes || 0 });

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (err) {
    response.status(400).send(error.message);
  }
});

module.exports = blogsRouter;
