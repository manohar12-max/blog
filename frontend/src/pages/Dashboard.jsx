
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import BlogList from "../components/BlogList";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog");
        setBlogs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
        toast.error("Error Fetching Blogs")
      }
    };

    fetchBlogs();
  }, []);

  return <BlogList blogs={blogs} title="Explore Latest Blogs" />;
};

export default Dashboard;
