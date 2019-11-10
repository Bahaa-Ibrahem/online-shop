const express      = require('express');
const app          = express();
const path         = require('path');
const session      = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash        = require('connect-flash');

const homeRouter          = require('./routes/home.route');
const productRouter       = require('./routes/product.route');
const authRouter          = require('./routes/auth.route');
const cartRouter          = require('./routes/cart.route');
const verifyOrderRouter   = require('./routes/verifyOrder.route');
const orderRouter         = require('./routes/order.route');
const adminRouter         = require('./routes/admin.route');

app.use(express.static(path.join(__dirname , 'assets'))); //To make static folder 
app.use(express.static(path.join(__dirname , 'images'))); //To make static folder 

app.use(flash());

const STORE = new SessionStore({
    uri : 'mongodb+srv://Bahaa:112314516@cluster0-60txf.mongodb.net/online-shop?retryWrites=true&w=majority',
    collection : 'sessions'
});

app.use(session({
    secret : 'this is my secret to hash express session....',
    saveUninitialized : false,
    resave : true,
    store : STORE
}));

app.set('view engine' , 'ejs'); //To create template engine ejs
app.set('views' , 'views'); //Default name views

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter); 
app.use('/cart', cartRouter);  
app.use('/verifyOrder', verifyOrderRouter); 
app.use('/order', orderRouter);
app.use('/admin', adminRouter);   

app.get('/error', (req, res, next) => {
    res.status(500);
    res.render('error', {
        isUser : req.session.userId,
        isAdmin : req.session.isAdmin
    })
});

app.get('/not-admin', (req, res, next) => {
    res.status(403);
    res.render('not-admin', {
        isUser : req.session.userId,
        isAdmin : false,
        pageTitle : 'Not Allowed'  
    })
});

app.use('/not-found', (req, res, next) => {
    res.status(404);
    res.render('not-found', {
        isUser : req.session.userId,
        isAdmin : false,
        pageTitle : 'Page Not Found'    
    })
});

app.use((err, req,res, next) => {
    res.redirect('/error'); 
})

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
    console.log('Node.js server is running on port ' + PORT);
});