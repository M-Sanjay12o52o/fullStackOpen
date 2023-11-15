const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const api = supertest(app);
const helper = require("../utils/api_helper");

mongoose.set("bufferTimeoutMS", 30000);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs should be returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("right number of blogs are returned as json", async () => {
  console.log("entered test");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("verify unique identifier named id", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogPosts = response.body;

  for (const blog of blogPosts) {
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  }
}, 10000);

test("post requrest verify", async () => {
  const newBlog = {
    title: "async function",
    author: "Dickson Boateng",
    url: "https://www.freecodecamp.org/news/asynchronous-programming-in-javascript/",
    likes: 440,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAtEnd = await helper.blogInDb();
  // expect(blogAtEnd);
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
}, 10000);

test("post requrest verify", async () => {
  const newBlog = {
    title: "async function",
    author: "Dickson Boateng",
    url: "https://www.freecodecamp.org/news/asynchronous-programming-in-javascript/",
    likes: 440,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAtEnd = await helper.blogInDb();
  // expect(blogAtEnd);
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
}, 10000);

test("should default likes to 0 if missing in request", async () => {
  const requestWithoutLikes = {
    title: "What are functions in JAVASCRIPT",
    author: "Chinwendu Enyinna",
    url: "https://www.freecodecamp.org/news/what-are-functions-in-javascript-a-beginners-guide/",
  };

  const response = await api
    .post("/api/blogs")
    .send(requestWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("returning 400 bad request if no title or url", async () => {
  const requestWithoutTitle = {
    author: "Chinwendu",
    url: "https://www.freecodecamp.org/news/what-are-functions-in-javascript-a-beginners-guide/",
  };

  await api.post("/api/blogs").send(requestWithoutTitle).expect(400);
}, 10000);

test("deleting a single blog post", async () => {
  const blogsAtStart = await helper.blogInDb();
  console.log("blogsAtStart: ", blogsAtStart);
  const blogToDelete = blogsAtStart[0];
  console.log("blogsToDelete", blogToDelete);

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogInDb();
  console.log("blogsAtEnd: ", blogsAtEnd);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const blogTitles = blogsAtEnd.map((blog) => blog.title);

  console.log("blogContents: ", blogTitles);

  expect(blogTitles).not.toContain(blogToDelete.title);
});

test("updating a blog details", async () => {
  const blogsAtStart = await helper.blogInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    ...blogToUpdate,
    title: "Updated Title",
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

  const blogsAfterUpdate = await helper.blogInDb();

  const titlesBeforeUpdate = blogsAtStart.map((blog) => blog.title);
  const titlesAfterUpdate = blogsAfterUpdate.map((blog) => blog.title);

  expect(titlesBeforeUpdate).not.toEqual(titlesAfterUpdate);
});

afterAll(async () => {
  await mongoose.connection.close();
});
