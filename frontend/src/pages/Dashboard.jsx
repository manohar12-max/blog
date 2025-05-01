import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const navigate=useNavigate()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setBlogs(data.slice(0, 30))); 
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Latest Blogs</h1>
      {currentBlogs.map(blog => (
        <div key={blog.id} className="blog-card">
          <h2>{blog.title}</h2>
          <p>{blog.body.substring(0, 150)}...</p>
          <button 
          onClick={()=>{navigate(`/blog/${blog.id}`)}}
          className="read-more-btn">Read More</button>
        </div>
      ))}

      <div className="pagination">
        {[...Array(totalPages).keys()].map(num => (
          <button
            key={num}
            className={`page-btn ${currentPage === num + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
