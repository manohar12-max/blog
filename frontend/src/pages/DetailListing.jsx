import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const DetailListing = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  const getData = async () => {
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="detail-container">
      {blog ? (
        <div className="detail-card">
          <h1 className="detail-title">{blog.title}</h1>
          <p className="detail-body">{blog.body}</p>
        </div>
      ) : (
        <p className="loading-text">Loading blog...</p>
      )}
    </div>
  );
};

export default DetailListing;
