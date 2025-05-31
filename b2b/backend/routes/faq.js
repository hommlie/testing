const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    heading: "Hommlie Frequently Asked Questions",
    subtitle: "Explore answers to common questions about Hommlie services in this quick guide.",
    faqs: [
      {
        question: "What pests does Hommlie handle?",
        answer: "Hommlie offers professional pest control solutions for a wide range of pests, including cockroaches, termites, bed bugs, rats, mosquitoes, birds, ants, and more. Our tailored treatments ensure effective pest elimination for both homes and businesses."
      },
      {
        question: "How can I book a pest control service?",
        answer: "Booking a pest control service with Hommlie is easy! Simply call us at 636-386-5658, or fill out the online booking form on our website. We offer prompt service and flexible scheduling to suit your needs."
      },
      {
        question: "Are your pest control treatments safe?",
        answer: "Yes, Hommlie uses eco-friendly and safe pest control treatments. We prioritize the safety of your family, pets, and the environment while ensuring effective pest elimination. Our methods comply with industry standards and regulations."
      },
      {
        question: "Does Hommlie operate in my city?",
        answer: "Hommlie provides pest control services across major cities in India. To check if we operate in your area, contact us at 636-386-5658, or visit our website to find the list of cities we serve."
      },
      {
        question: "How is the pricing for pest control services determined?",
        answer: "The pricing for pest control services at Hommlie depends on factors such as the type of pest, the size of your property, and the severity of the infestation. Contact us at 636-386-5658 for a free quote tailored to your needs."
      }
    ]
  });
});

module.exports = router;
