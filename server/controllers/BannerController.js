const Banner = require('../models/Banner');
const Slider = require('../models/Slider');
const Category = require('../models/Category');
const sequelize = require('../config/connection');
const apiUrl = process.env.apiUrl;

exports.getBanner = async (req, res) => {

  try {
    const banners = await Banner.findAll({
      attributes: [
        'id',
        'type',
        'cat_id',
        'product_id',
        'positions',
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/banner/', image)`), 'image'],
      ],
      include: {
        model: Category,
        as: 'category',
        attributes: ['category_name'],
      },
    });

    const sliders = await Slider.findAll({
      attributes: [
        'link',
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/slider/', image)`), 'image_url'],
      ],
      where: { status: 1 },
    });

    const topbanner = [];
    const largebanner = [];
    const leftbanner = [];
    const bottombanner = [];
    const popupbanner = [];

    banners.forEach(value => {
      const bannerItem = {
        type: value.type,
        image_url: value.image,
        cat_id: value.cat_id,
        category_name: value.category ? value.category.category_name : null,
        product_id: value.product_id,
      };

      switch (value.positions) {
        case 'top':
          topbanner.push(bannerItem);
          break;
        case 'large':
          largebanner.push(bannerItem);
          break;
        case 'left':
          leftbanner.push(bannerItem);
          break;
        case 'bottom':
          bottombanner.push(bannerItem);
          break;
        case 'popup':
          popupbanner.push(bannerItem);
          break;
        default:
          break;
      }
    });

    return res.status(200).json({
      status: 1,
      message: 'Success',
      topbanner,
      largebanner,
      leftbanner,
      bottombanner,
      popupbanner,
      sliders,
    });
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Error occurred', error: error.message });
  }
};
