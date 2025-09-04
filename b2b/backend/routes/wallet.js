const express = require('express');
const router = express.Router();
const db = require('../db');

// Deduct money from wallet
router.post('/deductMoneyFromWallet', async (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || !amount) {
    return res.status(400).json({ message: 'userId and amount are required' });
  }
  try {
    // Get current wallet balance
    const [userRows] = await db.query('SELECT wallet FROM users WHERE id = ?', [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const currentWallet = userRows[0].wallet || 0;
    if (currentWallet < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }
    const newWallet = currentWallet - amount;
    await db.query('UPDATE users SET wallet = ? WHERE id = ?', [newWallet, userId]);
    return res.json({ wallet: newWallet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
