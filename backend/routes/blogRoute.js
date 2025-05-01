const express = require("express");
const router = express.Router();
const { getAllBlogs, createBlog } = require("../controllers/blogControllers");
const {auth} =require("../middleware/authMiddleware")
router.get("/", getAllBlogs);

router.post("/create", auth, createBlog);

module.exports = router;
