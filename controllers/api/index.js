const router = require('express').Router();
const userRoutes = require('./userRoutes');
const drawingRoutes = require('./drawingRoutes');

router.use('/users', userRoutes);
router.use('/drawing', drawingRoutes);

module.exports = router;
