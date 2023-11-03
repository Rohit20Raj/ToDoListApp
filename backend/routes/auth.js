const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'r0h!t%R@j'

// Route 1: Create a user using: POST "/api/auth/createuser". Doesn't require auth.

router.post('/createuser', [
  // Validating name, email & pwd using pagckage: 'express-validator'
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })

], async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the user error caught during validation in the form of an array
      return res.status(400).json({ success, errors: errors.array() });
    }

    // Find the user with the given email

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ success, error: 'Email already in use' });
    }

    // If the user doesn't exist, create one
    const salt = bcrypt.genSaltSync(10);
    const securePwd = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePwd
    });

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(authToken);
    success = true;
    res.json({ success, authToken });

    // res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route 2: Authenticate a user using: POST "/api/auth/login". Doesn't require auth.

router.post('/login', [
  // Validating name, email & pwd using pagckage: 'express-validator'
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return the user error caught during validation in the form of an array
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Please try to login again with correct credentials' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: 'Please try to login again with correct credentials' });
    }
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(authToken);
    success = true;
    res.json({ success, authToken });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route 3: Get logged in user details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
