import dotenv from "dotenv";
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import feedRoutes from "./../src/routes/feed.js";

dotenv.config();

const api = express();

api.use(cors());
api.use(bodyParser.json());

api.use("/api/", feedRoutes);

api.use((error, req, res, next) => {
  console.log("error in the end of app.js", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

const handler = serverless(api);

export { handler };
