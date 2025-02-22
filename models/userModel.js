const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    favoritePicture: [{
        ref: 'Picture',
        type: ObjectId,
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;