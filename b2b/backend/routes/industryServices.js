const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      title: 'Food Processing',
      image: '/images/foodprocessing.png',
      path: '/industries/food-processing'
    },
    {
      title: 'Hotels',
      image: '/images/hotel.png',
      path: '/industries/hotels'
    },
    {
      title: 'Education',
      image: '/images/education.png',
      path: '/industries/education'
    },
    {
      title: 'Food Retail',
      image: '/images/retailfood.png',
      path: '/industries/food-retail'
    },
    {
      title: 'Healthcare',
      image: '/images/healtcare.png',
      path: '/industries/healthcare'
    },
    {
      title: 'Construction',
      image: '/images/construction.png',
      path: '/industries/construction'
    },
    {
      title: 'Retail',
      image: '/images/retail.png',
      path: '/industries/retail'
    }
  ]);
});

module.exports = router;
