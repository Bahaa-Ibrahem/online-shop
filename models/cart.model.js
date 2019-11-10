const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const DB_URL = 'mongodb+srv://Bahaa:112314516@cluster0-60txf.mongodb.net/online-shop?retryWrites=true&w=majority';

const cartSchema = mongoose.Schema({
    name      : String ,
    price     : Number , 
    amount    : Number ,
    userId    : String ,
    productId : String ,
    timestamp : Number
});

const CartItem = mongoose.model('cart' , cartSchema);

exports.editItem = (id , newData) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return CartItem.updateOne({ _id : id } , newData )    
        })
        .then(items => {
            mongoose.disconnect();
            resolve(items);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.deleteItem = (id) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.findByIdAndDelete(id);
        })
        .then(() => { 
            mongoose.disconnect();
            resolve();
         })
        .catch((err) => {
            reject(err);
        })

    });
};

exports.deleteAllItem = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
           return CartItem.deleteMany(function(result , err){
            });
        })
        .then(() => { 
            mongoose.disconnect();
            resolve();
         })
        .catch((err) => {
            reject(err);
        })

    });
};


exports.getItemByUser = userId => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.find({userId : userId} , {} , {sort : {timestamp : 1}});
        })
        .then((items) => {
            mongoose.disconnect();
            resolve(items);
        })
        .catch((err) => {
            mongoose.disconnect();
            console.log(err);
        })
    });
};

exports.addNewItem = data => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.findOne({productId : data.productId} ,function(result , err){
                 if(err)
                 {
                 let newAmount = parseInt(data.amount) + parseInt(err.amount); 
                 CartItem.updateOne({productId : data.productId} ,{ amount : newAmount } , (err , result) => { console.log(result) });    
                 }
                 else{
                let item = new CartItem(data);
                item.save();
                 }
            });
                
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch((err) => {
            mongoose.disconnect();
            reject(err);
        })
    });
};