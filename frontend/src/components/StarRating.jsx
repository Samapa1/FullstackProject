import { useState } from "react"
// import { starStyle } from './Styles'

const starRating = () => {
    const [stars, setStars] = useState(0)
    const [hover, setHover] = useState(0)
    const ratingScale = [1,2,3,4,5]

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
                  setStars(star)
                }}
               
              >
                &#9733;
              </span>
            )
          })}
        </div>
      )
      
}

export default starRating