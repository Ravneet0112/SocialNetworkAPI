const { User, Thought } = require('../models');


// Get all thoughts
module.exports = {
    getThoughts(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // Get one thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id' }) : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete thought
    // * * * * * * * * 
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id' }) 
                    : User.findOneAndUpdate( {thought: req.params.thoughtId }, 
                        { $pull: { thoughts: req.params.thoughtId } }, { new: true })
            )
            .then((user) =>
            !user ? res.status(404).json({ message: 'Thought deleted, but no user found with this id' }) :
                    res.json({ message: 'Thought deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)});
    },

    // Update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id' }) 
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add reaction

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete reaction

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};