const blogsRouter = require("express").Router();
const Blogs = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blogs.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blogs({ title, author, url, likes });

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      response.status(400).send(error.message);
    });
});

module.exports = blogsRouter;
