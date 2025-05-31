const express = require('express');
const router = express.Router();

router.get('/api/contactus', (req, res) => {
  res.json({
    header: {
      title: "Get in Touch with Hommlie",
      subtitle: "Need help or have a question? We're just a message away."
    },
    formTitle: "Send Us a Message",
    contactInfoTitle: "Contact Information",
    contactDetails: {
      phone: "+91 63638 65658",
      email: "support@hommlie.com",
      hours: "Mon – Sat, 9:00 AM – 6:00 PM",
      address: "#15, 1st Block, Koramangala, Bangalore"
    },
    mapTitle: "Find Us Here",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62224.52720955338!2d77.5533068!3d12.9419682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3ffd65961b83%3A0x1a2fbd7cafae966c!2sHommlie!5e0!3m2!1sen!2sin!4v1715666666666!5m2!1sen!2sin"
  });
});

module.exports = router;
