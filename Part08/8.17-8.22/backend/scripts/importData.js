import 'dotenv/config';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = "test"; // Replace with your actual database name

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

const authors = [
  { name: 'Robert Martin', born: 1952 },
  { name: 'Martin Fowler', born: 1963 },
  { name: 'Fyodor Dostoevsky', born: 1821 },
  { name: 'Joshua Kerievsky' },
  { name: 'Sandi Metz' }
];

const books = [
  { title: 'Clean Code', published: 2008, author: 'Robert Martin', genres: ['refactoring'] },
  { title: 'Agile software development', published: 2002, author: 'Robert Martin', genres: ['agile', 'patterns', 'design'] },
  { title: 'Refactoring, edition 2', published: 2018, author: 'Martin Fowler', genres: ['refactoring'] },
  { title: 'Refactoring to patterns', published: 2008, author: 'Joshua Kerievsky', genres: ['refactoring', 'patterns'] },
  { title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby', published: 2012, author: 'Sandi Metz', genres: ['refactoring', 'design'] },
  { title: 'Crime and punishment', published: 1866, author: 'Fyodor Dostoevsky', genres: ['classic', 'crime'] },
  { title: 'Demons', published: 1872, author: 'Fyodor Dostoevsky', genres: ['classic', 'revolution'] }
];

const importData = async () => {
  console.log("🚀 Connecting to MongoDB...");
  const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DATABASE_NAME);

    console.log("🛠 Deleting existing authors and books...");
    await db.collection("authors").deleteMany({});
    await db.collection("books").deleteMany({});
    console.log("✅ Cleared old data from database");

    console.log("🛠 Inserting authors...");
    const authorInsertResult = await db.collection("authors").insertMany(authors);
    
    if (!authorInsertResult.insertedIds) {
      throw new Error("Failed to insert authors");
    }

    console.log(`✅ Inserted ${Object.keys(authorInsertResult.insertedIds).length} authors`);

    // Create a map of author names to MongoDB _id
    const authorMap = {};
    for (const [index, author] of authors.entries()) {
      authorMap[author.name] = authorInsertResult.insertedIds[index];
    }

    console.log("🛠 Inserting books with correct author references...");
    const booksWithAuthors = books.map(book => ({
      ...book,
      author: authorMap[book.author], // Store the correct author ID
    }));

    const bookInsertResult = await db.collection("books").insertMany(booksWithAuthors);
    
    console.log(`✅ Inserted ${bookInsertResult.insertedCount} books`);
    console.log("🎉 Data Import Successful!");
  } catch (error) {
    console.error("❌ Data Import Failed:", error);
  } finally {
    await client.close();
    console.log("🔌 MongoDB Connection Closed");
    process.exit();
  }
};

// Run the import script
importData();
