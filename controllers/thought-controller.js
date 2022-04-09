const { User, Thought } = require("../models");

const thoughtController = {
	// /api/thoughts

	// get all thoughts
	getAllThought(req, res) {
		Thought.find({})
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	// get one thoughts by id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thoughts found with that id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	//create thought
	createThought({ body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then(dbThoughtData => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch(err => res.json(err));
	},
};

module.exports = thoughtController;
