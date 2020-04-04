/* User model */
'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const CommmunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isAlpha,
            message: 'Not valid community name'
        }
    },
    genres: {
        // type: String,
        //TODO: make this happen!!!
        type: [{
            type: String,
            validate: {
                validator: validator.isAlpha,
                message: 'Not valid genre'
            }
        }],
        minlength: 1,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    moderators: {
        // type: String
        //TODO: make this happen!
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        required: true
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    // posts:[PostSchema],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

CommmunitySchema.statics.findCommunityByName = function(name) {
    const Community = this;
    return Community.findOne({name: name}).then((community) => {
        return !community ? Promise.reject() : Promise.resolve(community)
    })
};


const Community = mongoose.model('Community', CommmunitySchema);
module.exports = {Community};


///////////
////POSTS//
// /* Post mongoose model */
// // const mongoose = require('mongoose')
// // const validator = require('validator')
//
//
// const PostSchema = new mongoose.Schema({
//     author: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     avatar: {
//         type: String,
//         required: true,
//         // trim: false
//     },
//     community_id: {
//         type: Number,
//         required: true,
//     },
//
//     content: {
//         type: String,
//         required: false,
//         trim: true,
//         maxlength: 140,
//     },
//     tags: {
//         type: Array,
//         required: false,
//         // trim: true
//     },
//
//     post_type: {
//         type: String,
//         required: true,
//     },
//     rating: {
//         type: Number,
//         required: false,
//     },
//
//     musicUrl: {
//         type: String,
//         required: false,
//         trim: true,
//         // validate: {
//         //     validator: validator.isValidMusic,   // TODO: validator
//         //     message: 'Not valid music url'
//         // }
//     },
//     likes: {
//         type: Number,
//         required: true,
//     },
//
//     dislikes: {
//         type: Number,
//         required: true,
//     }
// });
//
//
//
// // TODO: mongoose middleware
//
//
// const Post = mongoose.model('Post', PostSchema);
// // module.exports = { Post }
// //