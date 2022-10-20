const router = require("express").Router();
const { Drawing, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newDrawing = await Drawing.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newDrawing);
  } catch (err) {
    res.status(400).json(err);
  }
});

// API ROUTES
router.get("/", async (req, res) => {
  try {
    const drawings = await Drawing.findAll({ include: User });
    res.json(drawings);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: "Couldn't get drawings.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const drawing = await Drawing.findOne({
      where: { id: req.params.id },
      include: User,
    });
    res.json(drawing);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: "Couldn't get drawing.",
    });
  }
});

module.exports = router;
