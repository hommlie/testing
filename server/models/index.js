const sequelize = require('../config/connection');
const About = require('./About');
const Address = require('./Address');
const Attribute = require('./Attribute');
const Banner = require('./Banner');
const Cart = require('./Cart');
const Coupons = require('./Coupons');
const User = require('./User');
const Ratting = require('./Ratting');
const ReviewImage = require('./ReviewImage');
const Product = require('./Products');
const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Innersubcategory = require('./Innersubcategory');
const Order = require('./Order');
const ProductImage = require('./ProductImages');
const Variation = require('./Variation');
const Wishlist = require('./Wishlist');
const Brand = require('./Brand');
const Notification = require('./Notification');
const Settings = require('./Settings');
const Slider = require('./Slider');
const Payment = require('./Payment');
const Transaction = require('./Transaction');
const ReturnConditions = require('./ReturnConditions');
const PrivacyPolicy = require('./PrivacyPolicy');
const TermsConditions = require('./TermsConditions');
const Message = require('./Message');
const Career = require('./Career');
const PartnerForm = require('./PartnerForm');
const Inspection = require('./Inspection');
const Testimonials = require('./Testimonials');
const Employee = require('./Employee');
const ThoughtfulCurations = require('./ThoughtfulCuration');
const AppHeader = require('./AppHeader');
const ListingForm = require('./ListingForm');

// const apiUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

// Define relationships
Product.belongsTo(Category, { foreignKey: 'cat_id', as: 'category' });
Product.belongsTo(Subcategory, { foreignKey: 'subcat_id', as: 'subcategory' });
Product.belongsTo(Innersubcategory, { foreignKey: 'innersubcat_id', as: 'innersubcategory' });
Product.belongsTo(User, { foreignKey: 'vendor_id', as: 'vendor' });
Product.hasOne(ProductImage, {
  foreignKey: 'product_id',
  as: 'productimage',
  attributes: ['id', 'product_id', 'image']
});
Product.hasOne(Variation, {
  foreignKey: 'product_id',
  as: 'variation',
  attributes: ['id', 'product_id', 'price', 'discounted_variation_price', 'variation', 'qty']
});
Product.hasMany(ProductImage, {
  foreignKey: 'product_id',
  as: 'productimages',
  // attributes: ['id', 'product_id', ['image', 'image_name'], [sequelize.literal(`CONCAT('${url}/storage/app/public/images/products/', image)`), 'image_url']]
});
Product.hasMany(Variation, {
  foreignKey: 'product_id',
  as: 'variations',
  attributes: ['id', 'product_id', 'attribute_id', 'price', 'discounted_variation_price', 'variation', 'description', 'qty']
});
Product.hasMany(Ratting, {
  foreignKey: 'product_id',
  as: 'rattings',
  attributes: [
      'product_id',
      'emp_name',
      [sequelize.literal('ROUND(AVG(ratting), 1)'), 'avg_ratting']
  ],
  group: ['product_id']
});
Product.hasMany(Ratting, {
  foreignKey: 'product_id',
  as: 'reviews'
});
Product.hasMany(Wishlist, {
  foreignKey: 'product_id',
  as: 'wishlist'
});
Product.hasMany(Order, {
  foreignKey: 'product_id',
  as: 'orders'
});

Banner.belongsTo(Category, {
  foreignKey: 'cat_id',
  as: 'category'
});
// Banner.belongsTo(Product, {
//   foreignKey: 'product_id',
//   // targetKey: 'id',
//   as: 'product'
// });

Subcategory.belongsTo(Category, { 
  foreignKey: 'cat_id', 
  as: 'category' 
});

Innersubcategory.belongsTo(Category, {
  foreignKey: 'cat_id',
  as: 'category'
});
Innersubcategory.belongsTo(Subcategory, {
  foreignKey: 'subcat_id',
  as: 'subcategory'
});

Order.belongsTo(User, {
  foreignKey: 'vendor_id',
  as: 'vendors',
  attributes: [
      'id',
      'name',
      'store_address',
      // [sequelize.literal(`CONCAT('${url}/storage/app/public/images/profile/', profile_pic)`), 'image_url']
  ]
});
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Order.belongsTo(Payment, { foreignKey: 'payment_type', as: 'payment' });
Order.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
// Order.hasOne(Payment, {
//   foreignKey: 'id',
//   as: 'payment'
// })

Payment.hasMany(Order, { foreignKey: 'payment_type' });

User.hasOne(Ratting, {
  foreignKey: 'id',
  as: 'rattings',
  attributes: [
      'vendor_id',
      [sequelize.literal('ROUND(AVG(ratting), 1)'), 'avg_ratting']
  ],
  group: ['vendor_id']
});
User.hasMany(Product, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

Variation.belongsTo(Attribute, { foreignKey: 'attribute_id', as: 'attribute' });

Attribute.hasMany(Variation, { foreignKey: 'attribute_id', as: 'variations' });

Ratting.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'users',
  attributes: [
      'id',
      'name',
      // [sequelize.literal(`CONCAT('${url}/storage/app/public/images/profile/', profile_pic)`), 'image_url']
  ]
});
Ratting.hasMany(ReviewImage, { foreignKey: 'review_id' });

ReviewImage.belongsTo(Ratting, { foreignKey: 'review_id' });

// Wishlist.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Wishlist.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  About,
  Address,
  Attribute,
  Banner,
  Cart,
  Coupons,
  Order,
  Slider,
  User,
  Ratting,
  ReviewImage,
  Product,
  Category,
  Subcategory,
  Innersubcategory,
  ProductImage,
  Variation,
  Wishlist,
  Brand,
  Notification,
  Settings,
  Payment,
  Transaction,
  ReturnConditions,
  PrivacyPolicy,
  TermsConditions,
  Message,
  Career,
  PartnerForm,
  Inspection,
  Testimonials,
  Employee,
  ThoughtfulCurations,
  AppHeader,
  ListingForm
};
