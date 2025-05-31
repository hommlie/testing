const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    heading: "Trending Seasonal Pests in India – Stay Ahead of the Seasons",
    subtitle: `Discover the most common seasonal pests across India and how Hommlie’s expert team can help you prevent and manage them effectively. From monsoon infestations to summer invasions, we offer proactive solutions for both homes and businesses—keeping your spaces pest-free all year long.`,
    pests: [
      {
        name: "Rat Control – Protect Your Property",
        img: "/images/trendingrat.png",
        description: "Keep rats and rodents away with Hommlie's expert rat control services. Our safe, effective methods ensure your property is protected from damage and health risks caused by rodents. For immediate assistance,",
        phone: "636-386-5658",
        link: "#"
      },
      {
        name: "Mosquito Control – Keep Mosquitoes at Bay",
        img: "/images/trendingmosquito.png",
        description: "Protect your home or business from mosquitoes with Hommlie's comprehensive mosquito control services. Our effective solutions create a safer environment for your family, employees, and customers.",
        phone: "636-386-5658",
        link: "#"
      },
      {
        name: "Bird Control – Humane Solutions for Bird Infestations",
        img: "/images/trendingbird.png",
        description: "Protect your property from bird-related damage with Hommlie's humane, eco-friendly bird control solutions. Our expert methods keep your space clean, safe, and free from infestations.",
        phone: "636-386-5658",
        link: "#"
      }
    ]
  });
});

module.exports = router;
