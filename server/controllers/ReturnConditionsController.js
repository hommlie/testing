const { Op } = require('sequelize');
const { ReturnConditions, Order, Settings, Notification } = require('../models'); 
const apiUrl = process.env.apiUrl;

exports.returnconditions = async (req, res) => {
    const { order_id, user_id } = req.body;

    if (!order_id) {
        return res.status(400).json({ status: 0, message: "Order number is required" });
    }

    if (!user_id) {
        return res.status(400).json({ status: 0, message: "Please login" });
    }

    try {
        const order_info = await Order.findOne({
            attributes: [
                'id', 'product_id', 'vendor_id', 'product_name', 'price', 'qty', 'status',
                [sequelize.fn('COALESCE', sequelize.col('variation'), ''), 'variation'],
                [sequelize.fn('CONCAT', sequelize.literal(`'${process.env.BASE_URL}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']
            ],
            where: {
                id: order_id,
                user_id
            }
        });

        const data = await ReturnConditions.findAll({
            attributes: ['return_conditions']
        });

        if (data.length > 0) {
            return res.status(200).json({ status: 1, message: 'Success', order_info, data });
        } else {
            return res.status(200).json({ status: 0, message: 'No data found' });
        }
    } catch (error) {
        console.error("Error fetching return conditions:", error);
        return res.status(500).json({ status: 0, message: "Failed to fetch return conditions", error });
    }
};

exports.returnrequest = async (req, res) => {
    const { user_id, order_id, return_reason, comment, status } = req.body;

    if (!user_id) {
        return res.status(400).json({ status: 0, message: "User id is required" });
    }

    if (!order_id) {
        return res.status(400).json({ status: 0, message: "Order id is required" });
    }

    if (!return_reason) {
        return res.status(400).json({ status: 0, message: "Please select reason" });
    }

    try {
        const info = await Order.findOne({
            attributes: ['product_name', 'order_number'],
            where: { id: order_id }
        });

        const timezoneSetting = await Settings.findOne({
            attributes: ['timezone']
        });

        const timezone = timezoneSetting ? timezoneSetting.timezone : 'UTC';
        const returnedAt = new Date().toLocaleString('en-US', { timeZone: timezone });

        const return_number = [...Array(10)].map(() => Math.random().toString(36)[2].toUpperCase()).join('');

        const data = {
            return_reason,
            comment,
            status,
            return_number,
            returned_at: returnedAt
        };

        const orderUpdate = await Order.update(data, {
            where: {
                user_id,
                id: order_id
            }
        });

        if (orderUpdate[0] > 0) {
            const notification = {
                user_id,
                order_id,
                order_number: info.order_number,
                order_status: status,
                message: `Return request for ${info.product_name} has been raised`,
                is_read: "1",
                type: "order"
            };
            await Notification.create(notification);

            return res.status(200).json({ status: 1, message: 'Success' });
        } else {
            return res.status(200).json({ status: 0, message: 'Failed to raise return request' });
        }
    } catch (error) {
        console.error("Error raising return request:", error);
        return res.status(500).json({ status: 0, message: "Failed to raise return request", error });
    }
};
