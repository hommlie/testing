const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    heading: "Get in touch with us for a quick 2-min walk through of our product",
    segments: [
      "Food Processing",
      "Hotels",
      "Education",
      "Food Retail",
      "Healthcare",
      "Construction",
      "Retail Services",
      "Others"
    ]
  });
});

module.exports = router;
