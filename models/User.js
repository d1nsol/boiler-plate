const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minLength: 1
    },
    lastName: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        defalut: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

//save 전 수행됨
userSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        // Salt 를 이용해서 비밀번호를 암호화 해야함
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {User}