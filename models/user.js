/* User model */
'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,   // custom validator
            message: 'Not valid email'
        }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    type: {
        type: Number,
        required: true,
        default: 1
    },
    displayName: {
        type: String,
    },
    avatar: {
        type: String
    },
    about: {
        type:String
    },

    history: {
        type: [String]  //TODO
    }

});


UserSchema.pre('save', function(next) {
    const user = this; // binds this to User document instance

    //TODO: This code is from the example.
    if (user.isModified('password')) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next()
            })
        })
    } else {
        next()
    }
});

//TODO: This code is from the example.
UserSchema.statics.findUser = function(username, password) {
    const User = this;

    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
};

//get user by just the username
UserSchema.statics.findUserByUsername = function(username) {
    const User = this;

    return User.findOne({username: username}).then((user) => {
        if (!user) {
            return Promise.reject()
        }
        return Promise.resolve(user)
    })
};

// make a model using the User schema
const User = mongoose.model('User', UserSchema);
module.exports = { User };

