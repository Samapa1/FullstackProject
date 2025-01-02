import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../reducers/bookReducer";
import { setNotification } from "../reducers/notificationReducer.js";
import { Button, Input } from "./Styles";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [items, setItems] = useState("");
  const [language, setLanguage] = useState("");
  const [libraryClass, setClass] = useState("");
  const [genre, setGenre] = useState("");
  const [subjects, setSubjects] = useState("");
  const [fictionality, setFictionality] = useState("fiction");

  const dispatch = useDispatch();

  const radioFilter = () => {
    return (
      <div>
        <input
          type="radio"
          name="fictionality"
          onChange={() => setFictionality("fiction")}
          checked={fictionality === "fiction"}
        />
        <label htmlFor="fiction">fiction</label>
        <input
          type="radio"
          name="fictionality"
          onChange={() => setFictionality("nonfiction")}
          checked={fictionality === "nonfiction"}
        />
        <label htmlFor="nonfiction">non-fiction</label>
      </div>
    );
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const bookObject = {
        title: title,
        author: author,
        year: Number(year),
        language: language,
        class: libraryClass,
        genre: genre,
        subjects: subjects,
        numberOfBooks: items,
      };
      await dispatch(addBook(bookObject));
      await dispatch(
        setNotification(
          {
            data: `${bookObject.title} by ${bookObject.author} added`,
            type: "info",
          },
          3000,
        ),
      );
    } catch (exception) {
      console.log("something went wrong");
      console.log(exception);
      await dispatch(
        setNotification(
          { data: `${exception.response.data.error}`, type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <div>
      <h1>Add a book to the database</h1>
      {radioFilter()}
      <form onSubmit={handleForm}>
        <div>
          title
          <Input
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <Input
            data-testid="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          year
          <Input
            data-testid="year"
            type="number"
            value={year}
            name="year"
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <div>
          language
          <Input
            data-testid="language"
            type="text"
            value={language}
            name="language"
            onChange={({ target }) => setLanguage(target.value)}
          />
        </div>
        <div>
          class
          <Input
            data-testid="class"
            type="text"
            value={libraryClass}
            name="class"
            onChange={({ target }) => setClass(target.value)}
          />
        </div>
        {fictionality === "fiction" ? (
          <div>
            genre
            <Input
              data-testid="genre"
              type="text"
              value={genre}
              name="genre"
              onChange={({ target }) => setGenre(target.value)}
            />
          </div>
        ) : (
          <div>
            subjects
            <Input
              data-testid="subjects"
              type="text"
              value={subjects}
              name="subjects"
              onChange={({ target }) => setSubjects(target.value)}
            />
          </div>
        )}
        <div>
          number of books
          <Input
            data-testid="items"
            type="number"
            value={items}
            name="items"
            onChange={({ target }) => setItems(target.value)}
          />
        </div>
        <Button type="submit">add</Button>
      </form>
    </div>
  );
};

export default BookForm;
