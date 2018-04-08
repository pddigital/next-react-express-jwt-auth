const contentCtrl = require('./contentCtrl');

module.exports = app => {
    app.get('/api/content', contentCtrl.getContent)      
}