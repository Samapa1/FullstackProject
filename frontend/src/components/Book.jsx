const Book = ( {book} ) => {  
    console.log(book)

    const borrow = () => {
        return console.log("borrow the book")
    }


    return (
        <div>
            <h2>{book.title}</h2>
            <p>author: {book.author}</p>
            <p>year: {book.year}</p>
            <div>
                <p>available items: {book.available} <button onClick= {borrow}>Borrow</button></p>
            </div>
        </div>
    )
}

export default Book