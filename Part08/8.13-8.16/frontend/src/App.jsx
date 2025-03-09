import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const client = new ApolloClient({
  uri: "http://localhost:3001",
  cache: new InMemoryCache(),
});

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <ApolloProvider client={client}>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("add")}>Add Book</button>
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
    </ApolloProvider>
  );
};

export default App;
