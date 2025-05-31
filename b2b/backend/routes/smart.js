const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    heading: "What is Hommlie SMART",
    backgroundColor: "#f5f9ff",
    smartItems: [
      { 
        label: "Systematic", 
        icon: "/images/icon1.png",
        description: "Our systematic approach ensures every aspect of your project is carefully planned and executed with precision.",
        features: [
          "Structured methodology for consistent results",
          "Repeatable processes that ensure quality",
          "Comprehensive documentation at every stage",
          "Continuous improvement through feedback loops"
        ]
      },
      { 
        label: "Monitor Metrics", 
        icon: "/images/icon2.png",
        description: "Track and analyze key performance indicators to measure success and identify areas for improvement.",
        features: [
          "Real-time dashboard with key metrics",
          "Customizable reporting tools",
          "Automated alerts for critical changes",
          "Historical data analysis for trends"
        ]
      },
      { 
        label: "Accountable", 
        icon: "/images/icon3.png",
        description: "We take full responsibility for our work, with clear ownership and transparent reporting.",
        features: [
          "Dedicated point of contact for all projects",
          "Regular progress updates",
          "Performance guarantees where applicable",
          "Clear escalation paths for issues"
        ]
      },
      { 
        label: "Responsibility", 
        icon: "/images/icon4.png",
        description: "Ethical practices and social responsibility are at the core of everything we do.",
        features: [
          "Environmentally conscious operations",
          "Fair treatment of all stakeholders",
          "Community engagement initiatives",
          "Sustainable business practices"
        ]
      },
      { 
        label: "Transparent", 
        icon: "/images/icon5.png",
        description: "Complete visibility into processes, pricing, and decision-making builds trust with our clients.",
        features: [
          "Clear pricing with no hidden fees",
          "Open communication channels",
          "Full disclosure of methodologies",
          "Accessible documentation and records"
        ]
      }
    ]
  });
});

module.exports = router;