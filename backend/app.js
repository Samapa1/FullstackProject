const express = require("express");
const cors = require("cors");
require("express-async-errors");
const app = express();
const booksRouter = require("./controllers/books");
const usersRouter = require("./controllers/users");
const loansRouter = require("./controllers/loans");
const statusRouter = require("./controllers/status");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const reservationRouter = require("./controllers/reservations");
const testingRouter = require("./controllers/testing");
const ratingRouter = require("./controllers/ratings");
const middleware = require("./utils/middleware");
const reservationQueue = require("./controllers/queues");

const { connectToDatabase } = require("./utils/db");

app.use(cors());

app.use(express.json());

app.use("/api/books", booksRouter);

app.use("/api/users", usersRouter);

app.use("/api/loans", loansRouter);

app.use("/api/status", statusRouter);

app.use("/api/login", loginRouter);

app.use("/api/logout", logoutRouter);

app.use("/api/reservations", reservationRouter);

app.use("/api/ratings", ratingRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use("/api", (req, res) => {
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).end();
});

const start = async () => {
  await connectToDatabase();
};

start();

if (process.env.NODE_ENV !== "test") {
  reservationQueue();
}

app.use(middleware.errorHandler);

module.exports = app;
