const sequelize = require('../config/connection');
const { Sequelize, Op, fn, col, literal, where } = require('sequelize');
const { User, Product, ProductImage, Order, Variation, Ratting, Wishlist, Brand, Notification, Settings, Testimonials, Subcategory, ThoughtfulCurations } = require('../models');
const apiUrl = process.env.apiUrl;

exports.homeFeeds = async (req, res) => {
    const { user_id } = req.body;

    try {

        const commonProductAttributes = [
            'id',
            'product_name',
            'product_price',
            'discounted_price',
            'is_variation',
            'sku',
            'slug',
        ];

        const commonIncludes = [
            {
                model: ProductImage,
                attributes: [
                    'id',
                    'product_id',
                    'alt_tag',
                    'image_title',  
                    [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']
                ],
                where: {
                    media: 'Image'
                },
                as: 'productimage'
            },
            {
                model: Variation,
                attributes: ['id','product_id','price', 'discounted_variation_price', 'variation', 'qty'],
                as: 'variation',
                required: false
            },
            {
                model: Ratting,
                as: 'rattings',
                required: false
            },
            {
                model: User,
                attributes: [],
                where: {
                    is_available: 1
                },
                required: true,
                as: 'vendor'
            }
        ];

        // const featured_products = await Product.findAll({
        //     attributes: commonProductAttributes,
        //     include: commonIncludes,
        //     where: {
        //         is_featured: 1,
        //         status: 1
        //     },
        //     order: sequelize.random(),
        //     limit: 10,
        // });

        // const hot_products = await Product.findAll({
        //     attributes: commonProductAttributes,
        //     include: commonIncludes,
        //     where: {
        //         is_hot: 1,
        //         status: 1
        //     },
        //     order: sequelize.random(),
        //     limit: 10,
        // });

        // const new_products = await Product.findAll({
        //     attributes: commonProductAttributes,
        //     include: commonIncludes,
        //     where: {
        //         status: 1
        //     },
        //     order: [['id', 'DESC']],
        //     limit: 10,
        // });

        const most_booked_services = await Product.findAll({
            attributes: [
                ...commonProductAttributes,
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM orders
                        WHERE orders.product_id = Product.id
                    )`),
                    'order_count'
                ]
            ],
            include: commonIncludes,
            where: {
                status: 1
            },
            order: [[sequelize.literal('order_count'), 'DESC']],
            // group: ['Product.id'],
            limit: 10,
        });

        // const cleaning_services = await Product.findAll({
        //     attributes: commonProductAttributes,
        //     include: commonIncludes,
        //     where: {
        //         cat_id: 19,
        //         status: 1
        //     },
        //     order: [['id', 'DESC']],
        //     limit: 10,
        // });

        // const pest_control = await Product.findAll({
        //     attributes: commonProductAttributes,
        //     include: commonIncludes,
        //     where: {
        //         cat_id: 18,
        //         status: 1
        //     },
        //     order: [['id', 'DESC']],
        //     limit: 10,
        // });

        // const safety_pro_netting = await Product.findAll({
        //     attributes: commonProductAttributes,
        //     include: commonIncludes,
        //     where: {
        //         cat_id: 28,
        //         status: 1
        //     },
        //     order: [['id', 'DESC']],
        //     limit: 10,
        // });

        // const mosquito_mesh = await Product.findAll({
        //     attributes: commonProductAttributes,
        //     include: commonIncludes,
        //     where: {
        //         cat_id: 29,
        //         status: 1
        //     },
        //     order: [['id', 'DESC']],
        //     limit: 10,
        // });

        const cleaning_services = await Subcategory.findAll({
            attributes: [
              'id',
              'subcategory_name',
              'alt_tag',
              'image_title' ,
              [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`), 'image_url']
            ],
            where: { cat_id: 19, status: 1 }
        });

        const pest_control = await Subcategory.findAll({
            attributes: [
              'id',
              'subcategory_name',
              'alt_tag',
              'image_title',
              [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`), 'image_url']
            ],
            where: { cat_id: 18, status: 1 }
        });

        const safety_pro_netting = await Subcategory.findAll({
            attributes: [
              'id',
              'subcategory_name',
              'alt_tag',
              'image_title',
              [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`), 'image_url']
            ],
            where: { cat_id: 28, status: 1 }
        });

        const mosquito_mesh = await Subcategory.findAll({
            attributes: [
              'id',
              'subcategory_name',
              'alt_tag',
              'image_title',
              [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`), 'image_url']
            ],
            where: { cat_id: 47, status: 1 }
        });

        const shop_now = await Product.findAll({
            attributes: commonProductAttributes,
            include: [
                {
                    model: ProductImage,
                    attributes: [
                        'id',
                        'product_id',
                        'alt_tag',
                        'image_title', 
                        [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']
                    ],
                    where: {
                        media: 'Image'
                    },
                    as: 'productimage'
                },
                {
                    model: Variation,
                    attributes: ['id','product_id','price', 'discounted_variation_price', 'variation', 'qty'],
                    as: 'variation',
                    required: false
                },
                {
                    model: Ratting,
                    as: 'rattings',
                    required: false
                },
            ],
            where: {
                cat_id: 38,
                status: 1
            },
            // order: [['id', 'DESC']],
            limit: 10,
        });

        const videos = await ThoughtfulCurations.findAll({
            attributes: [
                  'id',
                  [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/thoughtfull-thumbnails/'`), sequelize.col('thumbnail')), 'thumbnail'],
                //   [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/thoughtfull-videos/'`), sequelize.col('video')), 'video']
                'video'
            ],
            limit: 4
        });

        const testimonials = await Testimonials.findAll({
            attributes: [
                'id',
                'name',
                'location',
                'feedback',
                [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/testimonials/'`), sequelize.col('image')), 'image']
            ],
            where: {
                status: 1
            }
        });

        // const vendors = await User.findAll({
        //     attributes: [
        //         'id',
        //         'name',
        //         [literal(`CONCAT('${process.env.BASE_URL}/storage/app/public/images/profile/', profile_pic)`), 'image_url']
        //     ],
        //     where: {
        //         type: 3,
        //         is_available: 1
        //     },
        //     order: Sequelize.literal('RAND()'),
        //     limit: 10
        // });

        // const brands = await Brand.findAll({
        //     attributes: [
        //         'id',
        //         'brand_name',
        //         [literal(`CONCAT('${process.env.BASE_URL}/storage/app/public/images/brand/', icon)`), 'image_url']
        //     ],
        //     where: {
        //         status: 1
        //     },
        //     order: [
        //         [Sequelize.fn('RAND')]
        //     ],
        //     limit: 10
        // });

        // featured_products.forEach(product => {
        //     // Convert numeric values to strings as per your expected response
        //     product.product_price = product.product_price.toString();
        //     product.discounted_price = product.discounted_price.toString();
        //     product.is_variation = product.is_variation ? "1" : "0"; 
        // });
        
        // hot_products.forEach(product => {
        //     product.product_price = product.product_price.toString();
        //     product.discounted_price = product.discounted_price.toString();
        //     product.is_variation = product.is_variation ? "1" : "0";
        // });
        
        // new_products.forEach(product => {
        //     product.product_price = product.product_price.toString();
        //     product.discounted_price = product.discounted_price.toString();
        //     product.is_variation = product.is_variation ? "1" : "0";
        // });        

        // const notifications = await Notification.count({
        //     where: {
        //         is_read: 1,
        //         user_id: user_id
        //     }
        // });

        const data = await Settings.findOne();

        if (
            // featured_products.length > 0 && 
            // hot_products.length > 0 && 
            // new_products.length > 0 &&
            most_booked_services.length > 0 
            // &&
            // cleaning_services.length > 0 &&
            // pest_control.length > 0 &&
            // safety_pro_netting.length > 0 &&
            // mosquito_mesh.length > 0 &&
            // shop_now.length > 0 &&
            // videos.length > 0 &&
            // testimonials.length > 0 &&
            // vendors.length > 0 &&
            // brands.length > 0
        ) {
            res.status(200).json({
                status: 1,
                message: 'Success',
                currency: data.currency,
                currency_position: data.currency_position,
                // featured_products: featured_products,
                // hot_products: hot_products,
                // new_products: new_products,
                most_booked_services: most_booked_services,
                cleaning_services: cleaning_services,
                pest_control: pest_control,
                safety_pro_netting: safety_pro_netting,
                mosquito_mesh: mosquito_mesh,
                shop_now: shop_now,
                videos: videos,
                testimonials: testimonials,
                // vendors: vendors,
                // brands: brands,
                // notifications: notifications
            });
        } else {
            res.status(200).json({
                status: 0,
                message: 'No data',
            });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 0,
            message: 'Internal server error',
            error: error
        });
    }
};
 
