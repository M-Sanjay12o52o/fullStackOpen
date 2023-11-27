import { useState } from "react";
import blogService from "../services/blogs.js";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const buttonStyle = {
  marginLeft: 10,
};

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [blogState, setBlogState] = useState(false);

  const toggleView = () => {
    setBlogState(!blogState);
  };

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

  const handleRemove = async () => {
    try {
      const blogId = blog.id;

      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const response = await blogService.remove(blogId);
        console.log("handleRemove response: ", response);
      }

      // filtering the blogs to remove the deleted blog
      const updatedBlogs = blogs.filter((b) => b.id !== blogId);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log("Error removing blog: ", error);
    }
  };

  const loggedInUserString = window.localStorage.getItem("loggedInUser");
  let loggedInUser = null;

  if (loggedInUserString) {
    loggedInUser = JSON.parse(loggedInUserString);
  }

  return (
    <div style={blogStyle}>
      <p id="blog" className="defaultDisplay">
        {blog.title} {blog.author}
      </p>
      {blogState && (
        <div className="container">
          <p>{blog.url}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="like-count">{blog.likes}</p>
            <button
              className="likeBtn"
              onClick={handleLike}
              style={buttonStyle}
            >
              like
            </button>
          </div>
          <p>{blog.author}</p>
          {console.log("user.username: ", user.username)}
          {console.log("blog.user.username: ", blog.user.username)}
          {console.log("loggedInUser.username: ", loggedInUser.username)}
          {blog.user.username === loggedInUser.username ? (
            <button className="removeBtn" onClick={handleRemove}>
              remove
            </button>
          ) : null}
        </div>
      )}
      <button className="viewBtn" onClick={toggleView} style={buttonStyle}>
        {blogState ? "hide" : "view"}
      </button>
    </div>
  );
};

export default Blog;
