// controllers/WalletController.js
const { Wallet, WalletTransaction } = require('../models');

// Get Wallet Balance
exports.getWalletBalance = async (req, res) => {
  try {
    const { userId } = req.body;

    const wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({ success: false, message: 'Wallet not found' });
    }

    return res.status(200).json({ success: true, balance: wallet.balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Add Money to Wallet
exports.addMoneyToWallet = async (req, res) => {
  try {
    const { userId, amount, description, payment_id } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
    }

    let wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      wallet = await Wallet.create({ user_id: userId, balance: 0 });
    }

    wallet.balance += parseFloat(amount);
    await wallet.save();

    await WalletTransaction.create({
      wallet_id: wallet.id,
      transaction_type: 'credit',
      amount,
      payment_id,
      description: description || 'Money added to wallet',
    });

    return res.status(200).json({ success: true, message: 'Money added successfully', balance: wallet.balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Deduct Money from Wallet
exports.deductMoneyFromWallet = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
    }

    const wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({ success: false, message: 'Wallet not found' });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    wallet.balance -= parseFloat(amount);
    await wallet.save();

    await WalletTransaction.create({
      wallet_id: wallet.id,
      transaction_type: 'debit',
      amount,
      description: description || 'Money deducted from wallet',
    });

    return res.status(200).json({ success: true, message: 'Money deducted successfully', balance: wallet.balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Wallet Transactions
exports.getWalletTransactions = async (req, res) => {
  try {
    const { userId } = req.body;

    const wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({ success: false, message: 'Wallet not found' });
    }

    const transactions = await WalletTransaction.findAll({ where: { wallet_id: wallet.id } });

    return res.status(200).json({ success: true, transactions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
