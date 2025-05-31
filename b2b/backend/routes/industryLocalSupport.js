const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: "Industry-Specific Local Support",
    paragraphs: [
      "While our international expertise spans across 65 countries, enabling us to handle complex industry supply chains and operational networks, we prioritize delivering specialized solutions at the local level.",
      "Our local industry teams leverage global knowledge in compliance, safety standards, and technical expertise from our Global Industrial Solutions Center based in the UK.",
      "We dedicate time to understand your sector-specific challenges and operational risks, building lasting partnerships that ensure regulatory compliance and operational excellence."
    ]
  });
});

module.exports = router;
