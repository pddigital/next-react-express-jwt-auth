const users = require("./users.json");
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));
const jwt = Promise.promisifyAll(require("jsonwebtoken"));


// this is a simple token generator, good enough for csrf...
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
    // this is querying the users JSON file, pretend it's a real DB for this step.
    const theUser = users.filter(oneUser => {
      return oneUser.user === req.body.user;
    });
    if (theUser.length > 0) {
      res.theUser = theUser[0];
      next();
    } else {
      return res.status(404).json(false);
    }
  },
  checkPw(req, res, next) {
    // its common to hash your password with bcrypt in a DB, but otherwise this is an optional step
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
        'thepassphraseshhh', {expiresIn: '1hr'}
      )
      .then(token => {
          res.cookie('thejwt', token, {
            maxAge: 43200000,
            httpOnly: true
            // FOR PRODUCTION:
            // secure: true,
            // domain: 'https://yourdomain.com'
          });
          
        return res.status(200).json({ user: res.theUser.user, csrf: csrfToken });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  },
  logout(req, res, next) {
    // overwriting the JWT with a 1 second expiring cookie to logout
    res.cookie(
      'thejwt',
      { loggedOut: true },
      { maxAge: 1000, httpOnly: true }
    );
    return res.status(200).json({ loggedOut: true });
  },
  checkAuth(req, res, next) {
    // both the jwt cookie and csrf token has to exist to verify the auth
    if(req.cookies['thejwt'] && req.headers['x-csrf-token']) {
      jwt
      .verifyAsync(req.cookies['thejwt'], 'thepassphraseshhh')
      .then(data => {
        if(data.csrf === req.headers['x-csrf-token']){
          return res.status(200).json(data);                                    
        }
        else {
          // returning 200 to not show an error in the console, fail silently...
          return res.status(200).json(false);                
        }
      })
      .catch(err => {
          return res.status(200).json(false);              
      });
      
    }
    else {
      return res.status(200).json(false);      
    }
  },

};
