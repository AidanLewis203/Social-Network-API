const { Schema, model, Types, version } = require('mongoose');
const reactionSchema = require('./Reactions');
const formatDate = require('../utils/formatDate');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => formatDate(createdAtVal)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema],

}, {
  toJSON: {
    getters: true,
    versionKey: false,
    virtuals: true
  },
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions ? this.reactions.length : 0;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;