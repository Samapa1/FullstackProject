import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRatings } from "../reducers/ratingReducer";
import { removeRating } from "../reducers/ratingReducer";
import { getUserData } from "../reducers/userReducer"
import { listStyle, Button } from './Styles.jsx'
import Notification from './Notification.jsx'
import { setNotification } from '../reducers/notificationReducer.js'

const Ratinglist = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData());
      }, [dispatch]);
      
    useEffect(() => {
        dispatch(getRatings()) 
      }, []) 

    const handleRemoval = async (rating) => {
        console.log("deleting")
        if (window.confirm(`Remove ${rating.user.name}'s book ${rating.book.title} by ${rating.book.author}?`)) {
            console.log(rating.id)
            dispatch(removeRating(rating.id))
            dispatch(setNotification( {data: `Rating removed`, type: 'info'}, 3000))
        }  
    }

    const ratings = useSelector(state => state.ratings)
    console.log(ratings)
    if (ratings.length > 0) {
        return(
            <div>
            <Notification/>
            <h1>Ratings</h1>
            {ratings.map(rating => 
                <div key = {rating.id} style={listStyle}>
                    <div>
                        {rating.book.title} by {rating.book.author} stars: {rating.stars} rated by {rating.user.name} 
                    </div>
                        <Button onClick = {() => handleRemoval(rating)}>Remove</Button>
                </div>
            )}
            </div>
        )
    }
}

export default Ratinglist