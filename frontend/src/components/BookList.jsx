import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { linkStyle1, linkStyle2 } from "./Styles";
import { Input } from "./Styles";

const Booklist = () => {
  const user = useSelector((state) => state.user);
  const allBooks = useSelector((state) => state.books);
  const [filtered, setFilter] = useState("");
  const [fictionality, setFictionality] = useState("fiction");

  const filterBooks = () => {
    return (
      <div>
        <label>
          filter books:
          <Input
            value={filtered}
            onChange={({ target }) => setFilter(target.value)}
          />
        </label>
      </div>
    );
  };

  const radioFilter = () => {
    return (
      <div>
        <input
          id="fiction"
          type="radio"
          name="fictionality"
          onChange={() => setFictionality("fiction")}
          checked={fictionality === "fiction"}
        />
        <label htmlFor="fiction">fiction</label>
        <input
          id="nonfiction"
          type="radio"
          name="fictionality"
          onChange={() => setFictionality("nonfiction")}
          checked={fictionality === "nonfiction"}
        />
        <label htmlFor="nonfiction">non-fiction</label>
      </div>
    );
  };

  const booksToShow = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(filtered.toLowerCase()) ||
      book.author.toLowerCase().includes(filtered.toLowerCase()),
  );

  return (
    <div>
      <>
        <h1>Books</h1>
        {filterBooks()}
        {radioFilter()}
        <br></br>
        {fictionality === "fiction"
          ? booksToShow
              .filter((book) => book.class === "84.2" || book.class === "85")
              .map((book) => (
                <div key={book.id}>
                  <Link style={linkStyle1} to={`/books/${book.id}`}>
                    {book.title} by {book.author}
                  </Link>
                </div>
              ))
          : booksToShow
              .filter((book) => book.class !== "84.2" && book.class !== "85")
              .map((book) => (
                <div key={book.id}>
                  <Link style={linkStyle1} to={`/books/${book.id}`}>
                    {book.title} by {book.author}
                  </Link>
                </div>
              ))}
      </>
      <br></br>
      {user && user.admin ? (
        <Link style={linkStyle2} to={`/addBook`}>
          Add a book
        </Link>
      ) : null}
    </div>
  );
};

export default Booklist;
