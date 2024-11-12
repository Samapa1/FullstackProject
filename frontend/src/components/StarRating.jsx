import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector} from 'react-redux'
import { addRating } from '../reducers/ratingReducer.js'
import bookService from '../services/books'

const StarRating = ( {id} ) => {
    const allBooks = useSelector(state => state.books)
    const book = allBooks.find(book => book.id === Number(id))
    // let book = null
    // const getBook = async (id) => {
    //   book = await bookService.getOne(id)
    //   return book
    // }

    // useEffect(() => {
    //   getBook(id)
    // }, [])

    
    if (book) {
    
    const [stars, setStars] = useState(book.rating)
    const [hover, setHover] = useState(0)
    const ratingScale = [1,2,3,4,5]

    console.log(book.rating)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const rateBook = async (star) => {
      console.log("rateBook")
      console.log(star)

      await dispatch(addRating({
        bookId: book.id,
        userId: user.id,
        stars: star
      }))
      setStars(star)
    }

    return (
        <div>
          {ratingScale.map((star) => {
            return (  
              <span
                style={{
                  cursor: 'pointer',
                  color: (stars || hover) >= star ? 'gold' : 'gray',
                  fontSize: `30px`,
                }}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => {
                  // setStars(star)
                  rateBook(star)
                }}
               
              >
                &#9733;
              </span>
            )
          })}
        </div>
      )

    }
      
}

export default StarRating