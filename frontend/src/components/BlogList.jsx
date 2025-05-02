import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogList = ({ blogs = [], title, paginate = true, blogsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = paginate ? blogs.slice(indexOfFirstBlog, indexOfLastBlog) : blogs;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="dashboard-container">
      {title && <h1 className="dashboard-title">{title}</h1>}

      <div className="blogs">
        {currentBlogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <h2 onClick={() => navigate(`/blog/${blog._id}`)} className="blog-title clickable">
              {blog.title}
            </h2>

            <p className="blog-desc">
              {blog.description.length > 150
                ? `${blog.description.substring(0, 150)}...`
                : blog.description}
            </p>

            <p className="foot-note">
              <span>Created By: {blog.createdBy.username}</span>
              <button className="read-more-btn" onClick={() => navigate(`/blog/${blog._id}`)}>
                Read More
              </button>
              <span>Posted: {new Date(blog.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        ))}
      </div>

      {paginate && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
