const FreeListing = require('../models/ListingForm');

class ListingFormController {
    // Create new listing
    async create(req, res) {
        try {
            const {
                userName,
                businessName,
                phoneNumber,
                address,
                city,
                pincode,
                area,
                landmark,
                state,
                latitude,
                longitude
            } = req.body;

            // Basic validation for required fields
            if (!userName || !businessName || !phoneNumber || !address || !city || !pincode) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all required fields'
                });
            }

            // Validate phone number length
            if (phoneNumber.length !== 10) {
                return res.status(400).json({
                    success: false,
                    message: 'Phone number must be exactly 10 digits'
                });
            }

            // Create listing
            const listing = await FreeListing.create({
                userName,
                businessName,
                phoneNumber,
                address,
                city,
                pincode,
                area,
                landmark,
                state,
                latitude,
                longitude,
                status: 'pending'
            });

            return res.status(201).json({
                success: true,
                message: 'Listing created successfully',
                data: listing
            });
        } catch (error) {
            console.error('Error creating listing:', error);
            
            // Handle Sequelize validation errors
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success: false,
                    message: error.errors.map(e => e.message).join(', ')
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get all listings with optional filters
    async getAll(req, res) {
        try {
            const { status, city, state } = req.query;
            const whereClause = {};

            // Add filters if provided
            if (status) whereClause.status = status;
            if (city) whereClause.city = city;
            if (state) whereClause.state = state;

            const listings = await FreeListing.findAll({
                where: whereClause,
                order: [['created_at', 'DESC']]
            });

            return res.status(200).json({
                success: true,
                data: listings
            });
        } catch (error) {
            console.error('Error fetching listings:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get single listing
    async getById(req, res) {
        try {
            const { id } = req.params;
            const listing = await FreeListing.findByPk(id);

            if (!listing) {
                return res.status(404).json({
                    success: false,
                    message: 'Listing not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: listing
            });
        } catch (error) {
            console.error('Error fetching listing:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Update listing
    async update(req, res) {
        try {
            const { id } = req.params;
            const listing = await FreeListing.findByPk(id);

            if (!listing) {
                return res.status(404).json({
                    success: false,
                    message: 'Listing not found'
                });
            }

            // Validate phone number if it's being updated
            if (req.body.phoneNumber && req.body.phoneNumber.length !== 10) {
                return res.status(400).json({
                    success: false,
                    message: 'Phone number must be exactly 10 digits'
                });
            }

            await listing.update(req.body);

            return res.status(200).json({
                success: true,
                message: 'Listing updated successfully',
                data: listing
            });
        } catch (error) {
            console.error('Error updating listing:', error);
            
            // Handle Sequelize validation errors
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success: false,
                    message: error.errors.map(e => e.message).join(', ')
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Delete listing
    async delete(req, res) {
        try {
            const { id } = req.params;
            const listing = await FreeListing.findByPk(id);

            if (!listing) {
                return res.status(404).json({
                    success: false,
                    message: 'Listing not found'
                });
            }

            await listing.destroy();

            return res.status(200).json({
                success: true,
                message: 'Listing deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting listing:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Update listing status
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const listing = await FreeListing.findByPk(id);

            if (!listing) {
                return res.status(404).json({
                    success: false,
                    message: 'Listing not found'
                });
            }

            // Validate status
            if (!['active', 'pending', 'rejected'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status value'
                });
            }

            await listing.update({ status });

            return res.status(200).json({
                success: true,
                message: 'Listing status updated successfully',
                data: listing
            });
        } catch (error) {
            console.error('Error updating listing status:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new ListingFormController();