// community model
'use strict';

import {UserSchema} from "./user";
const validator = require('validator');

const mongoose = require('mongoose');

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
        type: String,
        //TODO: make this happen!!!
        // type: [{
        //     type: String,
        //     validate: {
        //         validator: validator.isAlpha,
        //         message: 'Not valid genre'
        //     }
        // }],
        minlength: 1,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    moderators: {
        type: String
        //TODO: make this happen!
        // type: [UserSchema],
        // required: true,
        // minlength: 1
    },
    // members: [UserSchema]
});

CommmunitySchema.statics.findCommunityByName = function(name) {
    return Community.findOne({name: name}).then((community) => {
        return !community ? Promise.reject() : Promise.resolve(community)
    })
};

// Community model using community schema
const Community = mongoose.model('Community', CommmunitySchema);
module.exports = {Community};