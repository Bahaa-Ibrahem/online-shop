const router = require('express').Router();
const productController = require('../controllers/product.controller');
const authGuard      = require('./guards/auth.guard');
 
router.get('/' , authGuard.notAuth , productController.getProduct);

router.get('/:id' , authGuard.isAuth , productController.getProductById);

module.exports = router; 