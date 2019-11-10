const router = require('express').Router();
const bodyParser = require('body-parser');
const check      = require('express-validator').check;
const adminController = require('../controllers/admin.controller');
const adminGuard = require('./guards/admin.guard');
const multer = require('multer');

router.get('/add', adminGuard, adminController.getAdd);

router.post('/add', adminGuard, bodyParser.urlencoded({extended : true}) ,
                    multer({
                        storage : multer.diskStorage({
                                destination : (req, file, cb) => {
                                cb(null, 'images');
                                },
                                filename : (req, file, cb) => {
                                    cb(null, Date.now() + '-' + file.originalname);
                                }
                        })
                    }).single('image'),
                    check('image').custom((value, {req}) => {
                        if(req.file) return true
                        else throw 'iamge is required'
                    }),
                    check('name').not().isEmpty().withMessage('Product name required'),
                    check('description').not().isEmpty().withMessage('Description name required'),
                    check('category').not().isEmpty().withMessage('Description name required'),
                    check('category').not().isEmpty().withMessage('Category name required'),
                    check('price').not().isEmpty().withMessage('Price required').isInt({min : 1}).withMessage('price must be more than 0') 
                    ,adminController.postAdd);

router.get('/orders', adminGuard, adminController.getOrder);

router.post('/orders', adminGuard, bodyParser.urlencoded({extended : true}),
                       check('search').not().isEmpty().withMessage('email required...').isEmail().withMessage('it is not format email...') ,
                       adminController.getOrderByEmail);

router.get('/orders/all', adminGuard, adminController.getOrder);

router.get('/orders/pending', adminGuard, adminController.getOrderPending);

router.get('/orders/sent', adminGuard, adminController.getOrderSent);

router.get('/orders/completed', adminGuard, adminController.getOrderCompleted);

router.post('/orders/save', adminGuard, 
                            bodyParser.urlencoded({extended : true}) , 
                            adminController.postSave
);

module.exports = router;
