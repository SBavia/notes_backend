import Notes from "../models/notes.js";

export const getNotes = async (req, res, next) => {
  try {
    const totalItems = await Notes.find().countDocuments();
    const notes = await Notes.find();

    res.status(200).json({
      notes,
      totalItems,
      message: "Fetched notes successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const createNote = async (req, res, next) => {
  const { title, content } = req.body;
  const note = new Notes({
    title,
    content,
  });

  try {
    const result = await note.save();

    res.status(201).json({
      note: result,
      message: "Created note successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getNote = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await Notes.findById(noteId);

    if (!note) {
      const error = new Error("Could not find note.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      note,
      message: "Fetched note successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;

  try {
    const note = await Notes.findById(noteId);

    if (!note) {
      const error = new Error("Could not find note.");
      error.statusCode = 404;
      throw error;
    }

    note.title = title;
    note.content = content;

    const result = await note.save();

    res.status(200).json({
      note: result,
      message: "Updated note successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await Notes.findById(noteId);

    if (!note) {
      const error = new Error("Could not find note.");
      error.statusCode = 404;
      throw error;
    }

    await Notes.findByIdAndDelete(noteId);

    res.status(200).json({
      message: "Deleted note successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
