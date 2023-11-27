import { useState } from "react";
import axios from "axios";
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

const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogState, setBlogState] = useState(false);

  const toggleView = () => {
    setBlogState(!blogState);
  };

  const updateBlogLikes = (updatedBlog) => {
    const updatedBlogs = blogs.map((b) =>
      b.id === updatedBlog.id ? updatedBlog : b
    );
    setBlogs(updatedBlogs);
  };

  const handleLike = async () => {
    try {
      console.log("blog: ", blog);
      console.log("blogId: ", blog.id);
      const blogId = blog.id;
      console.log("blog.likes before: ", blog.likes);
      const updatedLikes = blog.likes + 1;
      // console.log("blog.likes after: ", blog.likes);
      console.log("udatedLikes: ", updatedLikes);
      const updatedBlog = { ...blog, likes: updatedLikes };
      console.log("updatedBlog inside handleLike: ", updatedBlog);
      const response = await blogService.update(blogId, updatedBlog);
      console.log("Blog likes updated:", response);

      updateBlogLikes(updatedBlog);
      // Update the blog's likes in the UI using state or other logic
    } catch (error) {
      console.error("Error updating blog likes:", error);
      // error handling
    }
  };

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
      </p>
      {blogState && (
        <>
          <p>{blog.url}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{blog.likes}</p>
            <button onClick={handleLike} style={buttonStyle}>
              like
            </button>
          </div>
          <p>{blog.author}</p>
        </>
      )}
      <button onClick={toggleView} style={buttonStyle}>
        {blogState ? "hide" : "view"}
      </button>
    </div>
  );
};

export default Blog;
