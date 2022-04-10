const router = require('express').Router();
const {
  getUsers,
  getSingleUser, //and populated thought and friend data
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;


//bonus: remove a user's associated thoughts when deleted
