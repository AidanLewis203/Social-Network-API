const {Thought, User} = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
      
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      res.json(thought);
      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body
      const user = await User.findOne({ username });
      
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
        return;
      }

      const thought = await Thought.create({ thoughtText, username });
      user.thoughts.push(thought);
      await user.save();
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
      
  },
  async updateThought(req, res) { 
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.Id },
        req.body,
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.Id });
      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      res.json(thought);
      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
      const newThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _Id: reactionId } } },
        { new: true }
      );
      if (!newThought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }}