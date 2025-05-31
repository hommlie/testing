const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    
    headline: "Smart, Scalable & Digitally Integrated Facility Solutions for Modern Businesses Across India",
    backgroundImage: "/images/bgimg.png", // now from public folder
    boxImage: "/images/boximg.png",       // now from public folder
    buttonText: "Submit",
    segmentOptions: [
      "Food Processing", "Hotels", "Education", "Food Retail",
      "Healthcare", "Construction", "Retail Services", "Others"
    ]
  });
});

module.exports = router;
