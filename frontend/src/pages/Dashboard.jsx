import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog");
        setBlogs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Explore Latest Blogs</h1>

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
            <button className="read-more-btn" onClick={() => navigate(`/blog/${blog._id}`)}>
              Read More
            </button>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default Dashboard;
