// index.js
const express = require("express");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
require("dotenv").config();

const app = express(); // Server

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use the user routes
app.use("/api/user", authRoutes);
app.use("/api/profile", profileRouter);

// Homepage Welcome Message - Get
app.get("/", (req, res) => {
  res.send({ status: "success", msg: "Welcome to Homepage" });
});

// Handle 404 for all other routes
app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

// Create HTTP server
const server = http.createServer(app);
const PORT = process.env.PORT || 9090;

// Start server
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
