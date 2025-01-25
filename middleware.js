import pkg from 'jsonwebtoken';  // Default import for jsonwebtoken
const { verify } = pkg;  // Destructure the 'verify' method

import bcrypt from 'bcryptjs';  // Default import for bcryptjs
const { genSalt, hash } = bcrypt;  // Destructure genSalt and hash

// Secret key for JWT (you can store this securely in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Middleware to validate signup data
 */
// Validate signup data middleware (no username validation)
const validateSignup = (req, res, next) => {
  const { name, email, password, age, weight, height, activity, goal } = req.body;

  // Check for missing required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  next();
};


/**
 * Middleware to validate login data
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  next();
};

/**
 * Middleware to hash user password during signup
 */
const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Replace the plain text password with the hashed password
    req.body.password = hashedPassword;

    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * Middleware to authenticate JWT token
 */
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default {
  validateSignup,
  validateLogin,
  hashPassword,
  authenticateToken,
};
