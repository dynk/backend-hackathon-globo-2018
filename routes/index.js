
const router = require('express').Router();
const logger = require('../utils/logger');
const searchCtrl = require('../controllers/search');


router.get('/', info);
router.post('/search', searchCtrl.search);


function info(req, res) {
  return res.json('e aew');
}



module.exports = exports = router;
