import { Router } from "express";

import {
  getNotes,
  createNote,
  getNote,
  editNote,
  deleteNote,
} from "../controllers/feed.js";

const router = Router();

router.get("/notes", getNotes);

router.post("/note", createNote);

router.get("/notes/:noteId", getNote);

router.put("/notes/:noteId", editNote);

router.delete("/notes/:noteId", deleteNote);

export default router;
