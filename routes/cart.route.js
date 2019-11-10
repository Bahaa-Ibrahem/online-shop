const router = require('express').Router();
const bodyParser = require('body-parser');
const cartController = require('../controllers/cart.controller');
const authGuard = require('./guards/auth.guard');
const check = require('express-validator').check;

router.get('/' , authGuard.isAuth , cartController.getCart);

router.post('/' , authGuard.isAuth , 
                  bodyParser.urlencoded({extended : true}) , 
                  check('amount').not().isEmpty().withMessage('amount is required...').isInt({min : 1}).withMessage('amount must be more than 0') ,
                  cartController.postCart
            );

router.post('/save' , authGuard.isAuth , 
                      bodyParser.urlencoded({extended : true}) , 
                      check('amount').not().isEmpty().withMessage('amount is required...').isInt({min : 1}).withMessage('amount must be more than 0') ,
                      cartController.postSave
);

router.post('/delete' , authGuard.isAuth , 
                        bodyParser.urlencoded({extended : true}) , 
                        cartController.postDelete
);

router.post('/deleteAll' , authGuard.isAuth , 
                           bodyParser.urlencoded({extended : true}) , 
                           cartController.postDeleteAll
);

module.exports = router;