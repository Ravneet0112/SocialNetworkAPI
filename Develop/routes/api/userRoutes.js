const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser, 
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
