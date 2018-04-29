var g = require('node-g-search');
const moment = require('moment');
moment.locale('pt-BR');

function search(req = {}) {
    
    const { body = {} } = req;
    const {query } = body;
    if(!query){
        return;
    }
    return g.search(query)
        .then((d) => d.data.map(handleData));
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
    search
}