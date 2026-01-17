const express = require("express");
const cors = require("cors");
const db = require("./db");

// Route imports
const athleteRoutes = require("./routes/athletes");
const scoreRoutes = require("./routes/scores");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

// Middleware (ORDER MATTERS)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/athletes", athleteRoutes);
app.use("/scores", scoreRoutes);
app.use("/leaderboard", leaderboardRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Athlete Performance Tracker API running");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});



