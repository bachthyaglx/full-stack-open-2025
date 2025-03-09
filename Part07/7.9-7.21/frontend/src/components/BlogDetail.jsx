import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "@services/api";
import "@styles/BlogDetail.css";

const BlogDetail = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id || blog._id === id);
  const [likes, setLikes] = useState(blog ? blog.likes : 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog ? blog.comments || [] : []);

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found</p>;
  }

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim()) return;

    try {
      const updatedBlog = await postComment(blog.id || blog._id, comment);
      setComments(updatedBlog.comments);
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="blog-detail">
      {/* Blog Title */}
      <h2 className="blog-title">{blog.title}</h2>

      {/* Blog Link */}
      <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-link">
        {blog.url}
      </a>

      {/* Likes & Like Button */}
      <p className="blog-likes">{likes} likes</p>
      <button onClick={handleLike} className="like-button">Like</button>

      {/* Author Info */}
      <p className="blog-author">Added by <strong>{blog.author}</strong></p>

      {/* Comments Section */}
      <h3 className="blog-comments">Comments</h3>
      <ul className="comment-list">
        {comments.length > 0 ? (
          comments.map((cmt, index) => (
            <li key={index}>{cmt}</li>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
      </ul>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          required
          className="comment-input"
        />
        <button type="submit" className="comment-button">Comment</button>
      </form>
    </div>
  );
};

export default BlogDetail;
