const Blog = require("../models/blog");

const blogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const initialBlogs = [
  {
    title: "Why is SOFTWARE eating the world",
    author: "Andreeseen horowitz",
    url: "https://a16z.com/why-software-is-eating-the-world/",
    likes: 540,
  },
  {
    title: "Everything you need to Know about Bitcoin",
    author: "James Altucher",
    url: "https://medium.com/the-mission/everything-you-need-to-know-about-bitcoin-f2a3be247a5b",
    likes: 360,
  },
  {
    title: "What is Ethereum?",
    author: "Michele D'Aliessi",
    url: "https://medium.com/@micheledaliessi/what-is-ethereum-f4c5e566ff77",
    likes: 100,
  },
];

module.exports = {
  blogInDb,
  initialBlogs,
};
