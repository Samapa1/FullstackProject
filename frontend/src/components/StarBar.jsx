const StarBar = ( {book} ) => {

    let starBarNumbers = [1,2,3,4,5]
  
    const bookStars = Math.round(book.rating)

    return (
        <div>
        {starBarNumbers.map((star) => <span
              key={star}
              style={{
                color: bookStars >= star ? 'gold' : 'gray',
                fontSize: `30px`,
              }}          
            >
              &#9733;
            </span>
          )
        }
        </div>
      )

    }


export default StarBar