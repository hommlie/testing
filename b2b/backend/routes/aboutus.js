const express = require('express');
const router = express.Router();

router.get('/api/aboutus', (req, res) => {
  res.json({
    hero: {
      title: "About Hommlie",
      subtitle: "Clean. Safe. Smart. We bring the future of home services to your doorstep."
    },
    sections: [
      {
        title: "Who We Are",
        content: "Hommlie is a next-generation home services platform built in Bangalore. We’re passionate about making your living space healthier, safer, and easier to maintain through reliable tech-powered services."
      },
      {
        title: "Our Mission",
        content: "To revolutionize how homeowners manage cleanliness and safety — by blending professional expertise with simplicity, trust, and smart technology."
      },
      {
        title: "Why Hommlie?",
        bullets: [
          "100% Verified & Skilled Professionals",
          "Eco-Safe Chemicals & Tools",
          "Transparent Pricing & Zero Hidden Fees",
          "24/7 Booking & Quick Turnaround"
        ]
      },
      {
        title: "Need Help?",
        content: "Our team is always ready to assist.",
        linkText: "Contact us here",
        linkHref: "/contact"
      }
    ]
  });
});

module.exports = router;
