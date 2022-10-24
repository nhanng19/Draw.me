const router = require("express").Router();
const { Drawing, User} = require("../models");

router.get("/", async (req, res) => {
  try {
    const drawingData = await Drawing.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const drawings = drawingData.map((drawing) => drawing.get({ plain: true }));
    res.render("gallery", {
      drawings,
      username: req.session.user && req.session.user.name,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
