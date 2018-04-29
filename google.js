var g = require('node-g-search');

g.search("bon jovi")
.then(function(d){
	
  if(d.data)
    console.log(d.data[0]);
    console.log('-------------');
		// for (var i = 0; i < d.data.length; i++) {
    //   console.log('--------------');
		// 	console.log(d.data[i].title);
		// 	console.log(d.data[i].href);
    //   console.log(d.data[i].des);
    //   console.log('--------------');
		// }
})