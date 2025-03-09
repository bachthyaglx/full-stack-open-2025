import { useQuery, gql } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <div>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
