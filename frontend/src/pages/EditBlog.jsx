
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import api from "../../api/api";
import BlogForm from "../components/BlogForm";
import { toast } from "react-toastify";

const EditBlog = () => {
  const { id } = useParams();
  console.log(id)
  const { user } = useUserContext();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blog/${id}`);
        console.log(res)
        setBlog(res.data.data);
      } catch (error) {
        console.error("Failed to fetch blog:", error.message);
        toast.error("Failed to fetch blog")
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      const res = await api.put(`/blog/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Blog updated successfully!");
        navigate(`/blog/${id}`);
      } else {
        toast.error(res.data.message || "Failed to update blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error.message);
      toast.error("An error occurred while updating the blog.");
    } finally {
      setLoading(false);
    }
  };

  if (!blog) return <p>Loading blog for editing...</p>;

  return (
    <BlogForm
      initialData={blog}
      onSubmit={handleUpdate}
      loading={loading}
      username={user?.username}
    />
  );
};

export default EditBlog;
