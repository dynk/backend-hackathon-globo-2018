var g = require('node-g-search');
const moment = require('moment');
const TinEye = require('tineye-api');
const publicKey = 'LCkn,2K7osVwkX95K4Oy';
const privateKey = '6mm60lsCNIB,FwOWjJqA80QZHh9BMwc-ber4u=t^';
const tinEye = new TinEye('https://api.tineye.com/rest/', publicKey, privateKey);
const urlTemer = 'https://i2.wp.com/jornaldachapada.com.br/wp-content/uploads/2017/06/Temer-indica-Raquel-Dodge-para-substituir-Janot-na-chefia-da-PGR.jpg';
const params = {
    'offset': 0,
    'limit': 10,
    'sort': 'crawl_date',
    'order': 'desc'
  };

function search(req = {}) {
    
    const { body = {} } = req;
    const {query } = body;
    if(!query){
        return;
    }
    return g.search(query)
        .then((d) => d.data.map(handleData));
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

function parseImageDataResult(imageResults){
    return imageResults.results.matches.map((m) => {
        return m.backlinks.map((backlink) => {
            backlink.domain = m.domain;
            backlink.score = m.score;
            backlink.date = moment(backlink.crawl_date,"YYYY-MM-DD").format();
            delete backlink.crawl_date;
            return backlink;
        });
    });
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
    data.date = date
    return data;

    
}





module.exports = {
    search,
    searchImage
}