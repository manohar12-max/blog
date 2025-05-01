const express = require("express");
const router = express.Router();
const { getAllBlogs, createBlog } = require("../controllers/blogControllers");

router.get("/", getAllBlogs);

router.post("/blog", createBlog);

module.exports = router;
