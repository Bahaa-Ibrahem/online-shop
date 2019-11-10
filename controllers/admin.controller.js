const validationResult = require('express-validator').validationResult;
const productModel = require('../models/products.model');
const orderModel = require('../models/order.model');

exports.postSave = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        orderModel.editOrder(req.body.id , req.body.status )
        .then(() => {
            res.redirect('/admin/orders');
        })
        .catch((err) => {
            next(err);
        })
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/admin/orders');
    }
};

exports.getOrderByEmail = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        orderModel.getAllOrdersByEmail(req.body.search).then((orders) => {
            res.render('mangeorders' , {
                orders : orders ,
                isUser : req.session.userId ,
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Mange Orders'
            });
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/admin/orders');
    }     
};

exports.getOrder = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        orderModel.getAllOrders(req.session.userId).then((orders) => {
            res.render('mangeorders' , {
                orders : orders ,
                isUser : req.session.userId ,
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Mange Orders'
            });
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/admin/orders');
    }     
};

exports.getOrderPending = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        orderModel.getAllOrdersPending().then((orders) => {
            res.render('mangeorders' , {
                orders : orders ,
                isUser : req.session.userId ,
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Mange Orders'
            });
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/admin/orders');
    }     
};

exports.getOrderSent = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        orderModel.getAllOrdersSent().then((orders) => {
            res.render('mangeorders' , {
                orders : orders ,
                isUser : req.session.userId ,
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Mange Orders'
            });
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/admin/orders');
    }     
};

exports.getOrderCompleted = (req , res ,next) => {
    if(validationResult(req).isEmpty()){
        orderModel.getAllOrdersCompleted().then((orders) => {
            res.render('mangeorders' , {
                orders : orders ,
                isUser : req.session.userId ,
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Mange Orders'
            });
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/admin/orders');
    }     
};

/*----------------------------------------------------------------------------------*/

exports.getAdd = (req, res, next) => {
    if(validationResult(req).isEmpty()){
    res.render('add-product', {
        authError : req.flash('authError')[0] ,
        validationErrors : req.flash('validationErrors') ,
        isUser : true,
        isAdmin : true,
        pageTitle : 'Add Product'
    });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/admin/add');
    }     
};

exports.postAdd = (req , res , next) => {
    if(validationResult(req).isEmpty()){
        productModel.addNewProduct({
                name        : req.body.name ,
                price       : req.body.price ,
                description : req.body.description,
                category    : req.body.category,
                image       : req.file.filename
            }).then(() => {
                res.redirect('/');
            }).catch((err) => {
                next(err);
            })
    
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/admin/add');
    }
};