var g = require('node-g-search');
const moment = require('moment');
const TinEye = require('tineye-api');
const publicKey = 'LCkn,2K7osVwkX95K4Oy';
const privateKey = '6mm60lsCNIB,FwOWjJqA80QZHh9BMwc-ber4u=t^';
const tinEye = new TinEye('https://api.tineye.com/rest/', publicKey, privateKey);
const urlTemer = 'https://i2.wp.com/jornaldachapada.com.br/wp-content/uploads/2017/06/Temer-indica-Raquel-Dodge-para-substituir-Janot-na-chefia-da-PGR.jpg';
const params = {
    // 'offset': 0,
    // 'limit': 10,
    'sort': 'crawl_date',
    'order': 'desc'
  };
const serviceDomain = require('./domain');

function search(req = {}) {
    
    const { body = {} } = req;
    const {query } = body;
    if(!query){
        return;
    }
    return g.search(query)
        .then((d) =>  d.data.map(handleData));
}

function searchByDomain(req = {}) {
    
    const { body = {} } = req;
    const {query } = body;
    if(!query){
        return;
    }
    return g.search(query)
        .then((d) => d.data.map(handleData))
        .then(splitByDomain)
        .then((resultSplited) => filter(req,resultSplited));
}


function searchImage(req = {}){
    const { body = {}} = req;
    const { url } = body;
    const { files } = req;
    const { dataFile } = files;
    const imageData = dataFile.data;
    if(url){
        return tinEye.searchUrl(url, params);
    } 
    if(imageData){
        return tinEye.searchData(imageData, params)
            .then(parseImageDataResult);
    }
    return;
}

function searchImageByDomain(req = {}){
    const { body = {}} = req;
    const { url } = body;
    const { files } = req;
    const { dataFile } = files;
    const imageData = dataFile.data;
    if(url){
        return tinEye.searchUrl(url, params);
    } 
    if(imageData){
        return tinEye.searchData(imageData, params)
            .then(parseImageDataResult)
            .then(splitByDomain)
            .then((resultSplited) => filter(req,resultSplited));
    }
    return;
}

function parseImageDataResult(imageResults){
    return imageResults.results.matches.map((m) => {
        return m.backlinks.map((backlink) => {
            backlink.domain = m.domain;
            backlink.score = m.score;
            backlink.date = moment(backlink.crawl_date,"YYYY-MM-DD").format();
            backlink.href = backlink.url;
            backlink.domainLabel = backlink.backlink.substring(0,30)+'...';
            delete backlink.crawl_date;
            return backlink;
        });
    }).reduce((acc, cur)=>{
        return acc.concat(cur);
    },[]);
}

function splitByDomain(matches){
    return serviceDomain.get()
        .then((domains) => {
            const domainTypes = Object.keys(domains);
            const result = {};
            for(let dt of domainTypes){
                result[dt] = [];
            }
            result['nonVerified'] = [];
            for(let m of matches){
                let type;
                for(let dt of domainTypes){
                    for(let d of domains[dt]){
                        if(m.domain.indexOf(d) > -1){
                            type = dt;
                        }
                    }
                }
                if(type){
                    result[type].push(m);
                }else{
                    result['nonVerified'].push(m);
                }
            }
            return result;
            
        });

}

function filter(req = {}, results){
    let { body } = req;
    let { startDate, endDate } = body;
    results.filtered = [];
    if(startDate){
        startDate = moment(startDate);
        for(let i = 0; i < results.official.length; i++){
            if(startDate.diff(results.official[i].date) < 0){
                let removed = results.official.splice(i,1);
                results.filtered.push(removed);
            }
        }
        for(let i = 0; i < results.verified.length; i++){
            if(startDate.diff(results.verified[i].date) < 0){
                let removed = results.verified.splice(i,1);
                results.filtered.push(removed);
            }
        }
    }
    if(endDate){
        endDate = moment(endDate);
        for(let i = 0; i < results.official.length; i++){
            if(endDate.diff(results.official[i].date) > 0){
                let removed = results.official.splice(i,1);
                results.filtered.push(removed);
            }
        }
        for(let i = 0; i < results.verified.length; i++){
            if(endDate.diff(results.verified[i].date) > 0){
                let removed = results.verified.splice(i,1);
                results.filtered.push(removed);
            }
        }
    }
    return results;
}

function handleData(data) {
    const mapMonth = {
        'jan': '01',
        'fev': '02',
        'feb': '02',
        'mar': '03',
        'abr': '04',
        'apr': '04',
        'mai': '05',
        'may': '05',
        'jun': '06',
        'jul': '07',
        'ago': '08',
        'aug': '08',
        'set': '09',
        'sep': '09',
        'out': '10',
        'nov': '11',
        'dez': '12',
   }
    let { date } = data;
    date = data.date.replace(" - ", "");
    if(/hora/.test(date) || /hour/.test(date) ){
        date = moment().format();
    }else if(/day/.test(date) || /dia/.test(date) ){
        let day = parseInt(date.charAt(0));
        date = moment().subtract(day, 'day').format();
    }else if(/de/.test(date) ){
        let dateArr = date.split(" de ");
        let month = mapMonth[dateArr[1]];
        let parsedDate = `${month}-${dateArr[0]}-${dateArr[2]}`;
        date = moment(parsedDate, "MM-DD-YYYY").format();
    }else if(/,/.test(date) ){
        date = date.replace(", ", ",").replace(" ", ",");
        let dateArr = date.split(",");
        let month = mapMonth[dateArr[0].toLowerCase()];
        let parsedDate = `${month}-${dateArr[1]}-${dateArr[2]}`;
        date = moment(parsedDate, "MM-DD-YYYY").format();
    }else {
        date = moment().format();
    }
    data.date = date;
    data.domain = data.href;
    data.domainLabel = data.href.substring(0,30)+'...';
    return data;

}





module.exports = {
    search,
    searchByDomain,
    searchImage,
    searchImageByDomain
}