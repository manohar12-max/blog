
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"
const BlogForm = ({ initialData = {}, onSubmit, loading, username ,edit}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate=useNavigate()
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
  if(edit && loading){
    return <Loader/>
  }
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
              ? edit
                ? "Updating..."
                : "Posting..."
              : edit
              ? "Update Blog"
              : "Create Blog"}
          </button>
          <button 
          className="cancel-button" 
          onClick={()=>{

            setTitle("")
            setDescription("")
            navigate(-1);
          }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
