import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,  // ✅ Store author as ObjectId
    ref: "Author",
    required: true,
  },
  genres: [{ type: String }],
});

// ✅ Apply unique validator
bookSchema.plugin(uniqueValidator);

const Book = mongoose.model('Book', bookSchema);
export default Book;
