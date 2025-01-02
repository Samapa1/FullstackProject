const setDueDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 8);
  date.setHours(0, 0, 0);
  return date;
};

module.exports = { setDueDate };
