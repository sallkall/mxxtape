/* Student mongoose model */
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    community_id: {
        type: Number,
        required: true,
    },
    author_id: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 1,
        trim: true
    },
    post_type: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    // rating: {
    //     type: Number,
    //     required: false,
    // },
    // avatar: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // musicUrl: {
    //     type: String,
    //     required: false,
    //     trim: true,
    //     // validate: {
    //     //     validator: validator.isValidMusic,   // TODO: validator
    //     //     message: 'Not valid music url'
    //     // }
    // },
    //
    // content: {
    //     type: String,
    //     required: false,
    //     trim: true,
    //     maxlength: 140,
    // },
    //
    // tags: {
    //     type: Array,
    //     required: false,
    //     trim: true
    // }

});

// TODO: mongoose middleware


const Post = mongoose.model('Post', UserSchema)
module.exports = { Post }