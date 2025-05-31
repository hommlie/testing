const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    heading: "Common Pests We Tackle Across India",
    subtitle: "Comprehensive pest solutions—designed to protect homes and businesses with lasting results.",
    pests: [
      {
        name: "Termite Control – Protect Your Property",
        img: "/images/seasontermites.png",
        description: "Prevent costly damage with Hommlie's expert termite treatment solutions. Our proven, eco-friendly methods ensure complete elimination and long-term protection for your property. Don't wait for termites to take over. Contact us at ",
        phone: "636-386-5658",
        link: "#"
      },
      {
        name: "Cockroach Control – Say Goodbye to Cockroaches",
        img: "/images/seasoncockroaches.png",
        description: "Eliminate cockroaches with Hommlie's advanced pest management solutions. Our targeted techniques ensure your home or business remains clean, safe, and pest-free. For immediate relief, contact us at ",
        phone: "636-386-5658",
        link: "#"
      },
      {
        name: "Bed Bug Control – Sleep Tight, No More Bites",
        img: "/images/seasonbedbugs.png",
        description: "Say goodbye to bed bugs with Hommlie's precision bed bug treatment. Our sustainable and effective methods ensure complete elimination for peaceful, undisturbed sleep. For fast, reliable service, contact us at ",
        phone: "636-386-5658",
        link: "#"
      }
    ]
  });
});

module.exports = router;
