const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const axios = require("axios");
const moment = require ("moment")
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers: {
    formatDate: function (dateString) {
      return moment(dateString).format("MM/DD/YYYY"); // Adjust the format as needed
    },
    isCurrentUser: function (userId, currentUserId) {
      return userId === currentUserId;
    },
  },
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 86400000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Image search route
app.get('/api/search-image', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const SERP_API_KEY = '3a622712c36522d8b90dd1b79dd84dda5cd08ce070c87d67671cd7332083348a';
    const response = await axios.get(
      `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&tbm=isch&api_key=${SERP_API_KEY}`
    );

    if (response.data.images_results && response.data.images_results.length > 0) {
      // Get the first image that has a good size
      const image = response.data.images_results.find(img => img.original_width > 400);
      const imageUrl = image ? image.original : response.data.images_results[0].original;
      return res.json({ imageUrl });
    }

    return res.status(404).json({ error: 'No images found' });
  } catch (error) {
    console.error('Error searching for image:', error);
    return res.status(500).json({ error: 'Failed to search for image' });
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
