const connection = require('../config/connection');
const { User, Thought } = require('../models');

const userData = [
  {
    username: 'testUser',
    email: '3J3t3@example.com'
  },
  {
    username: 'testUser2',
    email: '3J3t43@example.com'
  },
  {
    username: 'testUser3',
    email: '3J3t73@example.com'
  }
]
const thoughtData = [
  {
    thoughtText: 'test thought 1',
    username: 'testUser'

  },
  {
    thoughtText: 'test thought 2',
    username: 'testUser2'
  },
  {
    thoughtText: 'test thought 3',
    username: 'testUser3'
  }
]


connection.once('open', async () => {
  console.log('connected');
  await User.deleteMany({});
  await User.collection.insertMany(userData);
  await Thought.deleteMany({});
  await Thought.collection.insertMany(thoughtData);
  console.table(userData);
  console.table(thoughtData);
  process.exit(0);
})