import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/blogs`);
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">Latest Blogs</h1>
          <p className="mt-2 text-lg text-gray-600">Explore the latest blog posts from our community.</p>
        </div>
        
        {/* Create New Blog Button */}
        <div className="mb-6 flex justify-end">
          <Link
            to="/create"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create New Blog
          </Link>
        </div>
        
        {/* Blog List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                <Link to={`/blogs/${blog._id}`} className="hover:underline">{blog.title}</Link>
              </h2>
              <p className="text-sm text-gray-500 mb-4">By: {blog.author?.username}</p>
              <p className="text-base text-gray-700">{blog.content.substring(0, 150)}...</p>
              <Link
                to={`/blogs/${blog._id}`}
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
