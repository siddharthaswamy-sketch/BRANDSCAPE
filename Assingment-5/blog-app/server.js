const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import Post Model
const Post = require("./models/Post");

// -----------------------------
// 🌐 FRONTEND ROUTES (EJS Views)
// -----------------------------

// Home - List all posts
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("index", { posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).send("Error loading posts");
  }
});

// Show Create Form
app.get("/create", (req, res) => {
  res.render("create");
});

// Create New Post
app.post("/create", async (req, res) => {
  try {
    const { title, content } = req.body;
    await Post.create({ title, content });
    res.redirect("/");
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).send("Error creating post");
  }
});

// Show Edit Form
app.get("/edit/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("edit", { post });
  } catch (err) {
    console.error("Error loading edit page:", err);
    res.status(500).send("Error loading edit form");
  }
});

// Update Post
app.post("/edit/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect("/");
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).send("Error updating post");
  }
});

// Delete Post
app.post("/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).send("Error deleting post");
  }
});

// -----------------------------
// 🧠 API ROUTES (Optional JSON API)
// -----------------------------
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// -----------------------------
// 🚀 START SERVER
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
