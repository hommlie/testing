const sequelize = require('../config/connection');
const { Category, Slider, Banner } = require('../models');
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
        'link',
        'alt_tag',
        'image_title', 
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
        'alt_tag',
        'image_title',
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/slider/', image)`), 'image_url'],
      ],
      where: { status: 1 },
    });

    const topbanner = [];
    const largebanner = [];
    const leftbanner = [];
    const bottombanner = [];
    const popupbanner = [];
    const bannerReferEarn = [];
    const bannerQuickService = [];
    const bannerPest = [];
    const bannerMosqito = [];
    const bannerBird = [];

    banners.forEach(value => {
      const bannerItem = {
        type: value.type,
        image_url: value.image,
        alt_tag: value.alt_tag,
        image_title: value.image_title,
        cat_id: value.cat_id,
        category_name: value.category ? value.category.category_name : null,
        product_id: value.product_id,
        link: value.link
      };

      switch (value.positions) {
        case 'banner':
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
        case 'bannerReferEarn':
          bannerReferEarn.push(bannerItem);
          break;
        case 'bannerQuickService':
          bannerQuickService.push(bannerItem);
            break;
        case 'bannerPest':
          bannerPest.push(bannerItem);
            break;
        case 'bannerMosqito':
          bannerMosqito.push(bannerItem);
          break;
        case 'bannerBird':
          bannerBird.push(bannerItem);
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
      bannerReferEarn,
      bannerQuickService,
      bannerPest,
      bannerMosqito,
      bannerBird,
      sliders,
    });
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Error occurred', error: error.message });
  }
};
