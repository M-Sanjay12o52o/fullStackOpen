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

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);

  return response.status(204).end();
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
