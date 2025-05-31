const express = require('express');
const router = express.Router();

router.get('/tabs', (req, res) => {
  res.json({
    heading: "Commercial Pest Control",
    subheading: "Be it termites, flies, ants or something even Google can't identify, we have you covered.",
    tabs: [
      {
        title: '1. Pest inspection',
        description: 'Hassle-free pest survey and consultation',
        points: [
          '245 branches across the country for national coverage',
          'Calls returned within 24 hours (Mon-Fri)',
          'Solutions tailored to your requirements'
        ],
        image: '/images/pest1.png'
      },
      {
        title: '2. Pest treatment',
        description: 'Comprehensive pest treatment programs tailored to your needs',
        points: [
          'Certified, local pest control experts',
          'Environmentally-sensitive approach',
          'Safe for Humans and Pets'
        ],
        image: '/images/pest2.png'
      },
      {
        title: '3. Pest protection',
        description: 'If pests return after treatment, we will too — at no extra cost.',
        points: [
          'Integrated pest management (IPM) solutions',
          'Detailed post-service recommendations',
          'Pest prevention aftercare and advice'
        ],
        image: '/images/pest3.png'
      }
    ]
  });
});

module.exports = router;
