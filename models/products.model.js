const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const DB_URL = 'mongodb+srv://Bahaa:112314516@cluster0-60txf.mongodb.net/online-shop?retryWrites=true&w=majority';
const productSchema = mongoose.Schema({
    name        : String,
    price       : Number,
    description : String,
    category    : String,
    image       : String
});

const Product = mongoose.model('product',productSchema);

exports.getAllProducts = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find()
        }).then((products) => {
            mongoose.disconnect();
            resolve(products);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.getProductsByCatrgory = (category) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({category : category})
        }).then((products) => {
            mongoose.disconnect();
            resolve(products);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};
 
exports.getProductById = (id) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.findById(id)
        }).then((products) => {
            mongoose.disconnect();
            resolve(products);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.getFirstProduct = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.findOne()
        }).then((products) => {
            mongoose.disconnect();
            resolve(products);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.addNewProduct = data => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            let product = new Product(data);
            return product.save(); 
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