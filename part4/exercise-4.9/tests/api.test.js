const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const api = supertest(app);
const helper = require("../utils/list_helper");

mongoose.set("bufferTimeoutMS", 30000);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
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

afterAll(async () => {
  await mongoose.connection.close();
});
