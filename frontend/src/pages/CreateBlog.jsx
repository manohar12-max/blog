
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import api from "../../api/api";
import BlogForm from "../components/BlogForm";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      const res = await api.post(
        `/blog/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 201) {
        toast.success("Blog created successfully!");
        navigate("/");
      } else {
        toast.error(res.data.message || "Failed to create blog.");
      }
    } catch (error) {
      console.error("Error creating blog:", error.message);
      toast.error(res.data.message ||"An error occurred while creating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogForm
      onSubmit={handleCreate}
      loading={loading}
      username={user?.username}
    />
  );
};

export default CreateBlog;
