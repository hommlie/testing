const { Ratting, ReviewImage, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const apiUrl = process.env.apiUrl;
const profileApiUrl = process.env.profileApiUrl;

async function fetchProductReviews(product_id, reviewDataIncluded) {
    try {

        console.log(product_id);
        console.log(reviewDataIncluded);
        
      // Fetch reviews for the product with associated images
      const reviews = await Ratting.findAll({
        where: { product_id },
        include: [
          {
            model: User,
            attributes: [
                'id', 
                'name',
                [sequelize.fn('CONCAT', sequelize.literal(`'${profileApiUrl}/images/profile/'`), sequelize.col('profile_pic')), 'profile_pic']
            ],
            as: "users"
          },
          {
            model: ReviewImage,
            attributes: [
              'id', 
              [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/reviews/', image)`), 'image_url'],
            ],
          },
        ],
        attributes: [
          'user_id',
          'ratting',
          'emp_name',
          'comment',
          [sequelize.fn('DATE_FORMAT', sequelize.col('Ratting.created_at'), '%d-%m-%Y'), 'date']
        ],
        order: [['created_at', 'DESC']],
        limit: 10
      });

      const avgRatting = await Ratting.findAll({ where: { product_id } });
      const fiveRatting = await Ratting.findAll({ where: { product_id, ratting: 5 } });
      const fourRatting = await Ratting.findAll({ where: { product_id, ratting: 4 } });
      const threeRatting = await Ratting.findAll({ where: { product_id, ratting: 3 } });
      const twoRatting = await Ratting.findAll({ where: { product_id, ratting: 2 } });
      const oneRatting = await Ratting.findAll({ where: { product_id, ratting: 1 } });

      const rattings = {
        avg_ratting: avgRatting.reduce((acc, r) => acc + r.ratting, 0) / avgRatting.length,
        total: avgRatting.length,
        five_ratting: fiveRatting.length,
        four_ratting: fourRatting.length,
        three_ratting: threeRatting.length,
        two_ratting: twoRatting.length,
        one_ratting: oneRatting.length
      };
  
      // Process reviews
      const processedReviews = reviews.map(review => {
        const reviewData = review.toJSON();
        return {
          id: reviewData.id,
          ratting: reviewData.ratting,
          comment: reviewData.comment,
          created_at: reviewData.created_at,
          user: reviewData.user
            ? {
                name: reviewData.user.name,
                email: reviewData.user.email,
                mobile: reviewData.user.mobile,
                profile_pic: reviewData.user.profile_pic,
              }
            : null,
          images: reviewData.ReviewImages.map(
            img => `${apiUrl}/storage/app/public/images/reviews/${img.image}`
          ),
        };
      });
  
      // Calculate review statistics
      const totalReviews = processedReviews.length;
      const averageRating = totalReviews
        ? (
            processedReviews.reduce((sum, review) => sum + review.review, 0) /
            totalReviews
          ).toFixed(1)
        : 0;
  
      return {
        reviews: reviewDataIncluded ? processedReviews : null,
        reviewStats: {
          total_reviews: totalReviews,
          average_rating: parseFloat(averageRating),
        },
      };
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      throw error;
    }
}


module.exports = {
    fetchProductReviews,
};