import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios"; // Import axios
import api from "../../api/api";

const CreateBlog = () => {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(
        `/blog/create`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status === 201) {
        alert("Blog created successfully!");
        navigate("/");
      } else {
        alert(res.data.message || "Failed to create blog.");
      }
    } catch (error) {
      console.error(
        "Error creating blog:",
        error.response?.data?.message || error.message
      );
      alert("An error occurred while creating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <div className="create-card">
        <h2>
          <span style={{ textTransform: "capitalize" }}>{user?.username}</span>{" "}
          Let's Create New Blog
        </h2>
        <form onSubmit={handleSubmit} className="create-form">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            required
          />
          <button type="submit" className="create-button" disabled={loading}>
            {loading ? "Posting..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
