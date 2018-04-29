var g = require('node-g-search');

function search(req = {}) {
    
    const { body = {} } = req;
    const {query } = body;
    if(!query){
        return;
    }
    return g.search(query)
        .then(function (d) {

            if (d.data)
                console.log(d.data[0]);
            console.log('-------------');
            return d.data;
            // for (var i = 0; i < d.data.length; i++) {
            //   console.log('--------------');
            // 	console.log(d.data[i].title);
            // 	console.log(d.data[i].href);
            //   console.log(d.data[i].des);
            //   console.log('--------------');
            // }
        })
}



module.exports = {
    search
}