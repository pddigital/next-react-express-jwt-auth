const users = require("./users.json");
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));
const jwt = Promise.promisifyAll(require("jsonwebtoken"));

const makeToken = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

module.exports = {
  getUser(req, res, next) {
    const theUser = users.filter(oneUser => {
      return oneUser.user === req.body.user;
    });
    if (theUser.length > 0) {
      res.theUser = theUser[0];
      next();
    } else {
      return res.status(404).json("No user matches that email");
    }
  },
  checkPw(req, res, next) {
    bcrypt
      .compare(req.body.password, res.theUser.password)
      .then(response => {
        if (response) {
          next();
        } else {
          return res.status(443).json(false);
        }
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  },
  createJwt(req, res, next) {
    const csrfToken = makeToken();
    jwt
      .signAsync(
        { user: res.theUser.user, csrf: csrfToken },
        "thepassphraseshhh"
      )
      .then(token => {
          res.cookie('thejwt', token, {
            maxAge: 43200000,
            httpOnly: true
          });
          
        return res.status(200).json({ user: res.theUser.user, csrf: csrfToken });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  }
};
