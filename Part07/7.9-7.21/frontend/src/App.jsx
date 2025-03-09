/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { fetchUsers, fetchBlogs } from "./services/api";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import UserDetail from "./components/UserDetail";
import BlogDetail from "./components/BlogDetail";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }

    fetchUsers().then(setUsers);
    fetchBlogs().then(setBlogs);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} blogs={blogs} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetail users={users} />} />
        <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      </Routes>
    </div>
  );
};

export default App;
