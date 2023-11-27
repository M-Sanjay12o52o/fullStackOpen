import { useState } from "react";
import blogService from "../services/blogs.js";
import PropTypes from "prop-types";

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

const Blog = ({ blog, blogs, setBlogs, handleLike }) => {
  const [blogState, setBlogState] = useState(false);

  const toggleView = () => {
    setBlogState(!blogState);
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

  return (
    <div style={blogStyle}>
      <p className="defaultDisplay">
        {blog.title} {blog.author}
      </p>
      {blogState && (
        <div className="container">
          <p>{blog.url}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{blog.likes}</p>
            <button
              className="likeBtn"
              onClick={handleLike}
              style={buttonStyle}
            >
              like
            </button>
          </div>
          <p>{blog.author}</p>
          <button onClick={handleRemove}>remove</button>
        </div>
      )}
      <button onClick={toggleView} style={buttonStyle}>
        {blogState ? "hide" : "view"}
      </button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
