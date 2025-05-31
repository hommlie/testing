const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    logo: "/images/logo.png",
    logoScrolled: "/images/logo.svg",
    navLinks: [
      { label: "Termite Control", path: "/termite-control", type: "link" },
      { label: "Home Services", path: "https://hommlie.com/", type: "external" },
      {
        label: "Pest Control Service",
        type: "dropdown",
        section: "services",
        overview: {
          heading: "OUR SERVICES",
          description: "Find an effective treatment plan for pests at your business.",
          linkText: "VIEW ALL SERVICES",
          link: "/services"
        },
        items: [
          { label: "Cockroaches", path: "/services/cockroaches" },
          { label: "Termites", path: "/services/termites" },
          { label: "Flies", path: "/services/flies" },
          { label: "Ants", path: "/services/ants" },
          { label: "Mosquitoes", path: "/services/mosquitoes" },
          { label: "Rats", path: "/services/rats" },
          { label: "Bed Bugs", path: "/services/bed-bugs" },
          { label: "Spiders", path: "/services/spiders" }
        ]
      },
      {
        label: "Industries",
        type: "dropdown",
        section: "industries",
        overview: {
          heading: "INDUSTRIES",
          description: "Explore industry-specific pest control solutions.",
          linkText: "VIEW ALL INDUSTRIES",
          link: "/industries"
        },
        items: [
          { label: "Food Processing", path: "/industries/food-processing" },
          { label: "Hotels", path: "/industries/hotels" },
          { label: "Education", path: "/industries/education" },
          { label: "Food Retail", path: "/industries/food-retail" },
          { label: "Healthcare", path: "/industries/healthcare" },
          { label: "Construction", path: "/industries/construction" },
          { label: "Retail", path: "/industries/retail" }
        ]
      },
      {
        label: "Resources",
        type: "dropdown",
        section: "resources",
        overview: {
          heading: "RESOURCES",
          description: "Explore our resource hub for valuable insights and tips."
          
        },
        items: [
          { label: "Blog", path: "/resources/blog" },
          { label: "Case Studies", path: "/resources/case-studies" },
          { label: "Pest Library", path: "/resources/pest-library" },
          { label: "Videos", path: "/resources/videos" },
          { label: "Download Brochure", path: "/brochure.pdf", download: true }
        ]
      },
      { label: "Product", path: "#", type: "link" }
    ],
    quote: {
      heading: "GET A QUOTE",
      title: "Pest problem?\nWe can help.",
      phone: "+91 63638 65658"
    }
  });
});

module.exports = router;
