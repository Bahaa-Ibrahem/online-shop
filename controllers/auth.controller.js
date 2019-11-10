const authModel        = require('../models/auth.model');
const validationResult = require('express-validator').validationResult;

exports.getSignup = (req , res) => {
        res.render('signup' , {
            authError : req.flash('authError')[0] ,
            validationErrors : req.flash('validationErrors') ,
            isUser : false,
            isAdmin : false,
            pageTitle : 'Signup'
        });
};

exports.postSignup = (req , res) => {
    if(validationResult(req).isEmpty()){
        authModel.createNewUser(req.body.username , req.body.email , req.body.password).then((
            res.redirect('/login')
        )).catch((err) => {
            console.log('Eroor bad : ' + err);
            res.redirect('/signup'); 
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/signup');
    }  
};

exports.getLogin = (req , res) => {
    res.render('login' , {
        authError : req.flash('authError')[0] ,
        validationErrors : req.flash('validationErrors') ,
        isUser : false,
        isAdmin : false,
        pageTitle : 'Login'
    });
};

exports.postLogin = (req , res) => {
    if(validationResult(req).isEmpty()){
        authModel.login(req.body.email , req.body.password).then((ressult) => {
            req.session.userId = ressult.id;
            req.session.isAdmin = ressult.isAdmin;
            res.redirect('/');
            }).catch((err) => {
            req.flash('authError' , err);
            console.log(err);
            res.redirect('/login');
        });
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/login');
    }
};

exports.logout = (req ,res) => {
    req.session.destroy(function(err){
        if(err){
           console.log(err);
        }else{
            // console.log(sessions.userId);
            // req.end();
            res.redirect('/login');
        }
     });
};