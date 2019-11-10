const router     = require('express').Router();
const bodyParser = require('body-parser');
const check      = require('express-validator').check;
const authController = require('../controllers/auth.controller');
const authGuard      = require('./guards/auth.guard');

router.get('/signup' , authGuard.notAuth , authController.getSignup);

router.post('/signup' , authGuard.notAuth , bodyParser.urlencoded({extended : true}) , 
            check('username').not().isEmpty().withMessage('user name required...') , 
            check('email').not().isEmpty().withMessage('email required...').isEmail().withMessage('it is not format email...') ,
            check('password').not().isEmpty().withMessage('pssword required...').isLength({min : 6}).withMessage('your password must be more than 6 charchters...') , 
            check('confirmpassword').custom((value , {req}) => {
                if(value === req.body.password) return true;
                else throw 'password not matches...';
            }).withMessage('password not matches...') ,
            authController.postSignup);

router.get('/login' , authGuard.notAuth , authController.getLogin);

router.post('/login' , authGuard.notAuth , bodyParser.urlencoded({extended : true}) ,
            check('email').not().isEmpty().withMessage('email required...').isEmail().withMessage('it is not format email...') ,
            check('password').not().isEmpty().withMessage('pssword required...').isLength({min : 6}).withMessage('your password must be more than 6 charchters...') ,
            authController.postLogin);

router.all('/logout' , authGuard.isAuth , authController.logout);

module.exports = router;