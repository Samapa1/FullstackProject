const router = require("express").Router();
const Loan = require("../models/loan");
const User = require("../models/user");
const Reservation = require("../models/reservation");
const Session = require("../models/session");

router.post("/reset", async (req, res) => {
  try {
    await Loan.truncate();
    await Reservation.truncate();
    await Session.truncate();
    await User.destroy({ truncate: { cascade: true } });
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(200).end();
  }
});

module.exports = router;
