const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');
const authModel = require('../models/auth.model');
const validationResult = require('express-validator').validationResult;

exports.getOrder = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        orderModel.getOrders(req.session.userId).then((orders) => {
            res.render('order' , {
                orders : orders ,
                isUser : true  ,
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Orders'
            });
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/cart');
    }     
};

exports.postOrder = (req , res) => {
    if(validationResult(req).isEmpty()){
            authModel.getEmail(req.session.userId).then((email) => {
                orderModel.addNewOrder({
                    name      : req.body.name ,
                    price     : req.body.price ,
                    amount    : parseInt(req.body.amount) ,
                    cartId    : req.body.cartId ,
                    userId    : req.session.userId,
                    address   : req.body.address,
                    email     : email,
                    timestamp : Date.now()
            })        
            }).then(() => {
                cartModel.deleteItem(req.body.cartId)
            
            .then(() => {
                res.redirect('/order');
            })
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
    orderModel.deleteItem(req.params.id)
    .then(() => {
        res.redirect('/order');
    })
    .catch((err) => {
        next(err);
    })
};

exports.postDeleteAll = (req , res) => {
    orderModel.deleteAllItem()
    .then(() => {
        res.redirect('/');
    })
    .catch((err) => {
        next(err);
    })
};