const { Cart, Attribute, Variation, Product } = require("../models");
const sequelize = require("../config/connection");
const apiUrl = process.env.apiUrl;

exports.addToCart = async (req, res) => {
  const {
    user_id,
    product_id,
    vendor_id,
    product_name,
    image,
    qty,
    price,
    attribute,
    variation,
    tax,
    shipping_cost,
  } = req.body;

  try {
    if (!user_id) {
      return res
        .status(400)
        .json({ status: 0, message: "User id is required" });
    }

    if (!product_id) {
      return res
        .status(400)
        .json({ status: 0, message: "Product id is required" });
    }

    if (!product_name) {
      return res
        .status(400)
        .json({ status: 0, message: "Product name is required" });
    }

    if (!qty) {
      return res.status(400).json({ status: 0, message: "QTY is required" });
    }

    if (!price) {
      return res.status(400).json({ status: 0, message: "Price is required" });
    }

    const existingCart = await Cart.findOne({ where: { user_id } });

    if (!existingCart) {
      const url = image;
      const parts = url.split("/");
      const image_url = parts[parts.length - 1];

      let attributeData = null;
      if (attribute) {
        attributeData = await Attribute.findOne({
          where: { id: attribute },
        });
      }

      let variationData = null;
      if (variation) {
        variationData = await Variation.findOne({
          where: { id: variation },
        });
      }

      const cartData = await Cart.create({
        user_id,
        product_id,
        vendor_id,
        product_name,
        image: image_url,
        qty,
        price,
        attribute,
        attribute_name: attributeData && attributeData.attribute,
        variation,
        variation_name: variationData && variationData.variation,
        tax,
        shipping_cost,
      });

      if (cartData) {
        return res.status(200).json({ status: 1, message: "Success" });
      } else {
        return res
          .status(200)
          .json({ status: 0, message: "Something went wrong" });
      }
    } else {
      if (
        existingCart.vendor_id !== vendor_id &&
        existingCart.user_id === user_id
      ) {
        return res.status(400).json({
          status: 0,
          message: "First empty your Cart, Then add new product in Cart",
        });
      } else {
        const url = image;
        const parts = url.split("/");
        const image_url = parts[parts.length - 1];

        let attributeData = null;
        if (attribute) {
          attributeData = await Attribute.findOne({
            where: { id: attribute },
          });
        }

        let variationData = null;
        if (variation) {
          variationData = await Variation.findOne({
            where: { id: variation },
          });
        }

        const cartData = await Cart.create({
          user_id,
          product_id,
          vendor_id,
          product_name,
          image: image_url,
          qty,
          price,
          attribute,
          attribute_name: attributeData && attributeData.attribute,
          variation,
          variation_name: variationData && variationData.variation,
          tax,
          shipping_cost,
        });

        if (cartData) {
          return res.status(200).json({ status: 1, message: "Success" });
        } else {
          return res
            .status(200)
            .json({ status: 0, message: "Something went wrong" });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  const { user_id } = req.body;

  try {
    if (!user_id) {
      return res
        .status(400)
        .json({ status: 0, message: "User id is required" });
    }

    const cartItems = await Cart.findAll({
      attributes: [
        "id",
        "user_id",
        "product_id",
        "product_name",
        "vendor_id",
        "qty",
        "price",
        "attribute",
        "attribute_name",
        "variation",
        "variation_name",
        "tax",
        "shipping_cost",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/products/', image)`
          ),
          "image_url",
        ],
      ],
      where: { user_id },
      order: [["id", "DESC"]],
    });

    if (cartItems.length > 0) {
      // Get all product IDs from cart
      const productIds = cartItems.map((item) => item.product_id);

      // Get product price data for these products
      const productPrices = await Product.findAll({
        attributes: ["id", "product_price", "discounted_price"],
        where: { id: productIds },
      });

      // Create a map for quick lookup
      const productPriceMap = {};
      productPrices.forEach((product) => {
        productPriceMap[product.id] = {
          product_price: product.product_price,
          discounted_price: product.discounted_price,
        };
      });

      // Add product price info to each cart item
      const enhancedCartItems = cartItems.map((item) => {
        const cartItemData = item.toJSON();
        // Add product price fields directly to the cart item
        if (productPriceMap[item.product_id]) {
          cartItemData.product_price =
            productPriceMap[item.product_id].product_price;
          cartItemData.discounted_price =
            productPriceMap[item.product_id].discounted_price;
        } else {
          cartItemData.product_price = null;
          cartItemData.discounted_price = null;
        }
        return cartItemData;
      });

      return res
        .status(200)
        .json({ status: 1, message: "Success", data: enhancedCartItems });
    } else {
      return res
        .status(200)
        .json({ status: 0, message: "No items found in the cart" });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { user_id, cart_id } = req.body;

  try {
    if (!user_id) {
      return res
        .status(400)
        .json({ status: 0, message: "User id is required" });
    }

    if (!cart_id) {
      return res
        .status(400)
        .json({ status: 0, message: "Cart id is required" });
    }

    const deleted = await Cart.destroy({
      where: { id: cart_id, user_id },
    });

    if (deleted) {
      return res.status(200).json({ status: 1, message: "Success" });
    } else {
      return res
        .status(200)
        .json({ status: 0, message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.qtyUpdate = async (req, res) => {
  const { cart_id, qty } = req.body;

  try {
    if (!cart_id) {
      return res
        .status(400)
        .json({ status: 0, message: "Cart id is required" });
    }

    if (!qty) {
      return res.status(400).json({ status: 0, message: "QTY is required" });
    }

    const updated = await Cart.update({ qty }, { where: { id: cart_id } });

    if (updated) {
      return res.status(200).json({ status: 1, message: "Success" });
    } else {
      return res
        .status(200)
        .json({ status: 0, message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
