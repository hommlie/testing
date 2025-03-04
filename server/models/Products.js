const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const {
  Category,
  Subcategory,
  Innersubcategory,
  ProductImage,
  Variation,
  Ratting,
  Wishlist,
} = require("./index");

class Product extends Model {}

Product.init(
  {
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //     model: 'users',
      //     key: 'id'
      // }
    },
    cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //     model: 'categories',
      //     key: 'id'
      // }
    },
    subcat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //     model: 'subcategories',
      //     key: 'id'
      // }
    },
    innersubcat_id: {
      type: DataTypes.INTEGER,
      // references: {
      //     model: 'innersubcategories',
      //     key: 'id'
      // }
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    tags: {
      type: DataTypes.TEXT,
    },
    // old_price: {
    //     type: DataTypes.FLOAT
    // },
    product_price: {
      type: DataTypes.FLOAT,
    },
    discounted_price: {
      type: DataTypes.FLOAT,
    },
    slug: {
      type: DataTypes.STRING,
    },
    is_variation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attribute: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_hot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    free_shipping: {
      type: DataTypes.INTEGER,
    },
    flat_rate: {
      type: DataTypes.FLOAT,
    },
    shipping_cost: {
      type: DataTypes.FLOAT,
    },
    is_return: {
      type: DataTypes.INTEGER,
    },
    return_days: {
      type: DataTypes.STRING,
    },
    is_featured: {
      type: DataTypes.INTEGER,
    },
    is_recommended: {
      type: DataTypes.INTEGER,
    },
    available_stock: {
      type: DataTypes.STRING,
    },
    est_shipping_days: {
      type: DataTypes.STRING,
    },
    tax: {
      type: DataTypes.FLOAT,
    },
    tax_type: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    meta_title: {
      type: DataTypes.STRING,
    },
    meta_description: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    total_reviews: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Product;
