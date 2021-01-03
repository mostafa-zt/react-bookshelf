const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        require: true,
        minLength: 4
    },
    name: {
        type: String,
        maxLength: 100
    },
    lastname: {
        type: String,
        maxLength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        // const salt = bcrypt.getSalt(SALT_I);
        // if (err) return next(err);
        bcrypt.hash(user.password, SALT_I, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function (cb) {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), config.SECRET);
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
};

userSchema.statics.findByToken = function (token, cb) {
    let user = this;
    jwt.verify(token, config.SECRET, function (err, decoc) {
        user.findOne({ "_id": decoc, "token": token }, (err, user) => {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

userSchema.methods.deleteToken = function (token, cb) {
    let user = this;
    user.update({ $unset: { token: 1 } }, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    });
};

const User = mongoose.model('User', userSchema);
module.exports = { User };