import React, { useEffect, useState } from "react";
import api from "../../api/api";
import BlogList from "../components/BlogList";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const MyBlogs = () => {
    const {user}=useUserContext()
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchMyBlogs = async () => {
      setLoading(true)
      try {
        
        const res = await api.get("/blog/my-blog", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setBlogs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching my blogs:", error.message);
        toast.error("Error fetching your blogs")
      }finally{
        setLoading(false)
      }
    };
    fetchMyBlogs();
  }, []);
  
  return <BlogList blogs={blogs} title="My Blogs" loading={loading}  />;

};

export default MyBlogs;
