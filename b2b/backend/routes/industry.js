const express = require('express');
const router = express.Router();

const industryData = require('../data/industryData'); // we'll create this file next

router.get('/config', (req, res) => {
  res.json(industryData);
});

router.get('/config/:slug', (req, res) => {
  const slug = req.params.slug;
  const industry = industryData[slug];

  if (!industry) {
    return res.status(404).json({ error: 'Industry not found' });
  }

  res.json(industry);
});

module.exports = router;
