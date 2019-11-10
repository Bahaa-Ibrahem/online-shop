const cartModel = require('../models/cart.model');
const validationResult = require('express-validator').validationResult;

exports.postSave = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        cartModel.editItem( req.body.cartId , { amount : parseInt(req.body.amount) , timestamp : Date.now() } )
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => {
            next(err);
        })
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/cart');
    }
};

exports.postDelete = (req , res) => {
    cartModel.deleteItem(req.body.cartId)
    .then(() => {
        res.redirect('/cart');
    })
    .catch((err) => {
        next(err);
    })
};

exports.postDeleteAll = (req , res) => {
    cartModel.deleteAllItem()
    .then(() => {
        res.redirect('/');
    })
    .catch((err) => {
        next(err);
    })
};

exports.getCart = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        cartModel.getItemByUser(req.session.userId).then((items) => {
            res.render('cart' , {
                items : items ,
                isUser : true  ,
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Cart'
            });
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/cart');
    }     
};

exports.postCart = (req , res , next) => {
    if(validationResult(req).isEmpty()){
            cartModel.addNewItem({
                name      : req.body.name ,
                price     : req.body.price ,
                amount    : req.body.amount ,
                productId : req.body.productId ,
                userId    : req.session.userId,
                timestamp : Date.now()
            }).then(() => {
                res.redirect('/cart');
            }).catch((err) => {
                console.log(err);
            })
    
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect(req.body.redirectTo);
    }
};