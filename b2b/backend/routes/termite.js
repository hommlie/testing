const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    hero: {
      title: "Professional Termite Control Services",
      description: "Protect your property from costly structural damage with our expert termite solutions",
      phone: "6363865658",
      whatsapp: "916363865658"
    },
    services: [
      { name: "Termite Inspection", icon: "🔍", description: "Thorough inspection to identify termite activity and potential damage"} ,
      { name: "Pre-Construction Treatment", icon: "🏗️", description: "Preventative treatment during the construction phase" },
      { name: "Post-Construction Treatment", icon: "🏠", description: "Effective solutions for existing structures" },
      { name: "Wood Borer Treatment", icon: "🐛", description: "Specialized treatment for wood-boring insects" },
      { name: "Annual Maintenance", icon: "📝", description: "Ongoing protection with regular inspections" },
      { name: "Digital Monitoring", icon: "📱", description: "Advanced digital tracking of termite activity" }
    ],
    process: [
      { step: 1, title: "Inspection", description: "Free comprehensive termite inspection" },
      { step: 2, title: "Assessment", description: "Detailed report and customized treatment plan" },
      { step: 3, title: "Treatment", description: "Professional application by certified technicians" },
      { step: 4, title: "Follow-up", description: "Post-treatment evaluation and monitoring" },
      { step: 5, title: "Prevention", description: "Ongoing maintenance recommendations" }
    ]
  });
});

module.exports = router;
