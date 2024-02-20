const {User, Thought} = require('../models');

module.exports = {

  async getAllUsers(req, res) {
    try {
      const users = await User.find({}).populate('thoughts')
      res.json(users);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId}).populate('thoughts');
      if (!user) {
          res.status(404).json({ message: 'No user with that ID' });
        return;
        }
        res.json(user)
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },

  async createUser(req, res) {
    try {
      const { username, email } = req.body;
      const user = await User.create({username, email, thoughts: [] });
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, 
        req.body,
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
        return;
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
        return;
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },

  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
        return;
      }
      return res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
        return;
      }
      return res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }
}