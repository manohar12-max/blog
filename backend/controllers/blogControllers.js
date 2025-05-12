const Blog = require("../models/blogModal");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .populate("createdBy", "username email");

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch blogs" });
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
    res.status(500).json({ message:  error.message || "Server error while creating blog" });
  }
};

const singleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate("createdBy", "username email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).json({ message: "Server error while fetching blog" });
  }
};

const editBlog = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the current user is the owner
    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to edit this blog" });
    }

    // Proceed with update
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "username email");

    res.status(200).json({ data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ message: "Server error while updating blog" });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this blog" });
    }

    
    await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({ message: "Server error while deleting blog" });
  }
};


const authorBlogs = async (req, res) => {
  try {
    const userId = req.user._id;

    const blogs = await Blog.find({ createdBy: userId }).sort({ createdAt: -1 }).populate("createdBy", "username");

    res.status(200).json({
      success: true,
      count: blogs.length, 
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching author blogs:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch author's blogs",
    });
  }
};


module.exports = {
  getAllBlogs,
  createBlog,
  singleBlog,
  editBlog,
  deleteBlog,
  authorBlogs
};
