const service = require('../services/search');

function search(req, res){
    return service.search(req).then((result) => {
        return res.json(result);
    });
}

module.exports = {
    search
}