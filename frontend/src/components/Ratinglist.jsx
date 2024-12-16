import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addRating, getRatings } from "../reducers/ratingReducer";
import { removeRating } from "../reducers/ratingReducer";
import { getUserData } from "../reducers/userReducer"
import { listStyle, Button, Table } from './Styles.jsx'
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
            <Table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Stars</th>
                    <th>Rated by</th>
                    <th></th>
                </tr>
            {ratings.map(rating => 
                <tr key= {rating.id}>
                    <td>{rating.book.title}</td> 
                    <td>{rating.book.author}</td>
                    <td>{rating.stars}</td>
                    <td>{rating.user.name}</td>
                    <td><Button onClick = {() => handleRemoval(rating)}>Remove</Button></td>
                </tr>
            )}
            </tbody>
            </Table>
            </div>
        )
    }
}

export default Ratinglist


{/* <h1>Ratings</h1>
<table>
    <tbody>
    <tr>
        <th style= {{width: '200 px'}}>Book title</th>
        <th style= {{width: '200 px'}}>Book author</th>
        <th style= {{width: '200 px'}}>Stars</th>
        <th style= {{width: '200 px'}}>Rated by</th>
        <th></th>
    </tr>
{ratings.map(rating => 
    <tr>
            <td>{rating.book.title}</td> 
            <td>{rating.book.author}</td>
            <td>{rating.stars}</td>
            <td>{rating.user.name}</td>
            <td><Button onClick = {() => handleRemoval(rating)}>Remove</Button></td>
    </tr>
)}
</tbody>
</table> */}