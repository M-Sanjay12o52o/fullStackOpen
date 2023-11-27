import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resultMessage, setResultMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  // original
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

  // using sorting to display according to number of likes
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
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

  const handleLike = async () => {
    try {
      console.log("firing!!!");
      console.log("blog: ", blog);
      console.log("blogId: ", blog.id);
      const blogId = blog.id;

      console.log("blog.likes before: ", blog.likes);
      const updatedLikes = blog.likes + 1;
      // console.log("blog.likes after: ", blog.likes);

      console.log("upatedLikes: ", updatedLikes);
      const updatedBlog = { ...blog, likes: updatedLikes };

      console.log("updatedBlog inside handleLike: ", updatedBlog);
      const response = await blogService.update(blogId, updatedBlog);
      // console.log("Blog likes updated:", response.data);

      // to ensure rearranging of blogs according to likes
      const updatedBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      );
      console.log("updatedBlogs: ", updatedBlogs);
      setBlogs(updatedBlogs);

      // Sort the blogs based on likes
      const sortedBlogs = updatedBlogs
        .slice()
        .sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
      // updateBlogLikes(updatedBlog);
      // Update the blog's likes in the UI using state or other logic
    } catch (error) {
      console.error("Error updating blog likes:", error);
      // error handling
    }
  };

  const toggleFormVisibility = () => {
    setToggle(!toggle); // Toggles the 'toggle' state
  };

  const hideWhenVisible = { display: toggle ? "none" : "" };
  const showWhenVisible = { display: toggle ? "" : "none" };

  return (
    <div>
      <Notification message={resultMessage} />
      <h2>{user.username} logged in</h2>
      <div>
        <button
          id="createButton"
          data-testid="createButton"
          onClick={() => setToggle(true)}
        >
          create
        </button>
      </div>

      <div style={showWhenVisible}>
        <BlogForm
          handleBlogSubmit={handleBlogSubmit}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleURLChange={handleURLChange}
          toggleFormVisibility={toggleFormVisibility}
        />
        <button onClick={() => setToggle(false)}>cancel</button>
      </div>

      <button onClick={handleLogout}>Logout</button>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          handleLike={handleLike}
        />
      ))}
    </div>
  );
};

export default App;
