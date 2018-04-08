const userRoutes = require('./user/userRoutes');
const contentRoutes = require('./content/contentRoutes');

module.exports = app => {
  userRoutes(app);
  contentRoutes(app);
}