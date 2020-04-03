/* Student mongoose model */
const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    author_id: {
        type: Number,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        // trim: false
    },
    community_id: {
        type: Number,
        required: true,
    },

    content: {
        type: String,
        required: false,
        trim: true,
        maxlength: 140,
    },
    tags: {
        type: Array,
        required: false,
        // trim: true
    }

    // post_type: {
    //     type: String,
    //     required: true,
    //     minlegth: 1,
    //     trim: true
    // },
    // actions : {
    //     type: Array,
    //     required: false,
    // },
    // rating: {
    //     type: Number,
    //     required: false,
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



});

// TODO: mongoose middleware


const Post = mongoose.model('Post', UserSchema)
module.exports = { Post }