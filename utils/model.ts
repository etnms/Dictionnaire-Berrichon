import mongoose from "mongoose";

// schema
const WordSchema = new mongoose.Schema({
  word: String,
  translation: String,
});

export const Word = mongoose.models.Word || mongoose.model("Word", WordSchema);
