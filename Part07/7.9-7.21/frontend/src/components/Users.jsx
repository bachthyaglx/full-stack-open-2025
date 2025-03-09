import { Link } from "react-router-dom";
import "@styles/Users.css";

const Users = ({ users }) => (
  <div className="users-container">
    <h2>Users</h2>
    <table className="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id || user._id}>
            <td>
              <Link to={`/users/${user.id || user._id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs ? user.blogs.length : 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Users;
