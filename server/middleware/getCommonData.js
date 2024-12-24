const { Ratting, ReviewImage, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const apiUrl = process.env.apiUrl;

async function fetchProductReviews(productId) {
    try {
      // Fetch reviews for the product with associated images
      const reviews = await Ratting.findAll({
        where: { product_id: productId },
        include: [
          {
            model: ReviewImage,
            attributes: ['image'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email', 'mobile', 'profile_pic'],
          },
        ],
        order: [['created_at', 'DESC']],
      });
  
      // Process reviews
      const processedReviews = reviews.map(review => {
        const reviewData = review.toJSON();
        return {
          id: reviewData.id,
          review: reviewData.review,
          rating: reviewData.rating,
          comment: reviewData.comment,
          created_at: reviewData.created_at,
          user: reviewData.user
            ? {
                name: reviewData.user.name,
                email: reviewData.user.email,
                mobile: reviewData.user.mobile,
                profile_pic: reviewData.user.profile_pic
                  ? `${apiUrl}/userprofile_pics/${reviewData.user.profile_pic}`
                  : null,
              }
            : null,
          images: reviewData.ReviewImages.map(
            img => `${apiUrl}/reviewImages/${img.image}`
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
        reviews: processedReviews,
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