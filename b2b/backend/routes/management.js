const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    heading: "Cutting-Edge Pest Management for Modern Businesses",
    subtitle: "Hommlie brings precision and innovation to pest management. Our strategic, science-driven approach uses the latest techniques and eco-friendly treatments to target infestations at the root. From prevention to eradication, we customize every solution to suit your facility's needs—ensuring a clean, compliant, and worry-free workplace that supports your business success.",
    cards: [
      {
        title: "6D Prime – Cockroach & Ant Control",
        image: "/images/gss4d.png",
        features: [
          "Detect – Inspect and identify infestation points",
          "Diagnose – Find root causes and entry areas",
          "Deny Entry – Seal gaps and cracks to block pests",
          "Deny Shelter – Remove nesting and hiding zones",
          "Deny Food – Eliminate access to food and moisture",
          "Destroy – Use targeted treatment for total control"
        ],
        link: "https://hommlie.com/product/6d-prime-cockroach-control-and-ant-control"
      },
      {
        title: "BirdPro – Safe & Humane Bird Control",
        image: "/images/birdpro.png",
        features: [
          "Netting – Heavy-duty nets to block entry points",
          "Spikes – Anti-roosting spikes for ledges and beams",
          "Repellents – Visual and physical deterrents",
          "No Harm – 100% safe for birds and compliant",
          "Low Maintenance – Long-lasting, weather-resistant setups",
          "Custom Fit – Tailored for your site and structure"
        ],
        link: "https://hommlie.com/category/bird-control"
      },
      {
        title: "EcoGuard – Integrated Pest Management (IPM)",
        image: "/images/ipm.png",
        features: [
          "Monitor – Regular inspections to detect early signs",
          "Assess – Analyze pest trends and risk zones",
          "Prevent – Block entry points and remove attractants",
          "Target – Apply focused treatments only where needed",
          "Reduce – Minimize chemical use with eco-safe options",
          "Sustain – Long-term protection through proactive planning"
        ],
        link: ""
      }
    ]
  });
});

module.exports = router;
