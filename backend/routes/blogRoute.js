const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  singleBlog,
  editBlog,
  deleteBlog,
  authorBlogs,
} = require("../controllers/blogControllers");
const { auth } = require("../middleware/authMiddleware");


router.get("/", getAllBlogs);
router.get("/my-blog", auth, authorBlogs);
router.post("/create", auth, createBlog);
router.get("/:id", singleBlog);
router.put("/:id", auth, editBlog);
router.delete("/:id", auth, deleteBlog);


module.exports = router;
