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

afterAll(async () => {
  await mongoose.connection.close();
});
