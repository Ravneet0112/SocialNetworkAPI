const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // get one user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
        .select('-__v')
        .then((user) => 
            !user ? res.status(404).json({ message: 'No user found with this id' }) : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // create user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((user) => 
            !user ? res.status(404).json({ message: 'No user found with this id' }) 
            : Thought.deleteMany({ _id: { $in: user.thoughts} })
        )
        .then(() => res.json({ message: 'User deleted' }))
        .catch((err) => res.status(500).json(err));
    },

    // Update user by id

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user ? 
            res.status(404).json({ message: 'No user found with this id' }) 
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // add friend

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user 
            ? res.status(404).json({ message: 'No user found with this id' }) : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // delete friend

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user 
            ? res.status(404).json({ message: 'No user found with this id' }) : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }

};