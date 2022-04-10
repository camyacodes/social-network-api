const { Thought } = require('../models');
const User = require('../models/User');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { username: thought.username },
            { $push: { thoughts: thought } },
            { new: true }
          ).then((user) => res.json(thought))
        })
        
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Delete a thought
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  
     // Create a Reaction
     addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: {reactions: req.body} },
            { runValidators: true, new: true }
          )
          .populate('reactions')  
          .then((reaction) =>
              !reaction
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
        },

    // Delete a Reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            { new: true}
        )
        .then(() => res.json({ message: 'Reaction deleted!' }))
        .catch((err) => res.status(500).json(err));
    }

};

