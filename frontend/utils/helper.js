export const formatDate = (duedate) => {
    let formatteddate = new Date(duedate)
    let dateToShow = new Date(formatteddate - 1000)
    return dateToShow.toLocaleDateString()
}
