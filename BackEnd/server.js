const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./confiq/db");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config.env") });

// Connect to database
connectDB();

// Import express app
const app = require("./app");

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
