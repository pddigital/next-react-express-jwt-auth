const fetch = require('isomorphic-fetch');

module.exports = {
  loginUser(user, password) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:4500/api/auth/`, {
        method: "post",
        body: JSON.stringify({ user: user, password: password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        }).then(response => {
          if(response){
            localStorage.setItem("user", JSON.stringify(response));
          }
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  checkAuth() {
      return new Promise((resolve, reject) => {
        if(localStorage.getItem('user')){
        let user = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:4500/api/checkauth`, {
          method: "get",
          credentials: "include",
          headers: {
            "x-csrf-token": user.csrf
          }
        })
          .then(response => {
            return response.json();
          })
          .then(response => {
            if (response) {
              localStorage.setItem("user", JSON.stringify(response));
            }
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
        }
        else {
          resolve(false)
        }
      });
    
  },
  getProtectedContent() {
    return new Promise((resolve, reject) => {
      if(localStorage.getItem('user')){
      let user = JSON.parse(localStorage.getItem('user'));
      fetch(`http://localhost:4500/api/protected`, {
        method: "get",
        credentials: "include",
        headers: {
          "x-csrf-token": user.csrf
        }
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
      }
      else {
        resolve(false)
      }
    });
  
},
  logoutUser() {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:4500/api/logout`, {
        method: "get",
        credentials: "include"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          localStorage.removeItem('user');          
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
