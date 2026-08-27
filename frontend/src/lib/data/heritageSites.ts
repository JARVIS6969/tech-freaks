import { HeritageSite } from "@/types/heritage";

/**
 * Demo dataset for HeritageLens.
 *
 * This file exists so the whole app is fully click-through-able with zero
 * backend configuration (ideal for a hackathon demo). In production, swap
 * these reads for calls to `src/lib/supabase/queries.ts`, which hit the
 * `heritage_sites` table defined in `supabase/schema.sql`. The shape is
 * identical, so no component code needs to change — see docs/DATABASE_SCHEMA.md.
 */
export const heritageSites: HeritageSite[] = [
  {
    id: "1",
    name: "Modhera Sun Temple",
    slug: "modhera-sun-temple",
    short_description:
      "An 11th-century Sun temple famed for its stepwell and solar-aligned sanctum.",
    description:
      "Built by King Bhima I of the Chaulukya dynasty, the Modhera Sun Temple is designed so the first rays of the equinox sun strike the sanctum's idol directly. The complex spans three parts — the shrine, the assembly hall (Sabha Mandapa), and the sacred Surya Kund stepwell — each carved with intricate depictions of deities, dancers, and the 12 zodiac signs.",
    state: "Gujarat",
    city: "Modhera",
    latitude: 23.5834,
    longitude: 72.1275,
    historical_period: "Medieval",
    construction_date: "1026–1027 CE",
    heritage_type: "Temple",
    cultural_significance:
      "Regarded as one of the finest examples of Solanki-era architecture, the temple reflects the Chaulukya dynasty's devotion to Surya, the sun god, and their mastery of stone craftsmanship.",
    architectural_details:
      "Constructed from sandstone with no mortar, using interlocking stone joinery. The Surya Kund is a stepped tank with 108 miniature shrines lining its terraces.",
    historical_facts: [
      "The temple was never used for worship after invasions in the 13th century damaged the main idol.",
      "The stepwell (Kund) is one of the oldest surviving of its kind in India.",
      "Every pillar in the Sabha Mandapa is carved with a unique motif — no two are identical.",
    ],
    main_image:
      "/images/placeholder-heritage.jpg",
    gallery_images: [
      "/images/placeholder-heritage.jpg",
      "/images/placeholder-heritage.jpg",
    ],
    model_3d_url: null,
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: null,
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Konark Sun Temple",
    slug: "konark-sun-temple",
    short_description:
      "A 13th-century chariot-shaped temple dedicated to the sun god Surya.",
    description:
      "Conceived as a colossal stone chariot with 24 carved wheels drawn by seven horses, the Konark Sun Temple is one of India's most celebrated UNESCO World Heritage Sites. Its walls are covered in intricate friezes depicting daily life, mythology, and courtly scenes of the Eastern Ganga dynasty.",
    state: "Odisha",
    city: "Konark",
    latitude: 19.8876,
    longitude: 86.0945,
    historical_period: "Medieval",
    construction_date: "1250 CE",
    heritage_type: "Temple",
    cultural_significance:
      "Commissioned by King Narasimhadeva I, the temple is a masterpiece of Kalinga architecture and a symbol of Odisha's cultural identity.",
    architectural_details:
      "The temple's wheels function as sundials, accurately telling time from the shadows cast. Built from Khondalite rock, transported over 100 km to the site.",
    historical_facts: [
      "The temple is also known as the 'Black Pagoda' by European sailors due to its dark color and use as a navigation landmark.",
      "The main sanctum tower collapsed centuries ago; only the assembly hall (Jagamohana) survives intact.",
      "Each of the 24 wheels is 3 meters in diameter and precisely tells the time of day.",
    ],
    main_image:
      "/images/placeholder-heritage.jpg",
    gallery_images: [
      "/images/placeholder-heritage.jpg",
    ],
    model_3d_url: null,
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: null,
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Hampi",
    slug: "hampi",
    short_description:
      "The sprawling ruins of the Vijayanagara Empire's capital city.",
    description:
      "Once the second-largest medieval city in the world, Hampi's boulder-strewn landscape is dotted with temples, royal enclosures, market streets, and the iconic stone chariot at Vittala Temple. It served as the capital of the Vijayanagara Empire from 1336 to 1565 CE.",
    state: "Karnataka",
    city: "Hampi",
    latitude: 15.335,
    longitude: 76.46,
    historical_period: "Medieval",
    construction_date: "14th–16th century CE",
    heritage_type: "Temple",
    cultural_significance:
      "Hampi represents the pinnacle of Vijayanagara art, engineering, and urban planning, and remains a living pilgrimage site around the Virupaksha Temple.",
    architectural_details:
      "Dravidian-style temple complexes combined with Indo-Islamic influences, granite monolithic sculptures, and an advanced aqueduct-based irrigation system.",
    historical_facts: [
      "The stone chariot at Vittala Temple has wheels that can still rotate.",
      "Hampi's musical pillars produce different musical notes when tapped.",
      "The empire fell after the 1565 Battle of Talikota, and the city was sacked and abandoned.",
    ],
    main_image:
      "/images/placeholder-heritage.jpg",
    gallery_images: [
      "/images/placeholder-heritage.jpg",
    ],
    model_3d_url: null,
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: null,
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Ajanta & Ellora Caves",
    slug: "ajanta-ellora-caves",
    short_description:
      "Rock-cut cave monasteries and temples spanning Buddhist, Hindu, and Jain traditions.",
    description:
      "Carved directly into basalt cliffs, the Ajanta caves house exquisite Buddhist murals and sculptures dating back to the 2nd century BCE, while the nearby Ellora caves showcase an unmatched sequence of Buddhist, Hindu, and Jain rock-cut temples — including the monolithic Kailasa Temple, carved top-down from a single rock.",
    state: "Maharashtra",
    city: "Aurangabad",
    latitude: 20.5519,
    longitude: 75.7033,
    historical_period: "Ancient",
    construction_date: "2nd century BCE – 10th century CE",
    heritage_type: "Cave",
    cultural_significance:
      "The caves document the evolution of Indian rock-cut architecture and religious art across three major faiths over more than a millennium.",
    architectural_details:
      "Ellora's Kailasa Temple was excavated from a single rock face — over 200,000 tonnes of rock were removed without any additive construction.",
    historical_facts: [
      "Ajanta's caves were rediscovered by a British officer in 1819 while tiger hunting.",
      "The Kailasa Temple at Ellora is twice the size of the Parthenon.",
      "Ajanta's murals are among the earliest surviving examples of Indian painting.",
    ],
    main_image:
      "/images/placeholder-heritage.jpg",
    gallery_images: [
      "/images/placeholder-heritage.jpg",
    ],
    model_3d_url: null,
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: null,
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Khajuraho Group of Monuments",
    slug: "khajuraho",
    short_description:
      "Chandela-era temples renowned for their intricate sculptural artistry.",
    description:
      "Built by the Chandela dynasty, the Khajuraho temples are famous for their nagara-style spires and elaborate sculptures depicting daily life, deities, and philosophical concepts of dharma, artha, kama, and moksha.",
    state: "Madhya Pradesh",
    city: "Khajuraho",
    latitude: 24.8318,
    longitude: 79.9199,
    historical_period: "Medieval",
    construction_date: "950–1050 CE",
    heritage_type: "Temple",
    cultural_significance:
      "Of an original 85 temples, only about 25 survive — together forming one of the richest surviving collections of medieval Indian sculpture.",
    architectural_details:
      "Temples are raised on high plinths with soaring shikharas (spires) and richly layered sculptural bands running the full circumference of each structure.",
    historical_facts: [
      "The temples were hidden by dense forest for centuries until an English engineer documented them in 1838.",
      "Each temple follows precise geometric and astronomical alignment principles.",
      "The complex is divided into western, eastern, and southern groups.",
    ],
    main_image:
      "/images/placeholder-heritage.jpg",
    gallery_images: [
      "/images/placeholder-heritage.jpg",
    ],
    model_3d_url: null,
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: null,
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Sanchi Stupa",
    slug: "sanchi-stupa",
    short_description:
      "One of the oldest stone structures in India, commissioned by Emperor Ashoka.",
    description:
      "The Great Stupa at Sanchi was originally commissioned by Emperor Ashoka in the 3rd century BCE and later expanded with elaborately carved gateways (toranas) depicting scenes from the life of the Buddha and Jataka tales.",
    state: "Madhya Pradesh",
    city: "Sanchi",
    latitude: 23.4794,
    longitude: 77.7398,
    historical_period: "Ancient",
    construction_date: "3rd century BCE",
    heritage_type: "Stupa",
    cultural_significance:
      "Sanchi remains one of the most complete and best-preserved examples of early Buddhist architecture in India.",
    architectural_details:
      "A hemispherical dome (anda) atop a raised terrace, encircled by a carved stone railing (vedika) and four ornamental gateways (toranas) at the cardinal points.",
    historical_facts: [
      "The stupa fell into obscurity for centuries after Buddhism declined in the region and was 'rediscovered' in 1818.",
      "The four gateways are considered among the finest examples of early narrative relief sculpture in India.",
      "Sanchi has no direct connection to the life of the Buddha — it was likely chosen for its proximity to a prosperous trade route.",
    ],
    main_image:
      "/images/placeholder-heritage.jpg",
    gallery_images: [
      "/images/placeholder-heritage.jpg",
    ],
    model_3d_url: null,
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: null,
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];

export function getHeritageSiteBySlug(slug: string): HeritageSite | undefined {
  return heritageSites.find((site) => site.slug === slug);
}

export function getHeritageSitesByPeriod(period: string): HeritageSite[] {
  if (period === "All") return heritageSites;
  return heritageSites.filter((site) => site.historical_period === period);
}
