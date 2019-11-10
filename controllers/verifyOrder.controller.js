const validationResult = require('express-validator').validationResult;
exports.verifyOrder = (req, res) => {
    if(validationResult(req).isEmpty()){
        res.render('verifyOrder' , {
            name : req.body.name,
            amount : req.body.amount,
            price : req.body.price,
            cartId : req.body.cartId,
            isUser : req.session.userId ,
            isAdmin : req.session.isAdmin,
            validationErrors : req.flash('validationErrors')[0],
            pageTitle : 'Verify Product'
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/cart');
    }     
    
};
