const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)

module.exports = router;