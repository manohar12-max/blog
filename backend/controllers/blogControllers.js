const Blog = require("../models/blogModal");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};


const createBlog = async (req, res) => {
    const { title, description } = req.body;
  
    try {
      if (!title || !description) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
  
      let blog = await Blog.create({
        title,
        description,
        createdBy: req.user._id,
      });
  
      blog = await blog.populate("createdBy", "username email");
  
      return res.status(201).json({
        success: true,
        data: blog,
      });
  
    } catch (error) {
      console.error("Error creating blog:", error.message);
      res.status(500).json({ message: "Server error while creating blog" });
    }
  };
  

module.exports={
    getAllBlogs,createBlog
}