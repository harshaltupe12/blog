// frontend/src/pages/BlogList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <Link to="/create">Create New Blog</Link>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h2><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></h2>
          <p>Author: {blog.author?.username}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
