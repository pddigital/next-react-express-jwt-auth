const fetch = require('isomorphic-fetch');

module.exports = {
    getContent(req, res, next){
        fetch('https://swapi.co/api/films/').then(films => {
            return films.json()
        }).then(content => {
            return res.status(200).json(content);
        })
    }
}