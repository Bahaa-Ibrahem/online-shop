const router = require('express').Router();
const bodyParser = require('body-parser');
const orderController = require('../controllers/order.controller');
const authGuard = require('./guards/auth.guard');
const check = require('express-validator').check;

router.get('/' , authGuard.isAuth , orderController.getOrder);

router.post('/' , authGuard.isAuth , 
                  bodyParser.urlencoded({extended : true}) , 
                  check('address').not().isEmpty().withMessage('Address is required...') ,
                  orderController.postOrder
            );

router.get('/delete/:id' , authGuard.isAuth , 
                        bodyParser.urlencoded({extended : true}) , 
                        orderController.postDelete
);

router.get('/deleteAll' , authGuard.isAuth , 
                           bodyParser.urlencoded({extended : true}) , 
                           orderController.postDeleteAll
);
        
module.exports = router;