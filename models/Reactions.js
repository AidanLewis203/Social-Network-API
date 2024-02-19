const {Schema, version} = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => formatDate(createdAtVal)
  }
}, {
  toJSON: {
    getters: true,
    versionKey: false,
    virtuals: true,
    
  },
  id: false

},
);

module.exports = reactionSchema;