const service = require('../services/domain');


function get(req, res){
    return service.get(req).then((result) => {
        return res.json(result);
    }); 
}

module.exports = {
    get
}