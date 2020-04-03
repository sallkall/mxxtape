// community model
'use strict';

import {UserSchema} from "./user";

const mongoose = require('mongoose');

const CommmunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    genres: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    moderators: {
        type: [UserSchema],
        required: true,
        minlength: 1
    }
});

// Community model using community schema
const Community = mongoose.model('Community', CommmunitySchema);
module.exports = {Community};