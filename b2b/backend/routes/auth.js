const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Signup with Phone Number, OTP (Assuming OTP verified separately), and Password
router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp, password } = req.body;

  // OTP validation logic should already be handled by your OTP system
  // This endpoint assumes OTP is verified before hitting this

  try {
    // Check if user already exists
    const [existing] = await pool.query('SELECT * FROM customers WHERE phoneNumber = ?', [phoneNumber]);
    if (existing.length > 0) return res.status(409).json({ message: 'Phone number already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO customers (phoneNumber, password) VALUES (?, ?)',
      [phoneNumber, hashedPassword]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Sign In with Phone Number and Password
router.post('/signin', async (req, res) => {
  
  const { phone, password } = req.body; // 'phone' key from frontend form

  try {
    const [rows] = await pool.query('SELECT * FROM customers WHERE phoneNumber = ?', [phone]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, phoneNumber: user.phoneNumber }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signin failed' });
  }
});

// Optional: Endpoint to send OTP (mock)
router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  // For demo, assume OTP is always sent
  try {
    console.log(`Sending OTP to ${phoneNumber}`); // Replace with actual logic
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

module.exports = router;
