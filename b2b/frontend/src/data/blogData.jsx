// src/data/blogData.js
import TermiteImg from '../assets/seasontermites.png';

export const blogPosts = [
  {
    id: 1,
    slug: 'cockroach-control-eliminate-disease-spreading-pests',
    name: 'Cockroach Control – Eliminate Disease-Spreading Pests',
    image: TermiteImg,
    category: 'pest control',
    description: 'Cockroaches spread diseases and trigger allergies. Our extermination methods eliminate infestations effectively.',
    fullContent: `
      <h2>Complete Cockroach Control Solutions</h2>
      <p>Cockroaches are among the most resilient pests... </p>
      <h3>Our Process</h3>
      <ul><li>Inspection</li><li>Gel treatment</li></ul>
    `,
    phone: '636-386-5658',
    date: '2025-05-15',
    author: 'Rahul Badugu'
  },
  {
    id: 2,
    slug: 'termite-control-protect-property',
    name: 'Termite Control – Protect Your Property from Structural Damage',
    image: TermiteImg,
    category: 'pest control',
    description: 'Silent destroyers that can cause structural damage. We offer termite inspection and treatment.',
    fullContent: `
      <h2>Professional Termite Management</h2>
      <p>Termites cause ₹5 billion in damages annually...</p>
    `,
    phone: '636-386-5658',
    date: '2025-05-10',
    author: 'Rahul Badugu'
  }
];
