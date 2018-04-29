
const router = require('express').Router();
const logger = require('../utils/logger');
const searchCtrl = require('../controllers/search');
const domainCtrl = require('../controllers/domain');
const fileUpload = require('express-fileupload');


router.get('/', info);
router.post('/search', searchCtrl.search);
router.post('/search/by-domain', searchCtrl.searchByDomain);
router.get('/domain', domainCtrl.get);
router.post('/search/image', fileUpload(),searchCtrl.searchImage);
router.post('/search/image/by-domain', fileUpload(),searchCtrl.searchImageByDomain);


function info(req, res) {
  return res.json('e aew');
}



module.exports = exports = router;
