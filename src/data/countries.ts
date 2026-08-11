export interface Country {
  id: string;
  name: string;
  tagline: string;
  image: string;
  region: string;
  description: string;
  highlights: string[];
  costOfLiving: string;
  tuitionFees: string;
  topUniversities: string[];
}

export const countries: Country[] = [
  {
    id: "uk",
    name: "United Kingdom",
    tagline: "Home to the world's oldest and most prestigious universities",
    image: "/dest_uk.png",
    region: "Europe",
    description: "The UK offers a world-class education system with qualifications that can make a real difference to your career. It's home to some of the world's oldest and most prestigious universities.",
    highlights: ["Shorter duration courses (3-year Bachelor's, 1-year Master's)", "Post-study work rights (Graduate Route)", "Rich history and cultural diversity"],
    costOfLiving: "£9,000 - £12,000 per year",
    tuitionFees: "£14,000 - £30,000 per year",
    topUniversities: ["University of Oxford", "University of Cambridge", "Imperial College London", "UCL"]
  },
  {
    id: "canada",
    name: "Canada",
    tagline: "High-quality education in a safe, welcoming, and multicultural environment",
    image: "/dest_canada.png",
    region: "North America",
    description: "Consistently ranked as one of the best countries in the world to live in, Canada is known for its high-quality education, safe environment, and welcoming attitude towards international students.",
    highlights: ["Affordable tuition compared to US/UK", "Excellent immigration pathways (Express Entry)", "High standard of living"],
    costOfLiving: "CAD 10,000 - 15,000 per year",
    tuitionFees: "CAD 15,000 - 35,000 per year",
    topUniversities: ["University of Toronto", "McGill University", "University of British Columbia"]
  },
  {
    id: "usa",
    name: "United States",
    tagline: "The world's most popular destination for international students",
    image: "/dest_usa.png",
    region: "North America",
    description: "The US hosts more international students than any other country. It offers cutting-edge technology, research opportunities, and a flexible education system.",
    highlights: ["Flexible academic environment", "OPT (Optional Practical Training) opportunities", "Vast range of institutions"],
    costOfLiving: "$10,000 - $18,000 per year",
    tuitionFees: "$20,000 - $50,000+ per year",
    topUniversities: ["MIT", "Stanford", "Harvard", "Caltech"]
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    tagline: "Safe, peaceful, and renowned for research excellence",
    image: "/dest_nz.png",
    region: "Oceania",
    description: "New Zealand offers a progressive, responsive education system in a stunningly beautiful environment. All 8 universities are ranked in the global top 3%.",
    highlights: ["High quality of life and safety", "Post-study work rights", "Beautiful natural environment"],
    costOfLiving: "NZD 15,000 - 20,000 per year",
    tuitionFees: "NZD 25,000 - 40,000 per year",
    topUniversities: ["University of Auckland", "University of Otago", "Victoria University of Wellington"]
  },
  { id: "ireland", name: "Ireland", tagline: "The Silicon Valley of Europe", image: "/dest_ireland.png", region: "Europe", description: "A hub for tech giants and a welcoming English-speaking nation.", highlights: ["Tech hub of Europe", "Post-study work visa", "Friendly culture"], costOfLiving: "€10,000 - 12,000/yr", tuitionFees: "€12,000 - 25,000/yr", topUniversities: ["Trinity College Dublin", "UCD"] },
  { id: "uae", name: "United Arab Emirates", tagline: "A dynamic global hub for education and business", image: "/dest_uae.png", region: "Middle East", description: "Experience world-class infrastructure and branch campuses of top global universities.", highlights: ["Tax-free earnings", "Multicultural environment", "Branch campuses"], costOfLiving: "AED 30,000 - 50,000/yr", tuitionFees: "AED 40,000 - 80,000/yr", topUniversities: ["NYU Abu Dhabi", "University of Wollongong Dubai"] },
  { id: "malaysia", name: "Malaysia", tagline: "Affordable, high-quality education in Asia", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2940&auto=format&fit=crop", region: "Asia", description: "Cost-effective education with international branch campuses.", highlights: ["Low cost of living", "Twinning programs", "Cultural diversity"], costOfLiving: "RM 15,000 - 20,000/yr", tuitionFees: "RM 20,000 - 45,000/yr", topUniversities: ["Universiti Malaya", "Monash University Malaysia"] },
  { id: "singapore", name: "Singapore", tagline: "Asia's premier education and financial hub", image: "/dest_singapore.png", region: "Asia", description: "A safe, clean, and highly developed city-state with top-ranking universities.", highlights: ["Global financial hub", "Extremely safe", "Top Asian universities"], costOfLiving: "SGD 15,000 - 20,000/yr", tuitionFees: "SGD 20,000 - 40,000/yr", topUniversities: ["NUS", "NTU"] },
  { id: "germany", name: "Germany", tagline: "World-class engineering and almost free tuition", image: "/dest_germany.png", region: "Europe", description: "Renowned for engineering and low or zero tuition fees at public universities.", highlights: ["Free/low tuition", "Strong economy", "Schengen access"], costOfLiving: "€10,000 - 12,000/yr", tuitionFees: "€0 - 3,000/yr (Public)", topUniversities: ["TUM", "LMU Munich"] },
  { id: "france", name: "France", tagline: "Rich culture and excellent business schools", image: "/dest_france.png", region: "Europe", description: "Home to some of the world's best business schools and a vibrant cultural heritage.", highlights: ["Top business schools", "Subsidized living", "Rich history"], costOfLiving: "€10,000 - 15,000/yr", tuitionFees: "€2,770 - 3,770/yr (Public)", topUniversities: ["Sorbonne", "HEC Paris"] },
  { id: "sweden", name: "Sweden", tagline: "Innovation, sustainability, and high quality of life", image: "/dest_sweden.png", region: "Europe", description: "A leader in innovation and sustainability with a progressive society.", highlights: ["Innovation hub", "Everyone speaks English", "High living standards"], costOfLiving: "SEK 100,000 - 120,000/yr", tuitionFees: "SEK 80,000 - 140,000/yr", topUniversities: ["Karolinska Institute", "Lund University"] },
  { id: "finland", name: "Finland", tagline: "Consistently ranked as the world's happiest country with elite Nordic education", image: "/dest_finland.png", region: "Europe", description: "Finland offers a world-class Nordic education system in the happiest and safest country globally, with a strong focus on technology, gaming, and sustainable innovation.", highlights: ["Nordic quality of life", "1-year post-study job seeking visa", "Strong focus on technology & innovation"], costOfLiving: "€700 - €900/mo", tuitionFees: "€6,000 - €18,000/yr", topUniversities: ["University of Helsinki", "Aalto University", "University of Turku"] },
  { id: "netherlands", name: "Netherlands", tagline: "Pioneering problem-based learning in Europe", image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2940&auto=format&fit=crop", region: "Europe", description: "Offers a wide range of English-taught programs and an interactive teaching style.", highlights: ["English-taught courses", "Interactive learning", "Central European location"], costOfLiving: "€10,000 - 14,000/yr", tuitionFees: "€8,000 - 15,000/yr", topUniversities: ["University of Amsterdam", "Delft University of Technology"] },
  { id: "switzerland", name: "Switzerland", tagline: "Unparalleled precision, hospitality, and research", image: "/dest_switzerland.png", region: "Europe", description: "Famous for its hospitality schools and high-tech research institutes.", highlights: ["Top hospitality schools", "High salaries post-grad", "Safe and scenic"], costOfLiving: "CHF 20,000 - 25,000/yr", tuitionFees: "CHF 1,000 - 3,000/yr (Public)", topUniversities: ["ETH Zurich", "EPFL"] },
  { id: "italy", name: "Italy", tagline: "Art, architecture, and historic universities", image: "/dest_italy.png", region: "Europe", description: "Home to the oldest universities in Europe and a deep cultural heritage.", highlights: ["Historic institutions", "Affordable living", "Incredible culture/food"], costOfLiving: "€8,000 - 12,000/yr", tuitionFees: "€1,000 - 4,000/yr", topUniversities: ["Politecnico di Milano", "University of Bologna"] },
  { id: "malta", name: "Malta", tagline: "Mediterranean lifestyle with English instruction", image: "/dest_malta.png", region: "Europe", description: "An English-speaking island nation offering a sunny climate and growing educational sector.", highlights: ["English speaking", "Sunny climate", "Affordable Europe base"], costOfLiving: "€8,000 - 10,000/yr", tuitionFees: "€5,000 - 10,000/yr", topUniversities: ["University of Malta"] },
  { id: "japan", name: "Japan", tagline: "Where ancient tradition meets cutting-edge technology", image: "/dest_japan.png", region: "Asia", description: "A unique cultural experience combined with advanced technological research.", highlights: ["Technological leader", "Unique culture", "Extremely safe"], costOfLiving: "JPY 1,000,000 - 1,500,000/yr", tuitionFees: "JPY 500,000 - 1,000,000/yr", topUniversities: ["University of Tokyo", "Kyoto University"] },
  { id: "south-korea", name: "South Korea", tagline: "Fast-paced innovation and dynamic student life", image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=2940&auto=format&fit=crop", region: "Asia", description: "A leader in technology and entertainment with highly competitive universities.", highlights: ["High-tech society", "Vibrant culture", "Strong economy"], costOfLiving: "KRW 10,000,000 - 15,000,000/yr", tuitionFees: "KRW 4,000,000 - 10,000,000/yr", topUniversities: ["Seoul National University", "KAIST"] },
  { id: "belarus", name: "Belarus", tagline: "Specialized in affordable Medical (MBBS) degrees", image: "/dest_belarus.png", region: "Europe", description: "A popular destination for medical students seeking WHO and AMC recognized degrees at affordable prices.", highlights: ["Affordable MBBS", "AMC recognized", "English-medium medicine"], costOfLiving: "$3,000 - $5,000/yr", tuitionFees: "$4,000 - $6,000/yr", topUniversities: ["Belarusian State Medical University"] },
  { id: "georgia", name: "Georgia", tagline: "The premier destination for Medical Studies in Europe", image: "/dest_georgia.png", region: "Europe", description: "Rapidly becoming the top choice for international students to pursue their medical degrees.", highlights: ["No entrance exams for MBBS", "European lifestyle", "WHO recognized"], costOfLiving: "$3,000 - $5,000/yr", tuitionFees: "$4,000 - $8,000/yr", topUniversities: ["Tbilisi State Medical University"] },
  { id: "russia", name: "Russia", tagline: "World-class education in engineering and medicine", image: "/dest_russia.png", region: "Europe/Asia", description: "Renowned for its strong foundations in science, engineering, and medicine.", highlights: ["Affordable tuition", "Strong STEM programs", "Rich cultural history"], costOfLiving: "$3,000 - $5,000/yr", tuitionFees: "$3,000 - $7,000/yr", topUniversities: ["Lomonosov Moscow State University"] },
  { id: "china", name: "China", tagline: "The fastest growing education hub in Asia", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2940&auto=format&fit=crop", region: "Asia", description: "Offers massive investment in research, diverse programs, and a rapidly growing economy.", highlights: ["Economic powerhouse", "Affordable medicine/engineering", "Learn Mandarin"], costOfLiving: "RMB 20,000 - 40,000/yr", tuitionFees: "RMB 20,000 - 50,000/yr", topUniversities: ["Tsinghua University", "Peking University"] }
];
