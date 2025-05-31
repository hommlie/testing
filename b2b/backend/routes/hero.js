const express = require('express');
const router = express.Router();

router.get('/pest-control', (req, res) => {
  res.json({
    title: "Pest Control Services",
    description: "Get peace of mind with Hommlie’s quick, effective pest control solutions designed to eliminate infestations and reduce health and safety risks—without disrupting your daily life or operations.",
    phone: "6363865658",
    whatsapp: "916363865658"
  });
});

module.exports = router;
