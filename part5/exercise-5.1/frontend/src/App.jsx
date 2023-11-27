import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userToken = await loginService.login({ username, password });
      // console.log("userToken: ", userToken);
      // console.log("User before setUser: ", user);
      setUser(userToken);
      // console.log("User after setUser: ", user);
    } catch (error) {
      console.error("Login failed: ", error.message);
    }
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
      <h2>Welcome, {user.username}</h2>
      <button onClick={() => setUser(null)}>Logout</button>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
