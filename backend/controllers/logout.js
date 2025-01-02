const router = require("express").Router();
const { tokenExtractor } = require("../utils/middleware");
const Session = require("../models/session");

router.delete("/", tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: {
      userId: req.user.id,
    },
  });

  return res.status(204).end();
});

module.exports = router;
