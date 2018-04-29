const TinEye = require('tineye-api');

// sandbox
const publicKey = 'LCkn,2K7osVwkX95K4Oy';
const privateKey = '6mm60lsCNIB,FwOWjJqA80QZHh9BMwc-ber4u=t^';

const api = new TinEye('https://api.tineye.com/rest/', publicKey, privateKey);

// const url = 'https://tineye.com/images/meloncat.jpg';
const urlTemer = 'https://i2.wp.com/jornaldachapada.com.br/wp-content/uploads/2017/06/Temer-indica-Raquel-Dodge-para-substituir-Janot-na-chefia-da-PGR.jpg';

/**
 * sort:
 * - score
 * - size
 * - crawl_date
 * - matching_features
 */

const params = {
  'offset': 0,
  'limit': 10,
  'sort': 'crawl_date',
  'order': 'desc'
};

api.searchUrl(urlTemer, params)
  .then((response) => {
    console.log('success');
    // console.log(response);
    // console.log(response.results);
    console.log('matches', response.results.matches);
    console.log('matches', response.results.matches[0].backlinks);
  })
  .catch((error) => {
    console.log(error);
  });


// api.searchUrl(url, params)
//   .then((response) => {
//     console.log('success');
//     // console.log(response);
//     // console.log(response.results);
//     console.log('matches', response.results.matches);
//     console.log('matches', response.results.matches[0].backlinks);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

  // api.imageCount(url, params)
  // .then((response) => {
  //   // console.log('success');
  //   // console.log(response);
  //   // console.log(response.results);
  //   console.log('matches', response.results.matches);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
