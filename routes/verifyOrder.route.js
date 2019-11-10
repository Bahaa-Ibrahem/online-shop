const router = require('express').Router();
const bodyParser = require('body-parser');
const verifyOrderController = require('../controllers/verifyOrder.controller');
const authGuard = require('./guards/auth.guard');

router.post('/' , authGuard.isAuth , bodyParser.urlencoded({extended : true}) ,
                  verifyOrderController.verifyOrder);

module.exports = router;