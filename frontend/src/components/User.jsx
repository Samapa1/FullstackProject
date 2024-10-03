import { useSelector} from 'react-redux'

const User = () => {

    const user = useSelector((state) => state.user);
    const allLoans = useSelector((state) => state.loans);
    const allBooks = useSelector((state) => state.books);


    const userLoans = allLoans.filter(loan => loan.userId === user.id)
    console.log(userLoans)
    const borrowedBookids = userLoans.map(loan => loan.bookId)
    console.log(borrowedBookids)
    const borrowedBooks = allBooks.filter (book => borrowedBookids.includes(book.id))
    console.log(borrowedBooks)
   
    if (user) {
        return (
            <div>
                User information: 
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Borrowed books:</p>
            </div>
        )
    }
}

export default User