import { config } from "dotenv";
import express from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

config();

import feedRoutes from "./../src/routes/feed.js";

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

let handler;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    handler = serverless(api);
    // console.log('connected');
    // api.listen(8080);
  })
  .catch((err) => console.log(err));

export { handler };
