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

const mostBlogs = (lists) => {
  const authorCounts = {};

  lists.map((list) => {
    let author = list.author;
    if (authorCounts[list.author]) {
      authorCounts[author]++;
    } else {
      authorCounts[author] = 1;
    }
  });

  let maxAuthor = null;
  let maxBlogs = 0;

  console.log(authorCounts);
  for (const author in authorCounts) {
    if (authorCounts[author] > maxBlogs) {
      maxBlogs = authorCounts[author];
      maxAuthor = author;
    }
  }

  return { author: maxAuthor, maxBlogs: maxBlogs };
};

const mostLikes = (lists) => {
  let likesByAuthor = {};

  lists.forEach((list) => {
    let author = list.author;
    let likes = list.likes;

    if (likesByAuthor[author]) {
      likesByAuthor[author] += likes;
    } else {
      likesByAuthor[author] = likes;
    }
  });

  let maxLikes = 0;
  let topAuthor = null;

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author];
      topAuthor = author;
    }
  }

  return { author: topAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  bestBlog,
  mostBlogs,
  mostLikes,
};
