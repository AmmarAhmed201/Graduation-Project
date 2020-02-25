const router = require('express').Router();
const {locStation} = require('../controllers/stations');



router.post('/station',locStation);
router.get('/station',locStation);



module.exports=router;