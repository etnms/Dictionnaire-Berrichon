import mongoose from "mongoose";

// schema
const WordSchema = new mongoose.Schema({
  word: String,
  translation: String,
  definition: String,
  pos: String,
});

export const Word = mongoose.models.Word || mongoose.model("Word", WordSchema);
