import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// connection function
export const connect = async () => {
  const connection = await mongoose.connect(MONGO_URI as string).catch((err) => console.log(err));

  // schema
  const WordSchema = new mongoose.Schema({
    word: String,
    translation: String,
  });

  const Word = mongoose.models.Word || mongoose.model("Word", WordSchema);

  return { connection, Word };
};
