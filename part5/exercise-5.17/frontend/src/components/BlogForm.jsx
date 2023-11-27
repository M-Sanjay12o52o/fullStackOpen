import React from "react";
import PropTypes from "prop-types";

const BlogForm = ({
  handleBlogSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleURLChange,
}) => {
  return (
    <>
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

        <button type="submit">Post Blog</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  handleBlogSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleURLChange: PropTypes.func.isRequired,
};

export default BlogForm;
