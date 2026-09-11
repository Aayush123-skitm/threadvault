/**
 * ThreadVault - Archival Graphic Tees Product Catalog
 * 14 Sample Streetwear Products with multi-angle photography, GSM specs, color swatches & sizing.
 */

export const PRODUCTS = [
  {
    id: "tv-01",
    title: "NEO-TOKYO DRIFT",
    category: "Cyberpunk",
    price: 48,
    originalPrice: 62,
    badge: "HOT DROP",
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    isNew: true,
    gsm: "280 GSM Heavyweight French Terry Cotton",
    fit: "Oversized Boxy Silhouette",
    description: "Multi-layered screen print showcasing Neo-Tokyo hyper-speed aesthetic. Crafted from our signature 280 GSM combed cotton with reinforced double-needle ribbed collar and dropped shoulders.",
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Night Navy", hex: "#151D28" },
      { name: "Cyber Crimson", hex: "#4A121A" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-02",
    title: "CYBERPUNK SAMURAI 2099",
    category: "Cyberpunk",
    price: 52,
    originalPrice: 68,
    badge: "BESTSELLER",
    rating: 5.0,
    reviewsCount: 189,
    isFeatured: true,
    isNew: false,
    gsm: "300 GSM Ultra-Dense Cotton",
    fit: "Relaxed Boxy Drop-Shoulder",
    description: "Futuristic mecha-samurai illustration printed with high-viscosity discharge ink for an ultra-soft hand feel that will never crack or peel over time.",
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Bone White", hex: "#E8E6E1" }
    ],
    sizes: ["M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-03",
    title: "ACID GOTHIC ARCHIVES",
    category: "Gothic & Grunge",
    price: 46,
    originalPrice: 58,
    badge: "VINTAGE WASH",
    rating: 4.8,
    reviewsCount: 96,
    isFeatured: true,
    isNew: true,
    gsm: "270 GSM Vintage Enzyme Washed Cotton",
    fit: "Distressed Vintage Boxy",
    description: "Intricate medieval blackletter typography and distressed cross illustration. Individually acid-washed for a one-of-one faded patina on every single piece.",
    colors: [
      { name: "Mineral Charcoal", hex: "#222225" },
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Faded Mocha", hex: "#42362E" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1622445268121-8f1d7087f340?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-04",
    title: "BROKEN CHERUB OVERSIZED",
    category: "Gothic & Grunge",
    price: 44,
    originalPrice: 55,
    badge: "LIMITED RUN",
    rating: 4.7,
    reviewsCount: 84,
    isFeatured: false,
    isNew: true,
    gsm: "280 GSM Heavyweight Cotton",
    fit: "Wide-Cut Dropped Shoulder",
    description: "Subversive renaissance cherub motif with thorn wreath and barbed-wire accents. Screen-printed in muted silver and blood red on 100% combed cotton.",
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Washed Sand", hex: "#B8AC98" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-05",
    title: "GHOST IN THE CORE // MECHA",
    category: "Anime & Manga",
    price: 50,
    originalPrice: 65,
    badge: "RESTOCKED",
    rating: 4.9,
    reviewsCount: 215,
    isFeatured: true,
    isNew: false,
    gsm: "290 GSM Combed Ring-Spun Cotton",
    fit: "Structured Streetwear Cut",
    description: "Retro-futuristic anime biomechanical android core graphic. Vibrant halftone screen printing paired with bold Japanese kanji typography.",
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Cyber Magenta", hex: "#4A182F" },
      { name: "Deep Cobalt", hex: "#14283F" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-06",
    title: "SHINIGAMI ECLIPSE HEAVYWEIGHT",
    category: "Anime & Manga",
    price: 48,
    originalPrice: 60,
    badge: "SELLING FAST",
    rating: 4.9,
    reviewsCount: 167,
    isFeatured: false,
    isNew: true,
    gsm: "280 GSM Luxury Weight",
    fit: "Oversized Boxy Silhouette",
    description: "Dark fantasy shinigami death god illustration rising through a blood-red crescent eclipse. Dense multi-pass silkscreen on pre-shrunk cotton.",
    colors: [
      { name: "Pitch Black", hex: "#0A0A0A" },
      { name: "Ash Off-White", hex: "#DDDCD8" }
    ],
    sizes: ["M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-07",
    title: "CHAOS THEORY TYPOGRAPHY",
    category: "Minimalist Typography",
    price: 42,
    originalPrice: 50,
    badge: "ESSENTIAL",
    rating: 4.6,
    reviewsCount: 78,
    isFeatured: false,
    isNew: false,
    gsm: "260 GSM Premium Combed Cotton",
    fit: "Relaxed Everyday Fit",
    description: "Deconstructed Swiss modernist typography celebrating controlled structural chaos. Subtle chest coordinates with bold architectural back manifesto print.",
    colors: [
      { name: "Obsidian Black", hex: "#0A0A0A" },
      { name: "Raw Cream", hex: "#EDEBE6" },
      { name: "Tactical Olive", hex: "#2F382A" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-08",
    title: "SYSTEM REBOOT // ARCHIVE 04",
    category: "Minimalist Typography",
    price: 45,
    originalPrice: 55,
    badge: "MINIMAL",
    rating: 4.7,
    reviewsCount: 62,
    isFeatured: false,
    isNew: true,
    gsm: "280 GSM Structured Cotton",
    fit: "Boxy Heavyweight Cut",
    description: "Terminal command syntax and glitch error codes rendered in high-density rubberized ink. Precision laser-aligned front chest graphic.",
    colors: [
      { name: "Pitch Black", hex: "#0A0A0A" },
      { name: "Washed Slate", hex: "#2C2F36" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-09",
    title: "VOLCANIC ACID MELTDOWN",
    category: "Vintage Acid Wash",
    price: 54,
    originalPrice: 70,
    badge: "EXCLUSIVE",
    rating: 5.0,
    reviewsCount: 112,
    isFeatured: true,
    isNew: true,
    gsm: "310 GSM Custom Pigment Dye",
    fit: "Oversized Drop-Shoulder",
    description: "Molten magma abstract skull illustration on heavy mineral-washed fabric. Hand-dipped in reactive dye baths to achieve an authentic 1990s tour merch aesthetic.",
    colors: [
      { name: "Acid Rust", hex: "#3A271E" },
      { name: "Acid Charcoal", hex: "#1E2328" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1622445268121-8f1d7087f340?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-10",
    title: "DESERT REBEL DISTRESSED",
    category: "Vintage Acid Wash",
    price: 49,
    originalPrice: 62,
    badge: "NEW DROP",
    rating: 4.8,
    reviewsCount: 73,
    isFeatured: false,
    isNew: true,
    gsm: "275 GSM Soft Handfeel Acid Wash",
    fit: "Vintage Boxy Fit",
    description: "Post-apocalyptic wasteland iconography rendered in cracked off-white discharge ink. Subtle grinding on the collar and hem for broken-in vintage character.",
    colors: [
      { name: "Faded Ochre", hex: "#473A2B" },
      { name: "Washed Charcoal", hex: "#1A1A1A" }
    ],
    sizes: ["M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622445268121-8f1d7087f340?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-11",
    title: "VOID RUNNER ORANGE ED.",
    category: "Cyberpunk",
    price: 50,
    originalPrice: 64,
    badge: "VAULT SPECIAL",
    rating: 4.9,
    reviewsCount: 153,
    isFeatured: false,
    isNew: true,
    gsm: "280 GSM Heavy Combed Cotton",
    fit: "Oversized Streetwear Cut",
    description: "Featuring ThreadVault's signature neon blaze orange accents over pitch black heavyweight canvas. Features high-visibility geometric tech-wear line art.",
    colors: [
      { name: "Void Black", hex: "#0A0A0A" },
      { name: "Vault Orange", hex: "#FF4D00" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1503342452485-86b7f54527ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-12",
    title: "IMMORTAL SOULS BACK-PRINT",
    category: "Gothic & Grunge",
    price: 52,
    originalPrice: 65,
    badge: "BACK-PRINT",
    rating: 4.9,
    reviewsCount: 138,
    isFeatured: false,
    isNew: false,
    gsm: "300 GSM Heavyweight Boxy",
    fit: "Drop-Shoulder Boxy Silhouette",
    description: "Giant edge-to-edge back artwork depicting gothic stone gargoyles and cathedral arches. Discreet branded chest logo badge on the front pocket area.",
    colors: [
      { name: "Jet Black", hex: "#0A0A0A" },
      { name: "Dark Amethyst", hex: "#2E2436" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-13",
    title: "AKIRA PROTOCOL OVERSIZED",
    category: "Anime & Manga",
    price: 54,
    originalPrice: 72,
    badge: "HOT DROP",
    rating: 5.0,
    reviewsCount: 220,
    isFeatured: true,
    isNew: true,
    gsm: "290 GSM Pre-Shrunk Jersey",
    fit: "Exaggerated Boxy Fit",
    description: "Iconic cinematic capsule motorcycle homage with explosive cyberpunk typography. Silk-screen printed with UV-reactive specialty inks.",
    colors: [
      { name: "Carbon Black", hex: "#0A0A0A" },
      { name: "Milk White", hex: "#F3F1EC" }
    ],
    sizes: ["M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tv-14",
    title: "NEGATIVE SPACE EXPERIMENT",
    category: "Minimalist Typography",
    price: 44,
    originalPrice: 52,
    badge: "STAFF PICK",
    rating: 4.7,
    reviewsCount: 88,
    isFeatured: false,
    isNew: false,
    gsm: "260 GSM Fine Combed Jersey",
    fit: "Regular Relaxed Cut",
    description: "Optical illusion typography utilizing stark inverted negative space blocks. Clean, versatile streetwear statement piece for daily rotation.",
    colors: [
      { name: "Matte Black", hex: "#0A0A0A" },
      { name: "Off-Stone", hex: "#D6D3CC" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ]
  }
];
