const { Inspection } = require('../models');

exports.createInspection = async (req, res) => {
    try {
        const { 
            product_id, 
            fullName, 
            address, 
            latitude, 
            longitude, 
            mobile, 
            email, 
            date, 
            time 
        } = req.body;
        console.log(req.body);

        const newInspection = await Inspection.create({
            product_id,
            fullName,
            address,
            latitude,
            longitude,
            mobile,
            email,
            date,
            time,
        });

        res.status(200).json({
            status: 1,
            message: 'Inspection request submitted successfully',
            data: newInspection,
        });
    } catch (error) {
        console.error('Error submitting inspection request:', error);
        res.status(500).json({
            status: 0,
            message: 'An error occurred while submitting the inspection request',
            error: error.message,
        });
    }
};