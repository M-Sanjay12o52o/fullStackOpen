const Blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (list) => {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += list[i].likes || 0;
  }
  return total;
};

module.exports = {
  dummy,
  totalLikes,
};
