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
  initialBlogs,
};
