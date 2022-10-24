const router = require("express").Router();
const { Drawing, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/sketch");
    return;
  }
  res.render("login");
});

router.get("/drawing/:id", async (req, res) => {
  try {
    const drawingData = await Drawing.findByPk(req.params.id, {
      include: [
        {
          model: User,
          model: Comment,
        },
      ],
    });
    const drawing = drawingData.get({ plain: true });
    const comment = drawing.comments;
    res.render("single", {
      ...drawing,
      ...comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete("/api/drawings/:id", async (req, res) => {
  try {
    const result = await Drawing.destroy({ where: { id: req.params.id } });
    res.json({
      error: false,
      message: "Ok",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Couldn't delete the drawing.",
    });
  }
});

router.get("/comment/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.findAll({ where: { drawing_id: postId } });
  res.json(comments);
});

router.post("/comment", async (req, res) => {
  const comment = req.body;
  await Comment.create(comment);
  res.json(comment);
});

module.exports = router;
