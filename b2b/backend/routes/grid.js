const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    pests: {
      initial: [
        { name: "Cockroaches", img: "/images/cockroaches.png", path: "/services/cockroaches" },
        { name: "Termites", img: "/images/termites.png", path: "/services/termites" },
        { name: "Rats", img: "/images/rats.png", path: "/services/rats" },
        { name: "Snakes", img: "/images/birds.png", path: "/services/birds" },
        { name: "Mosquitoes", img: "/images/mosquitoes.png", path: "/services/mosquitoes" },
      ],
      extra: [
        { name: "Mice", img: "/images/mice.png", path: "/services/mice" },
        { name: "Flies", img: "/images/flies.png", path: "/services/flies" },
        { name: "Bed bugs", img: "/images/bedbugs.png", path: "/services/bed-bugs" },
        { name: "Spiders", img: "/images/spiders.png", path: "/services/spiders" },
        { name: "Ants", img: "/images/ants.png", path: "/services/ants" }
      ]
    },
    sectors: {
      initial: [
        { name: "Food processing", img: "/images/foodprocessing.png", path: "/industries/food-processing" },
        { name: "Hotels", img: "/images/hotel.png", path: "/industries/hotels" },
        { name: "Education", img: "/images/education.png", path: "/industries/education" },
        { name: "Food retail", img: "/images/foodretail.png", path: "/industries/food-retail" },
        { name: "Healthcare", img: "/images/healtcare.png", path: "/industries/healthcare" },
      ],
      extra: [
        { name: "Construction", img: "/images/construction.png", path: "/industries/construction" },
        { name: "Retail", img: "/images/retailfood.png", path: "/industries/retail" }
      ]
    }
  });
});

module.exports = router;
