import React from "react";

// const hideWhenVisible = { display: toggle ? "none" : "" };
// const showWhenVisible = { display: toggle ? "" : "none" };

const BlogForm = ({
  handleBlogSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleURLChange,
  handleLikesChange,
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
    </>
  );
};

export default BlogForm;
