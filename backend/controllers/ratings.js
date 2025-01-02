const router = require("express").Router();
const { Book } = require("../models");
const { Rating } = require("../models");
const { User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");
const { sequelize } = require("../utils/db");

router.get("/", tokenExtractor, async (req, res) => {
  if (req.user.admin !== true) {
    return res
      .status(403)
      .json({ error: "Only admins are allowed to view ratings." });
  }
  const ratings = await Rating.findAll({
    include: [
      {
        model: Book,
        attributes: ["title", "author"],
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
    order: ["bookId"],
  });
  return res.json(ratings);
});

router.post("/", tokenExtractor, async (req, res) => {
  if (req.body.userId !== req.user.id) {
    return res.status(403).end();
  }
  try {
    await sequelize.transaction(async (t) => {
      const book = await Book.findByPk(req.body.bookId, { transaction: t });

      const updateBookRating = async () => {
        const allRatings = await Rating.findAll({
          where: {
            bookId: req.body.bookId,
          },
          transaction: t,
        });
        let sum = 0;
        allRatings.forEach((rating) => (sum += rating.stars));
        const average = sum / allRatings.length;
        return average;
      };

      const rated = await Rating.findOne({
        where: {
          userId: req.user.id,
          bookId: req.body.bookId,
        },
        transaction: t,
      });

      if (rated) {
        const stars = req.body.stars;
        rated.stars = stars;
        await rated.save({ transaction: t });
        const average = await updateBookRating();
        book.rating = average;
        await book.save({ transaction: t });
        return res.status(200).json(rated);
      }

      const newRating = await Rating.create(
        { ...req.body },
        { transaction: t },
      );
      const average = await updateBookRating();
      book.rating = average;
      await book.save({ transaction: t });
      return res.json(newRating);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Request failed" }).end();
  }
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  if (!req.user.admin) {
    return res.status(403).end();
  }
  const ratingToRemove = await Rating.findByPk(req.params.id);
  await ratingToRemove.destroy();
  return res.status(204).end();
});

module.exports = router;
