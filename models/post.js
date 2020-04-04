/* Post mongoose model */
const mongoose = require('mongoose')
const validator = require('validator')


const PostSchema = new mongoose.Schema({
    author: {
        type: String,
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
    },

    post_type: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },

    musicUrl: {
        type: String,
        required: false,
        trim: true,
        // validate: {
        //     validator: validator.isValidMusic,   // TODO: validator
        //     message: 'Not valid music url'
        // }
    },
    likes: {
        type: Number,
        required: true,
    },

    dislikes: {
        type: Number,
        required: true,
    }
});



// TODO: mongoose middleware


const Post = mongoose.model('Post', PostSchema)
module.exports = { Post }