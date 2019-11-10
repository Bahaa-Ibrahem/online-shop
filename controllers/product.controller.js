const productsModel = require('../models/products.model');

exports.getProductById = (req , res) => {
    let id = req.params.id;
    productsModel.getProductById(id).then((product) => {
        res.render('product' , {
            product : product ,
            isUser : req.session.userId ,
            isAdmin : req.session.isAdmin,
            validationErrors : req.flash('validationErrors')[0]
        });
    });
};
exports.getProduct = (req , res) => {
    productsModel.getFirstProduct().then((product) => {
        res.render('product' , {
            product : product ,
            isUser : req.session.userId ,
            isAdmin : req.session.isAdmin,
            validationErrors : req.flash('validationErrors')[0],
            pageTitle : 'Products'
        });
    });
};