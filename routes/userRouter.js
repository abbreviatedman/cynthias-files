const router = require('express').Router();

const {
    createUser,
    getUsers,
    loginUser,
    addFavoritePictureToUser,
}  = require('../controllers/api/userController');



const handleSuccess = function(res, data) {
    res.status(200).json({
        message: 'success',
        payload: data,
    })
}

const handleError = function (res, error, message) {
    console.log({message: message, payload: error});
    res.status(500).json({message: message, payload: error});
}

router.post('/', async function (req, res) {
    try {
        const newUser = await createUser(req.body);
        handleSuccess(res, newUser);
    } catch (error) {
        handleError(res, error, 'failure creating user');
    }
})

router.get('/', async function (req, res) {
    try {
        const users = await getUsers();
        handleSuccess(res, users);
    } catch (error) {
        handleError(res, error, 'failure getting all users');
    }
})

router.post('/login', async function (req, res) {
    try {
        const result = await loginUser(req.body);
        handleSuccess(res, result);
    } catch (error) {
        handleError(res, error, 'Error logging in.');
    }
})

router.put('/addFavoritePicture', async function (req, res) {
    try {
        const updatedUser = await addFavoritePictureToUser(req.body.userId, req.body.pokemonID)
        handleSuccess(res, updatedUser);
    } catch (error) {
        handleError(res, error, 'Failure to add favorite Picture.');
    }
});

module.exports = router;