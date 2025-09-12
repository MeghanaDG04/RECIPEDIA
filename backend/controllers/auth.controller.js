const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asynchandler'); 

exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, age, gender, address, phone } = req.body;
   console.log("Incoming register request body:", req.body);

  if (!username || !email || !password || !age || !gender || !address || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ 
      success: false, 
      message: 'Email already exists' 
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    age,
    gender,
    address,
    phone,
  });

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { token, user },
  });
  // res.redirect('/');
});

exports.login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  console.log("Login request body:", req.body);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Normalize email
  email = email.toLowerCase().trim();

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  console.log("Login success:", { user: user.email });

  res.status(200).json({
    success: true,
    token,
    user
  });
});
