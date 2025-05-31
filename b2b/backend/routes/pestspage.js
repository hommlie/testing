// backend/routes/pestpage.js
const express = require('express');
const router = express.Router();

const pestPageData = {
  cockroaches: {
    maintitle: "Cockroach Control Services",
    subtitle: "Professional Pest Elimination Solutions",
    description: "Effective cockroach extermination to rid your home of these resilient pests.",
    detailedDescription: `Cockroach infestations in homes and businesses can lead to significant health concerns, as they are known to spread diseases such as salmonellosis and typhoid. Their droppings may trigger asthma and eczema, and the unpleasant odor they produce can contaminate food and surfaces. Cockroaches thrive in urban environments and are persistent pests that require targeted, expert intervention.`,
    backgroundImage: "/images/cockroachbg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Cockroach FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  },
   termites: {
    maintitle: "Termite Control Services",
    subtitle: "Professional Termite Elimination",
    description: "Comprehensive termite treatment to protect your property from structural damage.",
    detailedDescription: `Termites are silent destroyers that can cause extensive damage to wooden structures, furniture, and even books. They work 24/7 eating away at the cellulose in wood, often going undetected until significant damage has occurred. Our professional termite control services include thorough inspection, treatment, and prevention methods to safeguard your property from these destructive pests.`,
    backgroundImage: "/images/Termitesbg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Termites FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  },
  rats: {
    maintitle: "Rat Control Services",
    subtitle: "Professional Rodent Elimination",
    description: "Effective rat control solutions to keep your premises rodent-free.",
    detailedDescription: `Rats and mice can cause significant property damage by gnawing on wires, wood, and insulation. They also pose serious health risks as carriers of diseases like leptospirosis and hantavirus. Our rodent control program includes inspection, trapping, exclusion, and sanitation to eliminate existing infestations and prevent future problems.`,
    backgroundImage: "/images/micebg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Rats FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  },
  snakes: {
    maintitle: "Snake Control Services",
    subtitle: "Professional Snake Removal",
    description: "Safe and humane snake removal services for your home or business.",
    detailedDescription: `Snakes often enter properties in search of food or shelter. While most species are harmless, some can be venomous and dangerous. Our trained professionals can safely identify, capture, and relocate snakes from your property while providing advice on snake-proofing your premises to prevent future encounters.`,
    backgroundImage: "/images/rodentbg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Snakes FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  },
  mosquitoes: {
    maintitle: "Mosquito Control Services",
    subtitle: "Professional Mosquito Elimination",
    description: "Comprehensive mosquito control to protect your family from diseases.",
    detailedDescription: `Mosquitoes are not just annoying pests - they can transmit dangerous diseases like malaria, dengue, and chikungunya. Our mosquito control services include inspection, treatment of breeding sites, fogging, and recommendations for long-term prevention to reduce mosquito populations around your property.`,
    backgroundImage: "/images/mosquitobg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Mosquitoes FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  },
  flies: {
    maintitle: "Fly Control Services",
    subtitle: "Professional Fly Elimination",
    description: "Comprehensive fly control solutions for a hygienic environment.",
    detailedDescription: `Flies are more than just a nuisance - they can spread numerous diseases by contaminating food and surfaces. Our fly control services target all stages of the fly life cycle, from breeding sites to adult flies, using a combination of sanitation, exclusion, and treatment methods for effective, long-lasting results.`,
    backgroundImage: "/images/fliesbg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Flies FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  },
  'bed-bugs': {
    maintitle: "Bed Bug Control Services",
    subtitle: "Professional Bed Bug Elimination",
    description: "Thorough bed bug treatment to restore your peace of mind.",
    detailedDescription: `Bed bugs are notoriously difficult to eliminate without professional help. They hide in mattresses, furniture, and cracks during the day, emerging at night to feed. Our bed bug treatment combines heat treatment, chemical applications, and thorough inspection to completely eradicate infestations and prevent recurrence.`,
    backgroundImage: "/images/bedbugbg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Bedbugs FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  },
  spiders: {
    maintitle: "Spider Control Services",
    subtitle: "Professional Spider Elimination",
    description: "Safe and effective spider control for your home or business.",
    detailedDescription: `While most spiders are harmless, some species can deliver painful or even dangerous bites. Spiders often indicate the presence of other pests they feed on. Our spider control services focus on eliminating both spiders and their food sources while sealing entry points to prevent future infestations.`,
    backgroundImage: "/images/spiderbg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Spiders FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  },
  ants: {
    maintitle: "Ant Control Services",
    subtitle: "Professional Ant Elimination",
    description: "Comprehensive ant control solutions for all types of ant infestations.",
    detailedDescription: `Ants can be persistent invaders, entering homes in search of food and water. Some species like carpenter ants can cause structural damage. Our ant control program targets the entire colony, not just the visible ants, using baiting systems and exclusion techniques for long-term results.`,
    backgroundImage: "/images/antsbg1.png",
    quickLinks: [
      { text: "Signs of Infestation", icon: "🔍" },
      { text: "Control Methods", icon: "🛡️" },
      { text: "GSS 6D Treatment", icon: "✨" },
      { text: "Prevention Tips", icon: "⚠️" },
      { text: "Ants FAQ", icon: "❓" },
      { text: "Common Species", icon: "🐜" },
      { text: "Health Risks", icon: "🏥" },
      { text: "DIY Solutions", icon: "🏠" },
      { text: "Professional Help", icon: "👨‍🔬" }
    ],
    contactInfo: {
      phone: "63638 65658",
      whatsapp: "WhatsApp",
      email: "for inquiries"
    }
  }
};

const quickLinkContent = {
  'Signs of Infestation': {
    title: 'Signs of Infestation',
    content: {
      cockroaches: [
        "Live or dead cockroaches",
        "Droppings that look like black pepper",
        "Egg cases (oothecae) in hidden areas",
        "Musty odor in infested areas"
      ],
       termites: [
        "Mud tubes on exterior walls or foundations",
        "Hollow-sounding wood when tapped",
        "Discarded wings near windows or doors",
        "Visible damage to wood structures",
        "Tight-fitting doors or hard-to-open windows",
        "Frass (termite droppings) that resembles sawdust"
      ],
      rats: [
        "Droppings near food sources or nesting areas",
        "Gnaw marks on food packaging or structures",
        "Scratching noises in walls or ceilings",
        "Greasy rub marks along walls",
        "Nests made from shredded materials",
        "Burrows in outdoor areas"
      ],
      snakes: [
        "Shed snake skins in and around your property",
        "Unusual movement in grass or bushes",
        "Disappearance of small pets or rodents",
        "Holes or gaps in foundations where snakes could enter",
        "Tracks or trails in dusty areas"
      ],
      mosquitoes: [
        "Buzzing sounds, especially at dawn and dusk",
        "Bites on skin, often itchy and red",
        "Standing water where they can breed",
        "Increased mosquito activity after rains",
        "Larvae visible in standing water"
      ],
      mice: [
        "Small droppings in cupboards or along baseboards",
        "Gnaw marks on food packaging or structures",
        "Nests made from shredded paper or fabric",
        "Scratching noises in walls, especially at night",
        "A musky odor in enclosed spaces"
      ],
      flies: [
        "Frequent sightings of adult flies",
        "Maggots in garbage or decaying matter",
        "Small dark clusters of spots (fly feces)",
        "Buzzing sounds near windows or lights",
        "Increased activity near food sources"
      ],
      'bed-bugs': [
        "Small reddish-brown bugs in mattress seams",
        "Tiny blood spots on sheets or mattresses",
        "Itchy, red bites often in a line or cluster",
        "Sweet musty odor in severe infestations",
        "Cast skins or eggshells in hiding places"
      ],
      spiders: [
        "Visible webs in corners or between objects",
        "Sightings of spiders, especially at night",
        "Egg sacs in hidden areas",
        "Increased other insects that spiders feed on",
        "Bites (though most spiders are harmless)"
      ],
      ants: [
        "Trails of ants leading to food sources",
        "Small piles of dirt or sand indicating nest sites",
        "Winged ants emerging in spring or summer",
        "Rustling noises in walls (carpenter ants)",
        "Visible damage to wood structures"
      ]
    }
  },
  'Control Methods': {
    title: 'Control Methods',
    content: {
      cockroaches: [
        "Inspection to identify sources",
        "Residual insecticides",
        "Bait stations and gel bait",
        "Sanitation advice"
      ],
      termites: [
        "Soil treatment with termiticides",
        "Termite baiting systems around the property",
        "Wood treatment with borate products",
        "Physical barriers during construction",
        "Fumigation for severe infestations",
        "Regular monitoring and maintenance"
      ],
      rats: [
        "Snap traps and glue boards in high-activity areas",
        "Rodenticide bait stations in secure locations",
        "Exclusion techniques to seal entry points",
        "Sanitation to remove food sources",
        "Ultrasonic repellents in some cases",
        "Follow-up inspections to ensure complete elimination"
      ],
      snakes: [
        "Removal of potential food sources (rodents, insects)",
        "Sealing entry points around foundations",
        "Habitat modification to reduce hiding spots",
        "Professional trapping and relocation",
        "Installation of snake-proof fencing",
        "Use of natural repellents in some cases"
      ],
      mosquitoes: [
        "Elimination of standing water breeding sites",
        "Larvicide treatments for water that can't be drained",
        "Adulticide fogging for immediate relief",
        "Installation of mosquito nets and screens",
        "Use of repellents and protective clothing",
        "Biological controls like mosquito fish"
      ],
      mice: [
        "Snap traps placed perpendicular to walls",
        "Sealing entry points larger than 1/4 inch",
        "Proper food storage in sealed containers",
        "Removal of clutter that provides nesting sites",
        "Ultrasonic devices as supplemental control",
        "Regular monitoring for early detection"
      ],
      flies: [
        "Sanitation to remove breeding materials",
        "Installation of fly screens on windows",
        "Use of UV light traps in commercial settings",
        "Application of residual insecticides",
        "Proper garbage management with tight lids",
        "Fly baits and traps in problem areas"
      ],
      'bed-bugs': [
        "Heat treatments to kill all life stages",
        "Steam treatment for furniture and mattresses",
        "Residual insecticide applications",
        "Mattress encasements to trap remaining bugs",
        "Vacuuming to remove visible bed bugs",
        "Follow-up inspections to ensure elimination"
      ],
      spiders: [
        "Reduction of other insects that spiders feed on",
        "Sealing cracks and entry points",
        "Regular cleaning to remove webs",
        "Targeted insecticide applications",
        "Outdoor perimeter treatments",
        "Use of sticky traps in problem areas"
      ],
      ants: [
        "Baiting systems to eliminate entire colonies",
        "Locating and treating nest sites directly",
        "Barrier treatments around foundations",
        "Sealing entry points into structures",
        "Removing food sources and attractants",
        "Regular maintenance to prevent reinfestation"
      ]
    }
  },
  'Prevention Tips': {
    title: 'Prevention Tips',
    content: {
      cockroaches: [
        "Keep kitchen clean",
        "Seal cracks",
        "Fix leaky pipes",
        "Inspect items before bringing inside"
      ],
      termites: [
        "Keep wood and mulch away from foundations",
        "Ensure proper drainage around your home",
        "Regularly inspect for signs of termites",
        "Maintain a gap between soil and wood structures",
        "Treat wood with preservatives before use",
        "Schedule annual professional inspections"
      ],
      rats: [
        "Seal all openings larger than 1/4 inch",
        "Keep garbage in containers with tight-fitting lids",
        "Trim tree branches away from roofs",
        "Store pet food in sealed containers",
        "Remove clutter that provides nesting sites",
        "Maintain clean outdoor areas free of debris"
      ],
      snakes: [
        "Keep grass and vegetation trimmed short",
        "Remove piles of rocks, wood, and debris",
        "Seal gaps under doors and in foundations",
        "Control rodent populations that attract snakes",
        "Install snake-proof fencing if needed",
        "Use caution when moving items stored outside"
      ],
      mosquitoes: [
        "Eliminate standing water weekly",
        "Clean gutters to prevent water accumulation",
        "Change water in bird baths and pet bowls regularly",
        "Use mosquito dunks in ponds or water features",
        "Install or repair window and door screens",
        "Wear protective clothing during peak activity times"
      ],
      mice: [
        "Seal all potential entry points",
        "Store food in metal or glass containers",
        "Keep storage areas clean and organized",
        "Dispose of garbage regularly",
        "Inspect incoming packages and furniture",
        "Maintain clean outdoor spaces"
      ],
      flies: [
        "Keep garbage in sealed containers",
        "Clean up pet waste immediately",
        "Use tight-fitting lids on compost bins",
        "Clean drains regularly to remove organic buildup",
        "Install screens on windows and doors",
        "Clean up food spills immediately"
      ],
      'bed-bugs': [
        "Inspect hotel rooms when traveling",
        "Wash and dry clothes on high heat after trips",
        "Use protective covers on mattresses",
        "Reduce clutter that provides hiding spots",
        "Be cautious with secondhand furniture",
        "Regularly vacuum and inspect sleeping areas"
      ],
      spiders: [
        "Reduce outdoor lighting that attracts insects",
        "Keep vegetation trimmed away from structures",
        "Seal cracks and gaps in exterior walls",
        "Remove clutter in storage areas",
        "Regularly clean corners and hidden spaces",
        "Use yellow outdoor lights that attract fewer insects"
      ],
      ants: [
        "Wipe up spills and crumbs immediately",
        "Store sweet foods in sealed containers",
        "Fix leaky pipes and reduce moisture",
        "Seal entry points around windows and doors",
        "Keep countertops clean and dry",
        "Use vinegar to erase ant trails"
      ]
    }
  },
  'Health Risks': {
    title: 'Health Risks',
    content: {
      cockroaches: [
        "Trigger asthma and allergies",
        "Spread bacteria like Salmonella",
        "Contaminate food",
        "May carry parasitic worms"
      ],
      termites: [
        "Generally don't pose direct health risks to humans",
        "Can cause allergic reactions in sensitive individuals",
        "Mold growth in termite-damaged wood may affect health",
        "Psychological stress from property damage",
        "Potential for structural collapse in severe cases",
        "Secondary pests attracted to termite damage"
      ],
      rats: [
        "Spread diseases like leptospirosis and hantavirus",
        "Contaminate food with urine and feces",
        "Carry fleas that can transmit plague",
        "Cause rat-bite fever through bites",
        "Trigger asthma and allergies",
        "Damage property creating safety hazards"
      ],
      snakes: [
        "Venomous bites can be life-threatening",
        "Non-venomous bites can still cause infection",
        "Psychological trauma from encounters",
        "Allergic reactions to some snake venoms",
        "Secondary infections from bites",
        "Stress and anxiety about potential encounters"
      ],
      mosquitoes: [
        "Transmit diseases like dengue and malaria",
        "Spread West Nile virus and Zika virus",
        "Cause allergic reactions to bites",
        "Secondary infections from scratching bites",
        "Sleep disturbance from buzzing and biting",
        "Psychological distress in heavily infested areas"
      ],
      mice: [
        "Spread salmonellosis through contamination",
        "Trigger asthma and allergies",
        "Carry ticks that may transmit Lyme disease",
        "Contaminate food with droppings and urine",
        "Cause hantavirus pulmonary syndrome",
        "Damage electrical wiring creating fire hazards"
      ],
      flies: [
        "Spread diseases like dysentery and typhoid",
        "Contaminate food with bacteria from waste",
        "Cause food poisoning through contamination",
        "Spread eye infections like trachoma",
        "Myiasis (larval infestation of living tissue)",
        "Psychological distress from large infestations"
      ],
      'bed-bugs': [
        "Itchy bites that can lead to secondary infections",
        "Allergic reactions to bites in some individuals",
        "Anxiety and sleep disturbance",
        "Psychological distress from infestations",
        "Social stigma associated with bed bugs",
        "Anemia in severe cases with many bugs"
      ],
      spiders: [
        "Venomous bites from dangerous species",
        "Secondary infections from bites",
        "Allergic reactions to some venoms",
        "Necrotic wounds from certain species",
        "Psychological fear and anxiety",
        "Rare systemic reactions to bites"
      ],
      ants: [
        "Painful stings from some species",
        "Allergic reactions to ant venom",
        "Contamination of food sources",
        "Secondary infections from stings",
        "Damage to electrical equipment",
        "Psychological distress from large infestations"
      ]
    }
  }
};

router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const pest = pestPageData[slug];

  if (!pest) {
    return res.status(404).json({ error: 'Pest not found' });
  }

  const quickLinks = {};
  Object.entries(quickLinkContent).forEach(([category, data]) => {
    if (data.content[slug]) {
      quickLinks[category] = {
        title: data.title,
        content: data.content[slug]
      };
    }
  });

  res.json({
    pest,
    quickLinks
  });
});

module.exports = router;
