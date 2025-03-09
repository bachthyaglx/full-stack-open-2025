import { Link } from "react-router-dom";
import "@styles/Home.css"; 

const Home = ({ user, blogs }) => (
  <div className="home-container">
    {/* Page Header */}
    <h2 className="home-header">Blogs</h2>

    {/* User logged in or prompt */}
    {user ? (
      <div>
        <p className="user-info">{user.name} logged in</p>

        {/* Create new blog button */}
        <button className="create-button">Create new</button>

        {/* Blog List */}
        <ul className="blog-list">
          {blogs.map((blog) => (
            <li key={blog.id || blog._id} className="blog-item">
              <Link
                to={`/blogs/${blog.id || blog._id}`}
                className="blog-link"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p className="login-message">Please log in</p>
    )}
  </div>
);

export default Home;
