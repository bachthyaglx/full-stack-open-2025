import { useQuery, gql } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author # ✅ Author is now a name string, not an object
      published
    }
  }
`;

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (!props.show) return null;
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map((b) =>
            b.title && b.author && b.published ? ( // Ensure all fields are valid
              <tr key={b.title}>
                <td>{b.title.trim()}</td>
                <td>{b.author.trim()}</td>
                <td>{b.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
