import bcrypt from 'bcryptjs';  // Default import
import jwt from 'jsonwebtoken';  // Default import for jsonwebtoken
const { sign } = jwt;  // Destructure `sign` from the jsonwebtoken module
import User from './models/User.js';  // Import the User model

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, age,
      weight,
      height,
      activity,
      goal  } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // The password will be hashed in the pre-save hook
      age,
      weight,
      height,
      activity,
      goal
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
