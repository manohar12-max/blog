import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';


const DetailBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext(); // Access user context
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blog/${id}`);
        setBlog(res.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Blog deleted successfully");
      navigate('/');
    } catch (error) {
      console.error("Error deleting blog:", error.message);
      toast.error("Failed to delete blog");
    }
  };

  if (loading) return <div className="loading-message">Loading blog...</div>;
  if (!blog) return <div className="error-message">Blog not found.</div>;

  const isOwner = user?._id === blog.createdBy?._id;

  return (
    <div className="detail-container">
      <div className="detail-card">
        <h1 className="detail-title">Title: "{blog.title}"</h1>

        <div className="description-box">
          <p className="detail-body">{blog.description}</p>
        </div>

        <p className="single-blog-meta">
          By <strong>{blog.createdBy?.username}</strong> on{" "}
          <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
        </p>

        {isOwner && (
          <div className="blog-actions">
            <button className="btn-edit" onClick={() => navigate(`/blog/edit/${id}`)}>Edit</button>
            <button className="btn-delete" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailBlog;
