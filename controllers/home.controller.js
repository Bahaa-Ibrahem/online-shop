const productsModel = require('../models/products.model');

exports.getHome = (req , res) => {
    let category = req.query.category;
    let vaildCategories = ['clothes' , 'cars' , 'mobiles' , 'test'];
    if(category && vaildCategories.includes(category)){
            productsModel.getProductsByCatrgory(category).then((products) => {
                res.render('index' , {
                    products : products ,
                    isUser : req.session.userId,
                    isAdmin : req.session.isAdmin,
                    validationErrors : req.flash('validationErrors')[0],
                    pageTitle : 'Home'
                })
            });
    }else{
        productsModel.getAllProducts().then((products) => {
            res.render('index' , {
                products : products ,
                isUser : req.session.userId ,
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Home'

            })
        });
    }
};