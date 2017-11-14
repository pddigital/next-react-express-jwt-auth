const userCtrl = require('./userCtrl');


module.exports = app => {
      app.get('/api/checkauth', userCtrl.checkAuth)      
      app.get('/api/logout', userCtrl.logout)
      app.post('/api/auth', userCtrl.getUser, userCtrl.checkPw, userCtrl.createJwt )   
      app.get('/api/protected', userCtrl.authGuard, userCtrl.protectedStuff)   
      
}