const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { Notification } = require('../models'); 
const apiUrl = process.env.apiUrl;

exports.notification = async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ status: 0, message: "User id is required" });
    }

    try {
        const notifications = await Notification.findAll({
            attributes: [
                'order_id',
                'order_number',
                'order_status',
                'message',
                'type',
                [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d-%m-%Y'), 'date']
            ],
            where: { user_id },
            order: [['id', 'DESC']],
            limit: 10
        });

        if (notifications.length > 0) {
            return res.status(200).json({ status: 1, message: 'Success', data: notifications });
        } else {
            return res.status(200).json({ status: 0, message: 'No data found' });
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ status: 0, message: "Failed to fetch notifications", error });
    }
};

exports.notificationread = async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ status: 0, message: "User id is required" });
    }

    try {
        const [numberOfAffectedRows] = await Notification.update(
            { is_read: false },
            { where: { user_id } }
        );

        if (numberOfAffectedRows > 0) {
            return res.status(200).json({ status: 1, message: 'Success' });
        } else {
            return res.status(200).json({ status: 0, message: 'Failed to update notifications' });
        }
    } catch (error) {
        console.error("Error updating notifications:", error);
        return res.status(500).json({ status: 0, message: "Failed to update notifications", error });
    }
};
