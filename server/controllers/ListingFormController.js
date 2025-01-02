const FreeListing = require('../models/ListingForm');

class ListingFormController {
    // Create new listing
    async create(req, res) {
        try {
            const {
                businessName,
                phoneNumber,
                email,
                address,
                city,
                services,
                experience
            } = req.body;

            // Basic validation
            if (!businessName || !phoneNumber || !address || !city || !services) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all required fields'
                });
            }

            // Create listing
            const listing = await FreeListing.create({
                businessName,
                phoneNumber,
                email,
                address,
                city,
                services,
                experience
            });

            return res.status(201).json({
                success: true,
                data: listing
            });
        } catch (error) {
            console.error('Error creating listing:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get all listings
    async getAll(req, res) {
        try {
            const listings = await FreeListing.findAll({
                where: { status: 'active' }
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

            await listing.update(req.body);

            return res.status(200).json({
                success: true,
                data: listing
            });
        } catch (error) {
            console.error('Error updating listing:', error);
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

    // Verify listing
    async verifyListing(req, res) {
        try {
            const { id } = req.params;
            const listing = await FreeListing.findByPk(id);

            if (!listing) {
                return res.status(404).json({
                    success: false,
                    message: 'Listing not found'
                });
            }

            await listing.update({
                isVerified: true,
                status: 'active'
            });

            return res.status(200).json({
                success: true,
                message: 'Listing verified successfully',
                data: listing
            });
        } catch (error) {
            console.error('Error verifying listing:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new ListingFormController();