const { PartnerForm } = require('../models');

exports.createPartnerForm = async (req, res) => {
    try {
        const { name, mobile, message } = req.body;

        const newPartnerForm = await PartnerForm.create({
            name,
            mobile,
            message,
        });

        res.status(200).json({
            status: 1,
            message: 'Partner form submitted successfully',
            data: newPartnerForm,
        });
    } catch (error) {
        console.error('Error submitting partner form:', error);
        res.status(500).json({
            status: 0,
            message: 'An error occurred while submitting the partner form',
            error: error.message,
        });
    }
};