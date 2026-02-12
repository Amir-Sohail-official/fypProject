const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("../confiq/db");
const app = require("../app");

const root = express();
root.disable("x-powered-by");

root.use(app);
root.use("/api", app);

let dbPromise;
function ensureDB() {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  return dbPromise;
}

const handler = serverless(root);

module.exports = async (req, res) => {
  try {
    await ensureDB();
    return handler(req, res);
  } catch (err) {
    console.error("Startup error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};

