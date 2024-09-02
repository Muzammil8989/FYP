const express = require("express");
const connectDB = require("./config/dbConfig");
const userRoutes = require("./routes/jobpostedRoutes");
const applicationRoutes = require("./routes/jobappicationRoutes");
const jobRoutes = require("./routes/userRoutes");

const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// CORS
app.use(cors());

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use("/api", jobRoutes, userRoutes, applicationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
