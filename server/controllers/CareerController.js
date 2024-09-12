const { Career } = require('../models');

exports.addCareer = async (req, res) => {
    try {
        const { name, email, applyingFor, message } = req.body;
        const resumePath = req.file ? req.file.path : null;

        const newCareer = await Career.create({
            name,
            email,
            applyingFor,
            resume: resumePath,
            message,
        });

        res.status(200).json({
            status: 1,
            message: 'Career application submitted successfully',
            data: newCareer,
        });
    } catch (error) {
        console.error('Error submitting career application:', error);
        res.status(500).json({
            status: 0,
            message: 'An error occurred while submitting the career application',
            error: error.message,
        });
    }
};