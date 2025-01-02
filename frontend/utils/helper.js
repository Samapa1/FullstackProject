export const formatDate = (duedate) => {
  const formatteddate = new Date(duedate);
  const dateToShow = new Date(formatteddate - 1000);
  return dateToShow.toLocaleDateString();
};
