const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router
  .route('/:userid')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router 
  .route('/:userId/friends')
  .post(addFriend);

 router 
  .route('/:userId/friends/:friendId')
  .delete(deleteFriend); 

  module.exports = router;
