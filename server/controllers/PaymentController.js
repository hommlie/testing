const { Payment, User } = require('../models'); 
const apiUrl = process.env.apiUrl;

exports.paymentlist = async(req, res) => {
    const { user_id } = req.body;

    try {
      if (!user_id) {
        return res.status(400).json({ status: 0, message: 'Please login to save address' });
      }

      // Fetch user's wallet amount
      const { wallet } = await User.findByPk(user_id, { attributes: ['wallet'] });

      // Fetch list of active payment methods
      const paymentlist = await Payment.findAll({
        where: { status: '1' }
      });

      return res.status(200).json({
        status: 1,
        message: 'Success',
        paymentlist,
        walletamount: wallet
      });
      
    } catch (error) {
      return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
    }
}