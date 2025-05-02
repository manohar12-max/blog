const express = require("express");
const router = express.Router();
const { getAllBlogs, createBlog,singleBlog,editBlog ,deleteBlog} = require("../controllers/blogControllers");
const {auth} =require("../middleware/authMiddleware")
router.get("/", getAllBlogs);
router.get("/:id",singleBlog)
router.put("/:id", auth, editBlog);
router.delete("/:id", auth, deleteBlog);
router.post("/create", auth, createBlog);


module.exports = router;
