import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector} from 'react-redux'
import { addRating } from '../reducers/ratingReducer.js'
import { getUserData } from "../reducers/userReducer"
import { initializeBooks } from "../reducers/bookReducer"
import { updateRating } from "../reducers/ratingReducer.js"

const StarRating = ( {id} ) => {

    const dispatch = useDispatch()
    const [stars, setStars] = useState(0)
    const [hover, setHover] = useState(0)
    const ratingScale = [1,2,3,4,5]

    const allBooks = useSelector(state => state.books)
    const book = allBooks.find(book => book.id === Number(id))
    console.log(book)
    const user = useSelector(state => state.user)
    let isRated = null
    // console.log(user)
    // if (user) {

    // }

    useEffect(() => {
      dispatch(initializeBooks()) 
      console.log("fetching books")
    }, [stars]) 

    useEffect(() => {
      dispatch(getUserData()) 
      console.log("fetching userData")
    }, [stars]) 

    useEffect(() => {
      console.log("fetching stars")
      if (isRated) {
        console.log(isRated.stars)
        setStars(isRated.stars)
      }
      console.log(isRated)
    }, [stars]) 
  
    const rateBook = async (star) => {
      console.log("rateBook")
      console.log(star)
      const userRatings = user.ratings
      isRated = userRatings.find(rating => rating.bookId === book.id)
      console.log(isRated)

      if (!isRated) {
        await dispatch(addRating({
          bookId: book.id,
          userId: user.id,
          stars: star
        }))
     } else {
        await dispatch(updateRating({
          id: isRated.id,
          stars: star
        }))
     }
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
      


export default StarRating