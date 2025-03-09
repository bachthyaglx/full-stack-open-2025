import { Link } from "react-router-dom";
import "@styles/Navbar.css";

const Navbar = ({ user, handleLogout }) => (
  <nav className="navbar">
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
    </div>
    <div>
      {user ? (
        <span className="user-info">
          {user.name} logged in
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </span>
      ) : (
        <Link to="/login" className="hover:text-gray-400">Login</Link>
      )}
    </div>
  </nav>
);

export default Navbar;
