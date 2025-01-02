import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../reducers/bookReducer";
import { removeBook } from "../reducers/bookReducer";
import { Button, Input } from "./Styles";
import { setNotification } from "../reducers/notificationReducer";

const BookData = () => {
  const id = useParams().id;
  const allBooks = useSelector((state) => state.books);
  const book = allBooks.find((book) => book.id === Number(id));
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [items, setItems] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [libraryClass, setClass] = useState("");
  const [genre, setGenre] = useState("");
  const [subjects, setSubjects] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initializeBookData = useCallback(async () => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setItems(book.numberOfBooks);
      setYear(book.year);
      setLanguage(book.language);
      setClass(book.class);
      setGenre(book.genre);
      setSubjects(book.subjects);
    }
  }, [book]);

  useEffect(() => {
    initializeBookData();
  }, [initializeBookData]);

  const handleChanges = async (event) => {
    event.preventDefault();
    console.log("changing book details");

    try {
      await dispatch(
        updateBook({
          ...book,
          title: title,
          author: author,
          year: year,
          language: language,
          class: libraryClass,
          genre: genre,
          subjects: subjects,
          numberOfBooks: items,
        }),
      );
      await dispatch(
        setNotification(
          { data: `Changes saved succesfully`, type: "info" },
          3000,
        ),
      );
    } catch (exception) {
      await dispatch(
        setNotification(
          { data: `${exception.response.data.error}`, type: "error" },
          3000,
        ),
      );
    }
  };

  const handleDelete = async () => {
    console.log("deleting");
    if (window.confirm(`Remove ${book.title} by ${book.author} permanently?`)) {
      try {
        navigate("/books");
        await dispatch(removeBook(book.id));
        await dispatch(
          setNotification({ data: `Book deleted`, type: "info" }, 3000),
        );
      } catch (exception) {
        await dispatch(
          setNotification(
            { data: `${exception.response.data.error}`, type: "error" },
            3000,
          ),
        );
      }
    }
  };

  if (book) {
    return (
      <div>
        <h2>Change book details</h2>
        <form onSubmit={handleChanges}>
          <div>
            Title
            <Input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author
            <Input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Year
            <Input
              type="number"
              value={year}
              name="year"
              onChange={({ target }) => setYear(target.value)}
            />
          </div>
          <div>
            Language
            <Input
              type="text"
              value={language}
              name="language"
              onChange={({ target }) => setLanguage(target.value)}
            />
          </div>
          <div>
            Class
            <Input
              type="text"
              value={libraryClass}
              name="libraryClass"
              onChange={({ target }) => setClass(target.value)}
            />
          </div>
          <div>
            Number of books
            <Input
              type="number"
              value={items}
              name="items"
              onChange={({ target }) => setItems(target.value)}
            />
          </div>
          {book.genre ? (
            <div>
              Genre
              <Input
                type="text"
                value={genre}
                name="genre"
                onChange={({ target }) => setGenre(target.value)}
              />
            </div>
          ) : (
            <div>
              Subjects
              <Input
                type="text"
                value={subjects}
                name="subjects"
                onChange={({ target }) => setSubjects(target.value)}
              />
            </div>
          )}
          <Button type="submit">Save changes</Button>
        </form>
        <br></br>
        <p>Remove book from the database?</p>
        <Button onClick={handleDelete}>Delete book</Button>
      </div>
    );
  }
};

export default BookData;
