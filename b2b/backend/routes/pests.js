const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
  res.json({
    title: "Protecting homes and businesses over 60 years",
    subtitle: "Choose a pest or business sector below to find out how we can help you",
    pests: [
      { title: 'Termites', image: '/images/termites.png', slug: 'termites' },
      { title: 'Flies', image: '/images/flies.png', slug: 'flies' },
      { title: 'Mosquitoes', image: '/images/mosquitoes.png', slug: 'mosquitoes' },
      { title: 'Ants', image: '/images/ants.png', slug: 'ants' },
      { title: 'Cockroaches', image: '/images/cockroaches.png', slug: 'cockroaches' },
      { title: 'Bed Bugs', image: '/images/bedbugs.png', slug: 'bed-bugs' },
      { title: 'Rats', image: '/images/rats.png', slug: 'rats' },
      { title: 'Spiders', image: '/images/spiders.png', slug: 'spiders' },
      { title: 'Birds', image: '/images/birds.png', slug: 'birds' },
    ]
  });
});

module.exports = router;
