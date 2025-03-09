import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

// Get all users
export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

// Get all blogs
export const fetchBlogs = async () => {
  const response = await axios.get(`${BASE_URL}/blogs`);
  return response.data;
};

// Register a new user
export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/register`, userData);
  return response.data;
};

// User login
export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/users/login`, credentials);
  return response.data;
};

// Create a blog (requires token)
export const createBlog = async (blogData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${BASE_URL}/blogs`, blogData, config);
  return response.data;
};

// Post a comment
export const postComment = async (blogId, comment) => {
  const response = await axios.post(`${BASE_URL}/blogs/${blogId}/comments`, {
    comment,
  });
  return response.data;
};
