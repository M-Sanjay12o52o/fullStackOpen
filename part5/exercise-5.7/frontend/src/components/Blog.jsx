import { useState } from "react";

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

const Blog = ({ blog }) => {
  const [blogState, setBlogState] = useState(false);

  const toggleView = () => {
    setBlogState(!blogState);
  };

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
      </p>
      {blogState && (
        <>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
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
