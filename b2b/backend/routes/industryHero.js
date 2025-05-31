const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: "Industrial Pest Solutions",
    description: "Specialized pest management services designed for businesses to maintain hygiene standards, comply with regulations, and protect your reputation.",
    phone: "63638 65658",
    whatsapp: "916363865658"
  });
});

module.exports = router;
