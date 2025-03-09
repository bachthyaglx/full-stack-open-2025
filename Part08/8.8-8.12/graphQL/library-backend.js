import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuid } from 'uuid';
import cors from 'cors';

let authors = [
  { name: 'Robert Martin', id: uuid(), born: 1952 },
  { name: 'Martin Fowler', id: uuid(), born: 1963 },
  { name: 'Fyodor Dostoevsky', id: uuid(), born: 1821 },
  { name: 'Joshua Kerievsky', id: uuid(), born: null },
  { name: 'Sandi Metz', id: uuid(), born: null },
];

let books = [
  { title: 'Clean Code', published: 2008, author: 'Robert Martin', id: uuid(), genres: ['refactoring'] },
  { title: 'Agile software development', published: 2002, author: 'Robert Martin', id: uuid(), genres: ['agile', 'patterns', 'design'] },
  { title: 'Refactoring, edition 2', published: 2018, author: 'Martin Fowler', id: uuid(), genres: ['refactoring'] },
];

const typeDefs = `
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (parent, args) => {
      let filteredBooks = books;
      if (args.author) filteredBooks = filteredBooks.filter(b => b.author === args.author);
      if (args.genre) filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre));
      return filteredBooks;
    },
    allAuthors: () =>
      authors.map(a => ({
        name: a.name,
        born: a.born || null,
        bookCount: books.filter(b => b.author === a.name).length
      })),
  },
  Mutation: {
    addBook: (parent, args) => {
      const newBook = {
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
        id: uuid(),
      };
      books.push(newBook);

      if (!authors.some(a => a.name === args.author)) {
        authors.push({ name: args.author, id: uuid(), born: null });
      }

      return newBook;
    },
    editAuthor: (parent, args) => {
      const author = authors.find(a => a.name === args.name);
      if (!author) return null;
      author.born = args.setBornTo;
      return author;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
