
'use strict';

const mongoose = require('mongoose');


const FeaturedSongSchema = new mongoose.Schema({
    featuredSong: String
});

// make a model using the User schema
const FeaturedSong = mongoose.model('FeaturedSong', FeaturedSongSchema);
module.exports = { FeaturedSong: FeaturedSong };

