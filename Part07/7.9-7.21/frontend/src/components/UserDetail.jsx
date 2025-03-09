import { useParams } from "react-router-dom";
import "@styles/UserDetail.css";

const UserDetail = ({ users }) => {
  const { id } = useParams();
  const user = users.find((user) => user.id === id || user._id === id);

  if (!user) {
    return <p className="user-not-found">User not found</p>;
  }

  return (
    <div className="user-detail-container">
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul className="user-detail-list">
        {user.blogs.map((blog) => (
          <li key={blog.id || blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
