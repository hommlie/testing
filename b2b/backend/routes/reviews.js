const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json([
    {
      text: "Hommlie's pest control service exceeded my expectations! They were prompt, professional...",
      name: 'Krishna',
      location: 'Gaurav Nagar, Bangalore'
    },
    {
      text: "I've been using Hommlie's cleaning services for months now, and they never disappoint...",
      name: 'Aslam',
      location: 'BTM Layout, Bangalore'
    },
    {
      text: "Birds were constantly causing a mess... thanks to Hommlie's bird control service...",
      name: 'Vishal',
      location: 'Kormangala, Bangalore'
    },
    {
      text: "Hommlie's mosquito meshing service was a game-changer for us...",
      name: 'Pallavi',
      location: 'Banshankari, Bangalore'
    },
    {
      text: "Hommlie did an outstanding job with cockroach control in our kitchen...",
      name: 'Archana',
      location: 'Navodaya Nagar, Bangalore'
    },
    {
      text: "Excellent service for termite protection. Super satisfied!",
      name: 'Harish',
      location: 'Whitefield, Bangalore'
    }
  ]);
});

module.exports = router;
