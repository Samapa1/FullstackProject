import { hstyle, pstyle } from "./Styles";

const BasicBookData = ({ book }) => {
  return (
    <>
      <h2 style={hstyle}>{book.title}</h2>
      <div style={pstyle}>
        <p>Author: {book.author}</p>
        <p>Year: {book.year}</p>
        <p>Language: {book.language}</p>
        <p>Class: {book.class}</p>
        <p>
          {book.genre ? `Genre: ${book.genre}` : `Subjects: ${book.subjects}`}
        </p>
      </div>
    </>
  );
};

export default BasicBookData;
