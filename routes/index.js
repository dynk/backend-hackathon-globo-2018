
const router = require('express').Router();
const logger = require('../utils/logger');
const searchCtrl = require('../controllers/search');
const fileUpload = require('express-fileupload');


router.get('/', info);
router.post('/search', searchCtrl.search);
router.post('/search/image', fileUpload(),searchCtrl.searchImage);


function info(req, res) {
  return res.json('e aew');
}



module.exports = exports = router;
