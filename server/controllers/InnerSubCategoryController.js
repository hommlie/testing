const sequelize = require('../config/connection');
const { Product, Category, Subcategory, Innersubcategory, Attribute, ProductImage, Variation, Ratting } = require('../models');

const apiUrl = process.env.apiUrl;

exports.getInnerSubcategory = async (req, res) => {
    try {
      const { inner_subcat_id } = req.body;
  
      if (!inner_subcat_id) {
        return res.status(400).json({
          status: 0,
          message: 'inner_subcat_id is required',
        });
      }
  
      // Fetch specific inner subcategory data
      const innerSubcategoryData = await Innersubcategory.findOne({
        attributes: [
          'id',
          'innersubcategory_name',
          'slug',
          'cat_id',
          'subcat_id',
          [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/banner/'`), sequelize.col('banner')), 'banner'], 
        ],
        where: { 
          id: inner_subcat_id, 
          status: 1 
        }
      });
  
      if (!innerSubcategoryData) {
        return res.status(404).json({
          status: 0,
          message: 'Inner subcategory not found or inactive',
        });
      }
  
      // Fetch products for the specific inner subcategory
      const productsData = await Product.findAll({
        attributes: [
          'id',
          'product_name',
          'product_price',
          'discounted_price',
          'is_variation',
          'sku',
          'slug',
        ],
        include: [
          {
            model: ProductImage,
            attributes: [
              'id', 
              'product_id', 
              [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url'], 
              'alt_tag', 
              'image_title'
            ],
            where: { media: 'Image' },
            as: 'productimage'
          },
          {
            model: Variation,
            as: 'variations'
          },
          {
            model: Ratting,
            as: 'rattings'
          }
        ],
        where: {
          innersubcat_id: inner_subcat_id,
          status: 1,
        },
        order: [['id', 'DESC']],
      });
  
      // Structure the response
      const response = {
        innersubcat_id: innerSubcategoryData.id,
        innersubcategory_name: innerSubcategoryData.innersubcategory_name,
        slug: innerSubcategoryData.slug,
        banner: innerSubcategoryData.banner,
        products: productsData.map(product => ({
          id: product.id,
          product_name: product.product_name,
          product_price: product.product_price,
          discounted_price: product.discounted_price,
          is_variation: product.is_variation,
          sku: product.sku,
          slug: product.slug,
          product_image: product.productimage.length > 0 ? product.productimage[0].image_url : null,
          variations: product.variations,
          ratings: product.rattings
        }))
      };
  
      return res.status(200).json({ 
        status: 1, 
        message: 'Success', 
        data: response 
      });
    } catch (error) {
      console.error("Error fetching inner subcategory data:", error);
      return res.status(500).json({ 
        status: 0, 
        message: 'Error occurred', 
        error: error.message 
      });
    }
  };
  