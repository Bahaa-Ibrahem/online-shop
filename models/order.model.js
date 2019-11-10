const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const DB_URL = 'mongodb+srv://Bahaa:112314516@cluster0-60txf.mongodb.net/online-shop?retryWrites=true&w=majority';

const orderSchema = mongoose.Schema({
    name      : String ,
    price     : Number , 
    amount    : Number ,
    userId    : String ,
    productId : String ,
    address   : String ,
    email     : String,
    status    : {
        type : String,
        default : "pending"
    } ,
    timestamp : Number
});

const orderItem = mongoose.model('order' , orderSchema);

exports.getAllOrdersByEmail = newEmail => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return orderItem.find({email : newEmail});
        })
        .then((orders) => {
            mongoose.disconnect();
            resolve(orders);
        })
        .catch((err) => {
            mongoose.disconnect();
            console.log(err);
        })
    });
};

exports.getAllOrders = userId => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return orderItem.find({});
        })
        .then((orders) => {
            mongoose.disconnect();
            resolve(orders);
        })
        .catch((err) => {
            mongoose.disconnect();
            console.log(err);
        })
    });
};

exports.getAllOrdersPending = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return orderItem.find({status : 'pending'});
        })
        .then((orders) => {
            mongoose.disconnect();
            resolve(orders);
        })
        .catch((err) => {
            mongoose.disconnect();
            console.log(err);
        })
    });
};

exports.getAllOrdersSent = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return orderItem.find({status : 'sent'});
        })
        .then((orders) => {
            mongoose.disconnect();
            resolve(orders);
        })
        .catch((err) => {
            mongoose.disconnect();
            console.log(err);
        })
    });
};

exports.getAllOrdersCompleted = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return orderItem.find({status : 'completed'});
        })
        .then((orders) => {
            mongoose.disconnect();
            resolve(orders);
        })
        .catch((err) => {
            mongoose.disconnect();
            console.log(err);
        })
    });
};


exports.getOrders = userId => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return orderItem.find({userId : userId} , {} , {sort : {timestamp : 1}});
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

exports.addNewOrder = data => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            data.timestamp = Date.now();
            let order = new orderItem(data);
            return order.save(); 
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

exports.deleteItem = (id) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return orderItem.findByIdAndDelete(id);
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
            return orderItem.deleteMany(function(result , err){
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

exports.editOrder = (id , newstatus) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return orderItem.updateOne({ _id : id } , {status : newstatus, timestamp : Date.now()})    
        })
        .then(orders => {
            mongoose.disconnect();
            resolve(orders);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
};
