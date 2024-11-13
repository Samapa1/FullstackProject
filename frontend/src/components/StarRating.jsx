import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector} from 'react-redux'
import { addRating } from '../reducers/ratingReducer.js'
import { getUserData } from "../reducers/userReducer"
import { initializeBooks } from "../reducers/bookReducer"
import { updateRating } from "../reducers/ratingReducer.js"

const StarRating = ( {id} ) => {

    const dispatch = useDispatch()
    const allBooks = useSelector(state => state.books)
    const book = allBooks.find(book => book.id === Number(id))
    const user = useSelector(state => state.user)

    if (user) {
      const userRatings = user.ratings
      const isRated = userRatings.find(rating => rating.bookId === book.id)
      let firstStars = (0)
      if (isRated) {
        firstStars = isRated.stars
      }
      const [stars, setStars] = useState(firstStars)
      const [hover, setHover] = useState(0)
      const ratingScale = [1,2,3,4,5]
  
    useEffect(() => {
      dispatch(initializeBooks()) 
    }, [stars]) 

    useEffect(() => {
      dispatch(getUserData()) 
    }, [stars]) 
    
    const rateBook = async (star) => {
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
  
  }  


export default StarRating