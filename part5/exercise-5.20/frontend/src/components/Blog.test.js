import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "./Blog.jsx";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm.jsx";

describe("Exercise:5.13", () => {
  test("renders title and author", () => {
    const blog = {
      title: "What is Ethereum",
      author: "Vitalik Buteren",
      url: "www.ethereum.org",
      likes: 145,
    };

    render(<Blog blog={blog} />);

    const titleElement = screen.getByText("What is Ethereum Vitalik Buteren");
    expect(titleElement).toBeInTheDocument();

    // Ensuring that the URL and number of likes are not rendered by default
    const urlElement = screen.queryByText("www.ethereum.org");
    expect(urlElement).not.toBeInTheDocument();

    const likesElement = screen.queryByText("145");
    expect(likesElement).not.toBeInTheDocument();
  });
});

describe("Exercise:5.14", () => {
  test("testing btn click displays likes and URL", async () => {
    const blog = {
      title: "What is Ethereum",
      author: "Vitalik Buteren",
      url: "www.ethereum.org",
      likes: 145,
    };

    const mockHandler = jest.fn();

    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    // this ensures that URL and likes are displayed after clicking view button
    const urlElement = screen.getByText("www.ethereum.org");
    expect(urlElement).toBeInTheDocument();

    const likesElement = screen.getByText("145");
    expect(likesElement).toBeInTheDocument();
  });
});

// un-solved
// describe("Exercise:5.15", () => {
//   test("two like clicks should call the fn twice", async () => {
//     const blog = {
//       title: "Test title",
//       author: "Test Author",
//       url: "www.example.org",
//       likes: 0,
//       id: 1,
//     };

//     const mockHandler = jest.fn();

//     render(<Blog blog={blog} blogId={blog.id} handleLike={mockHandler} />);

//     const user = userEvent.setup();
//     const viewButton = screen.getByText("view");
//     await user.click(viewButton);

//     const likeButton = screen.getByText("like");
//     await user.click(likeButton);
//     await user.click(likeButton);

//     expect(mockHandler.mock.calls).toHaveLength(2);
//   });
// });

describe("BlogForm", () => {
  test("calls event handler with correct details when a new blog is created", () => {});
});
