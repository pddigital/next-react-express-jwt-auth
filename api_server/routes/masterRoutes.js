const userRoutes = require('./user/userRoutes');

module.exports = app => {
  userRoutes(app);
}