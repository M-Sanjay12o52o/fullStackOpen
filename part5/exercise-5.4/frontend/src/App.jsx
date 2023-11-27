import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js";
import Notification from "./components/Notification";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resultMessage, setResultMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleTitleChange = (event) => {
    setBlogData((prevState) => ({ ...prevState, title: event.target.value }));
  };

  const handleAuthorChange = (event) => {
    setBlogData((prevState) => ({ ...prevState, author: event.target.value }));
  };

  const handleURLChange = (event) => {
    setBlogData((prevState) => ({ ...prevState, url: event.target.value }));
  };

  const handleLikesChange = (event) => {
    setBlogData((prevState) => ({
      ...prevState,
      likes: parseInt(event.target.value),
    }));
  };

  // const handleBlogSubmit = async (event) => {
  //   event.preventDefault();

  //   const { title, author, url, likes } = blogData;

  //   // Send the blog data to the backend API using Axios
  //   try {
  //     const response = await axios.post("/api/blogs", blogData);
  //     console.log("Blog created:", response.data);
  //     // Clear the form inputs
  //     setBlogData({ title: "", author: "", url: "", likes: 0 });
  //   } catch (error) {
  //     console.error("Error creating blog:", error);
  //   }
  // };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      // console.log("userToken: ", userToken);
      // console.log("User before setUser: ", user);
      console.log("Response from login:", user); // Log the received response

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

      setResultMessage(`Welcome, ${user.username}!`); // Set success message
      setTimeout(() => {
        setResultMessage(null); // Clear success message after 5 seconds
      }, 5000);
      // console.log("User after setUser: ", user);
    } catch (error) {
      console.log("Error during login: ", error);
      setResultMessage("Wrong username or password");

      return;
      // setTimeout(() => {
      //   setResultMessage(null);
      // }, 5000);
    }
  };

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    console.log("button clicked: ", event.target);

    const { title, author, url, likes } = blogData;

    blogService
      .create(blogData)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        // console.log("blogs: ", blogs);
        // setNewBlog("");
        // setBlogs("");
        setResultMessage(
          `a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`
        );
        console.log("resultMessage: ", resultMessage);
        setTimeout(() => {
          setResultMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.log("Error creating blog: ", error);
        setResultMessage("Failed to create blog");
        setTimeout(() => {
          setResultMessage(null);
        }, 5000);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
    blogService.setToken(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          username
          <div>
            <input
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification message={resultMessage} />
      <h2>{user.username} logged in</h2>
      <h3>Add Blogs: </h3>
      <form onSubmit={handleBlogSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleTitleChange}
          required
        />
        <br />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          onChange={handleAuthorChange}
          required
        />
        <br />

        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          onChange={handleURLChange}
          required
        />
        <br />

        <label htmlFor="likes">Likes:</label>
        <input
          type="number"
          id="likes"
          name="likes"
          onChange={handleLikesChange}
          required
        />
        <br />

        <button type="submit">Post Blog</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
