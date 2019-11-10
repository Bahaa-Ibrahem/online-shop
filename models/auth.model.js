const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const DB_URL = 'mongodb+srv://Bahaa:112314516@cluster0-60txf.mongodb.net/online-shop?retryWrites=true&w=majority';
const userSchema = mongoose.Schema({
    username : String,
    email    : String,
    password : String,
    isAdmin  : {
        type    : Boolean,
        default : false
    }
});

const User = mongoose.model('user',userSchema);

exports.getEmail = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
           return User.findOne({_id : id});
        }).then((user) => {
            mongoose.disconnect();
            resolve(user.email);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })
    })
};
exports.createNewUser = (username , email ,password) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            User.findOne({email : email});
        }).then((user) => {
            if(user){
                mongoose.disconnect();
                reject('E-mail is used...');
            } 
            else{
                return bcrypt.hash(password , 10).then((hashedpassword) => {
                    let user = new User({
                        username : username,
                        email    : email,
                        password : hashedpassword,
                        isAdmin  : false
                    });
                    return user.save();
                }).then(() => {
                    mongoose.disconnect();
                    resolve();
                }).catch((err) => {
                    mongoose.disconnect();
                    reject(err);
                });
            }
        });
    });
};

exports.login = (email , password) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => User.findOne({email : email}))
        .then((user) => { 
            if(!user){
                mongoose.disconnect();
                reject('There is no user matches this email');
            }else{
                  bcrypt.compare(password , user.password).then(same => {
                    if(!same){
                        mongoose.disconnect();
                        reject('Password is incorrect');
                    }else{
                        mongoose.disconnect();
                        resolve({id : user._id,isAdmin : user.isAdmin});
                    }
                })
            }
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);  
        });
    });
};