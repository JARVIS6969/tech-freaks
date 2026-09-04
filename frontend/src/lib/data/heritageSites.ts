import { HeritageSite } from "@/types/heritage";

export const heritageSites: HeritageSite[] = [
  {
    id: "1",
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
    main_image: "/images/ajanta.jpeg",
    gallery_images: [
      "/images/ajanta_before.jpg.jpeg",
      "/images/ajanta_after.webp",
      "/images/ajanta.jpeg",
    ],
    video_url: "/videos/ajanta_caves.mp4",
    model_3d_url: "/models/ellora_caves__india.glb",
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: "/images/ajanta_ellora_pano.jpg",
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Lal Mahal",
    slug: "lal-mahal",
    short_description:
      "A reconstructed 17th-century palace linked to Chhatrapati Shivaji Maharaj's childhood.",
    description:
      "Lal Mahal was built by Shahaji Bhosale for his wife Jijabai and young son Shivaji, who spent part of his childhood here under Jijabai's guidance. The palace is also remembered as the site where Shivaji is said to have confronted the Mughal general Shaista Khan in 1663, escaping after wounding him.",
    state: "Maharashtra",
    city: "Pune",
    latitude: 18.5195,
    longitude: 73.8553,
    historical_period: "Medieval",
    construction_date: "1630s CE",
    heritage_type: "Palace",
    cultural_significance:
      "A symbolic site in Maratha history, associated with Shivaji Maharaj's upbringing and one of the boldest episodes of his resistance against Mughal rule.",
    architectural_details:
      "A modest brick-and-timber Maratha-style residence, reconstructed in the 20th century with courtyards, a Jijabai statue, and period-style interiors.",
    historical_facts: [
      "The current structure is a 20th-century reconstruction built by the Pune Municipal Corporation.",
      "It commemorates the 1663 night raid where Shivaji is said to have cut off Shaista Khan's fingers as he fled.",
      "Jijabai is credited with instilling in young Shivaji the values that shaped the Maratha Empire.",
    ],

        why_visit: [
      {
        title: "Walk in the Footsteps of a Maratha Legend",
        description:
          "Step into the childhood home of Chhatrapati Shivaji Maharaj, where he spent his formative years under the guidance of his mother, Jijabai.",
      },
      {
        title: "Relive History's Boldest Escape",
        description:
          "Stand at the site of the daring 1663 night raid, where Shivaji is said to have confronted the Mughal general Shaista Khan and escaped after wounding him.",
      },
      {
        title: "Honor Jijabai's Legacy",
        description:
          "See the statue and courtyards dedicated to Jijabai, whose upbringing is credited with shaping the values that founded the Maratha Empire.",
      },
      {
        title: "Experience Maratha-Style Architecture",
        description:
          "Explore the reconstructed brick-and-timber residence, rebuilt in period style with courtyards and interiors reflecting 17th-century Maratha design.",
      },
    ],

    
    main_image: "/images/Lal_Mahaal_modern.jpg",
    gallery_images: [
      "/images/lal-mahal_old.webp",
      "/images/lalmahal.jpeg",
      "/images/Lal_Mahaal_modern.jpg",
    ],
    video_url: "/videos/lal_mahal.mp4",
    model_3d_url: "/models/lal_mahal.glb",
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: "/images/lal_mahal_pano.jpeg",
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Aga Khan Palace",
    slug: "aga-khan-palace",
    short_description:
      "A grand Italianate palace turned freedom-movement memorial and Gandhi National Memorial.",
    description:
      "Built in 1892 by Sultan Mohammed Shah Aga Khan III, the palace became a place of confinement for Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai during the Quit India Movement (1942–44). Kasturba Gandhi and Mahadev Desai both passed away within its grounds and are memorialized there.",
    state: "Maharashtra",
    city: "Pune",
    latitude: 18.5548,
    longitude: 73.9022,
    historical_period: "Colonial",
    construction_date: "1892 CE",
    heritage_type: "Palace",
    cultural_significance:
      "A key site of India's independence movement, now home to the Gandhi National Memorial Society and a museum of Gandhian history.",
    architectural_details:
      "Built in Italianate arches with sprawling lawns, the palace spans 19 acres and features spacious verandahs and domed halls.",
    historical_facts: [
      "Aga Khan III built the palace partly to provide employment relief during a regional famine.",
      "The samadhis (memorials) of Kasturba Gandhi and Mahadev Desai stand in the palace gardens.",
      "The Aga Khan family donated the palace to the Indian people in 1972 in honor of Gandhi.",
    ],
    main_image: "/images/AgaKhan_Palace.jpeg",
    gallery_images: [
      "/images/aghakhan_before.jpeg",
      "/images/aghakhan_after.jpg.jpeg",
      "/images/AgaKhan_Palace.jpeg",
    ],
    video_url: "/videos/agha_khan_palace.mp4",
    model_3d_url: "/models/agakhanpalace/source/agakhanpalace.glb",
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: "/images/aga_khan_palace_pano.jpg",
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Chhatrapati Shivaji Maharaj Terminus",
    slug: "chhatrapati-shivaji-terminus",
    short_description:
      "A Victorian Gothic Revival railway station and UNESCO World Heritage Site in Mumbai.",
    description:
      "Designed by British architect Frederick William Stevens, this terminus blends Victorian Gothic Revival architecture with traditional Indian palace architecture. Completed in 1887 to mark Queen Victoria's Golden Jubilee, it remains one of the busiest railway stations in India and a defining symbol of Mumbai's skyline.",
    state: "Maharashtra",
    city: "Mumbai",
    latitude: 18.9398,
    longitude: 72.8355,
    historical_period: "Colonial",
    construction_date: "1878–1887 CE",
    heritage_type: "Monument",
    cultural_significance:
      "A UNESCO World Heritage Site recognized as an outstanding example of Victorian Gothic Revival architecture fused with Indian traditions, and a functioning icon of daily life in Mumbai.",
    architectural_details:
      "Features turrets, spires, pointed arches, and a striking central dome, along with stone carvings blending British and Indian decorative motifs.",
    historical_facts: [
      "Originally named Victoria Terminus, it was renamed in 1996 after Chhatrapati Shivaji Maharaj.",
      "It took ten years to build and was designed to be Mumbai's grandest colonial-era structure.",
      "It has been a UNESCO World Heritage Site since 2004.",
    ],
    main_image: "/images/csmt_new.jpeg",
    gallery_images: [
      "/images/csmt_old.jpeg",
      "/images/csmt.jpeg",
      "/images/csmt_new.jpeg",
    ],
    video_url: "/videos/csmt.mp4",
    model_3d_url: "/models/csmt.glb",
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: "/images/csmt_pano.jpeg",
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Gateway of India",
    slug: "gateway-of-india",
    short_description:
      "A monumental arch built to commemorate the 1911 royal visit of King George V.",
    description:
      "Designed by architect George Wittet in the Indo-Saracenic style, the Gateway of India was built to commemorate the landing of King George V and Queen Mary at Apollo Bunder in 1911. Completed in 1924, it later became the ceremonial exit point for British troops leaving India in 1948.",
    state: "Maharashtra",
    city: "Mumbai",
    latitude: 18.922,
    longitude: 72.8347,
    historical_period: "Colonial",
    construction_date: "1913–1924 CE",
    heritage_type: "Monument",
    cultural_significance:
      "One of Mumbai's most recognized landmarks, symbolizing both the height of British colonial ceremony and the moment of India's transition to independence.",
    architectural_details:
      "A basalt arch in Indo-Saracenic style rising 26 meters, blending Muslim architectural styles from 16th-century Gujarat with Hindu decorative elements.",
    historical_facts: [
      "The foundation stone was laid in 1913, but construction wasn't completed until 1924.",
      "The last British troops to leave India marched out through the Gateway in February 1948.",
      "It faces the Arabian Sea and directly overlooks the Taj Mahal Palace Hotel.",
    ],
    main_image: "/images/Gateway_of_india_new.jpeg",
    gallery_images: [
      "/images/Gateway_of_india_old.jpeg",
      "/images/Gateway_of_india.jpeg",
      "/images/Gateway_of_india_new.jpeg",
    ],
    video_url: "/videos/Gateway_of_indians.mp4",
    model_3d_url: "/models/gateway-of-india-model/source/model.glb",
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: "/images/gateway_of_india_pano.jpeg",
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: false,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Shaniwar Wada",
    slug: "shaniwar-wada",
    short_description:
      "The fortified seat of the Peshwa rulers of the Maratha Empire in Pune.",
    description:
      "Built in 1732, Shaniwar Wada served as the residence and seat of power for the Peshwas, who governed the Maratha Empire. Once a lavish fortified palace complex with grand gates and gardens, most of its wooden interior was destroyed by a fire in 1828, leaving the massive stone and brick fortification walls standing today.",
    state: "Maharashtra",
    city: "Pune",
    latitude: 18.5195,
    longitude: 73.8553,
    historical_period: "Medieval",
    construction_date: "1732 CE",
    heritage_type: "Fort",
    cultural_significance:
      "A defining symbol of Pune and the seat of the Peshwa administration that governed much of the Maratha Empire during the 18th century.",
    architectural_details:
      "Fortified walls up to 21 feet high enclose the complex, with five grand gates including the iconic spike-studded Delhi Darwaza, built to deter elephant charges.",
    historical_facts: [
      "A mysterious fire in 1828 destroyed the wooden palace interiors; the cause remains debated.",
      "The complex once included ornamental fountains, including the famous Hazari Karanje (thousand-fountain).",
      "Light and sound shows are now held at the site recounting Peshwa-era history.",
    ],
    main_image: "/images/shaniwarwada-present.jpg",
    gallery_images: [
      "/images/Shaniwarwada_in_late_1800s.jpg",
      "/images/shaniwarwada-historical.jpg",
      "/images/shaniwar_wada.webp",
      "/images/shaniwarwada-present.jpg",
    ],
    video_url: "/videos/shaniwar_wada.mp4",
    model_3d_url: null,
    ar_model_url: null,
    vr_tour_url: null,
    drone_view_url: "/images/shaniwar_wada_pano.jpg",
    historical_reconstruction_url: null,
    audio_url: null,
    is_unesco: false,
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
