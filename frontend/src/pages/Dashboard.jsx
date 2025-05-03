import React, { useEffect, useState } from "react";
import api from "../../api/api";
import BlogList from "../components/BlogList";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog");
        setBlogs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
        toast.error("Error Fetching Blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  return <BlogList blogs={blogs} title="Explore Latest Blogs" loading={loading}/>;
};

export default Dashboard;
