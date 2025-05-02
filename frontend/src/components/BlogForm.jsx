
import React, { useState, useEffect } from "react";

const BlogForm = ({ initialData = {}, onSubmit, loading, username }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

useEffect(() => {
  if (initialData._id) {
    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
  }
}, [initialData._id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <div className="create-container">
      <div className="create-card">
        <h2>
          <span style={{ textTransform: "capitalize" }}>{username}</span>{" "}
          {initialData._id ? "Edit Blog" : "Let's Create New Blog"}
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
            {loading
              ? initialData._id
                ? "Updating..."
                : "Posting..."
              : initialData._id
              ? "Update Blog"
              : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
