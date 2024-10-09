const bcrypt = require('bcrypt');
const User = require('../../models/userModel');

const createUser = async function (userInfo) {
    try {
        const salt = await bcrypt.genSalt(13);
        const encryptedPassword = await bcrypt.hash(userInfo.password, salt);
        const newUserData = {
            username: userInfo.username,
            password: encryptedPassword,
            favoritePicture: [],
        }

        const databaseUser = await User.create(newUserData);

        return databaseUser;
    } catch (error) {
        throw error;
    }
}

const getUsers = async function () {
    try {
        const users = await User.find({});

        return users;
    } catch (error) {
        throw error;
    }
}

const loginUser = async function (userData) {
    try {
        const foundUser = await User.findOne({ username: userData.username });
        if (!foundUser) {

            return 'No user by that username.';
        }

        const isCorrectPassword = bcrypt.compare(userData.password, foundUser.password);

        return isCorrectPassword;
    } catch (error) {
        throw error;
    }
}

const addFavoritePictureToUser = async function (userId, PictureId) {
    try {
        const currentUser = await User.findById(userId);
        currentUser.favoritePicture.push(PictureId);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {favoritePicture: currentUser.favoritePicture},
            {new: true}
        )

        return updatedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUsers,
    loginUser,
    addFavoritePictureToUser,
}