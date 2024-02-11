import { Router } from "express";
// const { body } = require("express-validator");

import { getPosts } from "../controllers/feed.js";

const router = Router();

router.get("/posts", getPosts);

// router.post(
//   "/post",
//   isAuth,
//   [
//     body("title").trim().isLength({ min: 5 }),
//     body("content").trim().isLength({ min: 5 }),
//   ],
//   feedController.createPost
// );

// router.get("/post/:postId", isAuth, feedController.getPost);

// router.put(
//   "/post/:postId",
//   isAuth,
//   [
//     body("title").trim().isLength({ min: 5 }),
//     body("content").trim().isLength({ min: 5 }),
//   ],
//   feedController.updatePost
// );

// router.delete("/post/:postId", isAuth, feedController.deletePost);

export default router;
