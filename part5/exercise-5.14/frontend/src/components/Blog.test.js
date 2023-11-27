import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog.jsx";
import userEvent from "@testing-library/user-event";

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

test("testing btn click displays likes are URL", async () => {
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
