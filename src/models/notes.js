import { Schema, model } from "mongoose";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default model("Notes", notesSchema);
