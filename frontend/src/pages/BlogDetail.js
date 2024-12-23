// frontend/src/pages/BlogDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(response.data);
    };
    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${id}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlog({ ...blog, comments: [...blog.comments, response.data] });
      setComment('');
    } catch (err) {
      alert('Failed to post comment.');
    }
  };

  return (
    <div>
      {blog && (
        <>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
          <h3>Comments</h3>
          {blog.comments.map((c) => (
            <p key={c._id}>{c.content}</p>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
