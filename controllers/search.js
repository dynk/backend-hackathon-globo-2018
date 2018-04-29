const service = require('../services/search');

function search(req, res){
    return service.search(req).then((result) => {
        return res.json(result);
    }); 
}

function searchByDomain(req, res){
    return service.searchByDomain(req).then((result) => {
        return res.json(result);
    }); 
}

function searchImage(req, res){
    return service.searchImage(req).then((result) => {
        return res.json(result);
    }); 
}

module.exports = {
    search,
    searchByDomain,
    searchImage
}