const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const sketchRoutes = require('./sketchRoutes');
const galleryRoutes = require('./galleryRoutes');
const profileRoutes = require('./profileRoutes')


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/sketch', sketchRoutes);
router.use('/gallery', galleryRoutes);
router.use('/profile', profileRoutes);


module.exports = router;
