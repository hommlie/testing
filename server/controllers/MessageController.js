const { Message } = require('../models');

exports.Message = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, message } = req.body;
  
        const newContact = await Message.create({
          fullName,
          email,
          phoneNumber,
          message,
        });
  
        res.status(200).json({
          status: 1,
          message: 'Contact form submitted successfully',
          data: newContact,
        });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
          status: 0,
          message: 'An error occurred while submitting the contact form',
          error: error.message,
        });
    }
}
