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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {blog && (
          <>
            {/* Blog Title and Content */}
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
              <h1 className="text-4xl font-bold text-blue-600 mb-4">{blog.title}</h1>
              <p className="text-lg text-gray-700">{blog.content}</p>
            </div>

            {/* Comments Section */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Comments</h3>
              {blog.comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              ) : (
                blog.comments.map((c) => (
                  <div key={c._id} className="border-b border-gray-300 py-4">
                    <p className="text-lg text-gray-800">{c.content}</p>
                  </div>
                ))
              )}

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mt-8">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
