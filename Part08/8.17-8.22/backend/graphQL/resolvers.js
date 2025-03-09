import jwt from 'jsonwebtoken';
import Book from '../models/book.js';
import Author from '../models/author.js';
import User from '../models/user.js';

const SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    
    authorCount: async () => await Author.countDocuments(),

    allBooks: async () => {
      const books = await Book.find().populate("author");
      return books.map(book => ({
        id: book._id,
        title: book.title,
        published: book.published,
        author: book.author.name, // Ensuring author's name is returned
        genres: book.genres
      }));
    },

    allAuthors: async () => {
      const authors = await Author.find({});
      return await Promise.all(
        authors.map(async (author) => {
          const bookCount = await Book.countDocuments({ author: author._id });
          return { ...author.toObject(), bookCount };
        })
      );
    },

    me: (parent, args, context) => {
      return context.currentUser;
    }
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });
      return await user.save();
    },

    login: async (parent, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'password') { // Hardcoded password check
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: '1h' });
      return { value: token };
    },

    addBook: async (parent, args, context) => {
      if (!context.currentUser) {
        throw new Error('Unauthorized');
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const newBook = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres,
      });

      await newBook.save();
      return newBook;
    },

    editAuthor: async (parent, args, context) => {
      // Find the author by name
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new Error("Author not found");
      }

      // Update the author's birth year
      author.born = args.setBornTo;
      await author.save();

      return author;
    },
  }
};

export default resolvers;
