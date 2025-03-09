import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }], // Refresh book list after adding
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    if (!title || !author || !published) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    await addBook({
      variables: { title, author, published: Number(published), genres },
    });

    // Reset input fields
    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    if (genre.trim() !== "") {
      setGenres([...genres, genre.trim()]);
      setGenre("");
    }
  };

  return (
    <div>
      <h2>Add a new book</h2>
      <form onSubmit={submit}>
        <div>
          Title: 
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author: 
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Published: 
          <input value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          Genre: 
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">Add Genre</button>
        </div>
        <div>Genres: {genres.join(", ")}</div>
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default NewBook;
