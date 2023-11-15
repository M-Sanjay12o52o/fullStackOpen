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

const bestBlog = (lists) => {
  let maxLikes = -1;
  let bestList = null;

  lists.map((list) => {
    if (list.likes > maxLikes) {
      maxLikes = list.likes;
      bestList = list;
    }
  });

  return bestList;
};

module.exports = {
  dummy,
  totalLikes,
  bestBlog,
};
