const { dummy, totalLikes, bestBlog } = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

let emptyList = [{}];

let oneList = [
  {
    title: "Exploring the Unknown",
    author: "Jane Smith",
    url: "www.example.com/exploring-unknown",
    likes: 256,
  },
];

let biggerList = [
  {
    title: "Exploring the Unknown",
    author: "Jane Smith",
    url: "www.example.com/exploring-unknown",
    likes: 256,
  },
  {
    title: "Tech Insights Today",
    author: "John Doe",
    url: "www.example.com/tech-insights-today",
    likes: 120,
  },
  {
    title: "Gourmet Delights Blog",
    author: "Emily Johnson",
    url: "www.example.com/gourmet-delights",
    likes: 410,
  },
  {
    title: "Fitness Tips & Tricks",
    author: "Alex Turner",
    url: "www.example.com/fitness-tips-tricks",
    likes: 88,
  },
  {
    title: "Travel Chronicles",
    author: "Sam Carter",
    url: "www.example.com/travel-chronicles",
    likes: 550,
  },
  {
    title: "Travel Buddies",
    author: "Samuel Jackson",
    url: "www.example.com/travel-chronicles",
    likes: 550,
  },
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = totalLikes(emptyList);

    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = totalLikes(oneList);

    expect(result).toBe(256);
  });

  test("of a bigger list is calculated right", () => {
    const result = totalLikes(biggerList);

    expect(result).toBe(1974);
  });
});

describe("best blog", () => {
  test("return the most liked blog", () => {
    const result = bestBlog(biggerList);

    expect(result).toBe(biggerList[4]);
  });
});
