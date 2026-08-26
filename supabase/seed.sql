-- ─────────────────────────────────────────────
-- HeritageLens — Seed Data
-- Run AFTER schema.sql. Mirrors src/lib/data/heritageSites.ts so the demo
-- data is identical whether the app is reading from Supabase or from the
-- local fallback dataset.
-- ─────────────────────────────────────────────

insert into heritage_sites
  (name, slug, description, short_description, state, city, latitude, longitude,
   historical_period, construction_date, heritage_type, cultural_significance,
   architectural_details, historical_facts, main_image, gallery_images, is_unesco)
values
  (
    'Modhera Sun Temple', 'modhera-sun-temple',
    'Built by King Bhima I of the Chaulukya dynasty, the Modhera Sun Temple is designed so the first rays of the equinox sun strike the sanctum''s idol directly. The complex spans three parts — the shrine, the assembly hall (Sabha Mandapa), and the sacred Surya Kund stepwell — each carved with intricate depictions of deities, dancers, and the 12 zodiac signs.',
    'An 11th-century Sun temple famed for its stepwell and solar-aligned sanctum.',
    'Gujarat', 'Modhera', 23.5834, 72.1275, 'Medieval', '1026–1027 CE', 'Temple',
    'Regarded as one of the finest examples of Solanki-era architecture, the temple reflects the Chaulukya dynasty''s devotion to Surya, the sun god, and their mastery of stone craftsmanship.',
    'Constructed from sandstone with no mortar, using interlocking stone joinery. The Surya Kund is a stepped tank with 108 miniature shrines lining its terraces.',
    array[
      'The temple was never used for worship after invasions in the 13th century damaged the main idol.',
      'The stepwell (Kund) is one of the oldest surviving of its kind in India.',
      'Every pillar in the Sabha Mandapa is carved with a unique motif — no two are identical.'
    ],
    'https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=1600&auto=format&fit=crop',
    array['https://images.unsplash.com/photo-1601921804429-ace8f47c2145?q=80&w=1200&auto=format&fit=crop'],
    false
  ),
  (
    'Konark Sun Temple', 'konark-sun-temple',
    'Conceived as a colossal stone chariot with 24 carved wheels drawn by seven horses, the Konark Sun Temple is one of India''s most celebrated UNESCO World Heritage Sites. Its walls are covered in intricate friezes depicting daily life, mythology, and courtly scenes of the Eastern Ganga dynasty.',
    'A 13th-century chariot-shaped temple dedicated to the sun god Surya.',
    'Odisha', 'Konark', 19.8876, 86.0945, 'Medieval', '1250 CE', 'Temple',
    'Commissioned by King Narasimhadeva I, the temple is a masterpiece of Kalinga architecture and a symbol of Odisha''s cultural identity.',
    'The temple''s wheels function as sundials, accurately telling time from the shadows cast. Built from Khondalite rock, transported over 100 km to the site.',
    array[
      'The temple is also known as the ''Black Pagoda'' by European sailors due to its dark color and use as a navigation landmark.',
      'The main sanctum tower collapsed centuries ago; only the assembly hall (Jagamohana) survives intact.',
      'Each of the 24 wheels is 3 meters in diameter and precisely tells the time of day.'
    ],
    'https://images.unsplash.com/photo-1621789098261-039a91a2e058?q=80&w=1600&auto=format&fit=crop',
    array['https://images.unsplash.com/photo-1600100397608-f70fe2fbd2f2?q=80&w=1200&auto=format&fit=crop'],
    true
  ),
  (
    'Hampi', 'hampi',
    'Once the second-largest medieval city in the world, Hampi''s boulder-strewn landscape is dotted with temples, royal enclosures, market streets, and the iconic stone chariot at Vittala Temple. It served as the capital of the Vijayanagara Empire from 1336 to 1565 CE.',
    'The sprawling ruins of the Vijayanagara Empire''s capital city.',
    'Karnataka', 'Hampi', 15.335, 76.46, 'Medieval', '14th–16th century CE', 'Temple',
    'Hampi represents the pinnacle of Vijayanagara art, engineering, and urban planning, and remains a living pilgrimage site around the Virupaksha Temple.',
    'Dravidian-style temple complexes combined with Indo-Islamic influences, granite monolithic sculptures, and an advanced aqueduct-based irrigation system.',
    array[
      'The stone chariot at Vittala Temple has wheels that can still rotate.',
      'Hampi''s musical pillars produce different musical notes when tapped.',
      'The empire fell after the 1565 Battle of Talikota, and the city was sacked and abandoned.'
    ],
    'https://images.unsplash.com/photo-1600100397319-0c9c7f6c1f01?q=80&w=1600&auto=format&fit=crop',
    array['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1200&auto=format&fit=crop'],
    true
  ),
  (
    'Ajanta & Ellora Caves', 'ajanta-ellora-caves',
    'Carved directly into basalt cliffs, the Ajanta caves house exquisite Buddhist murals and sculptures dating back to the 2nd century BCE, while the nearby Ellora caves showcase an unmatched sequence of Buddhist, Hindu, and Jain rock-cut temples — including the monolithic Kailasa Temple, carved top-down from a single rock.',
    'Rock-cut cave monasteries and temples spanning Buddhist, Hindu, and Jain traditions.',
    'Maharashtra', 'Aurangabad', 20.5519, 75.7033, 'Ancient', '2nd century BCE – 10th century CE', 'Cave',
    'The caves document the evolution of Indian rock-cut architecture and religious art across three major faiths over more than a millennium.',
    'Ellora''s Kailasa Temple was excavated from a single rock face — over 200,000 tonnes of rock were removed without any additive construction.',
    array[
      'Ajanta''s caves were rediscovered by a British officer in 1819 while tiger hunting.',
      'The Kailasa Temple at Ellora is twice the size of the Parthenon.',
      'Ajanta''s murals are among the earliest surviving examples of Indian painting.'
    ],
    'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1600&auto=format&fit=crop',
    array['https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop'],
    true
  ),
  (
    'Khajuraho Group of Monuments', 'khajuraho',
    'Built by the Chandela dynasty, the Khajuraho temples are famous for their nagara-style spires and elaborate sculptures depicting daily life, deities, and philosophical concepts of dharma, artha, kama, and moksha.',
    'Chandela-era temples renowned for their intricate sculptural artistry.',
    'Madhya Pradesh', 'Khajuraho', 24.8318, 79.9199, 'Medieval', '950–1050 CE', 'Temple',
    'Of an original 85 temples, only about 25 survive — together forming one of the richest surviving collections of medieval Indian sculpture.',
    'Temples are raised on high plinths with soaring shikharas (spires) and richly layered sculptural bands running the full circumference of each structure.',
    array[
      'The temples were hidden by dense forest for centuries until an English engineer documented them in 1838.',
      'Each temple follows precise geometric and astronomical alignment principles.',
      'The complex is divided into western, eastern, and southern groups.'
    ],
    'https://images.unsplash.com/photo-1621789098261-039a91a2e058?q=80&w=1600&auto=format&fit=crop',
    array['https://images.unsplash.com/photo-1600100397608-f70fe2fbd2f2?q=80&w=1200&auto=format&fit=crop'],
    true
  ),
  (
    'Sanchi Stupa', 'sanchi-stupa',
    'The Great Stupa at Sanchi was originally commissioned by Emperor Ashoka in the 3rd century BCE and later expanded with elaborately carved gateways (toranas) depicting scenes from the life of the Buddha and Jataka tales.',
    'One of the oldest stone structures in India, commissioned by Emperor Ashoka.',
    'Madhya Pradesh', 'Sanchi', 23.4794, 77.7398, 'Ancient', '3rd century BCE', 'Stupa',
    'Sanchi remains one of the most complete and best-preserved examples of early Buddhist architecture in India.',
    'A hemispherical dome (anda) atop a raised terrace, encircled by a carved stone railing (vedika) and four ornamental gateways (toranas) at the cardinal points.',
    array[
      'The stupa fell into obscurity for centuries after Buddhism declined in the region and was ''rediscovered'' in 1818.',
      'The four gateways are considered among the finest examples of early narrative relief sculpture in India.',
      'Sanchi has no direct connection to the life of the Buddha — it was likely chosen for its proximity to a prosperous trade route.'
    ],
    'https://images.unsplash.com/photo-1600100397319-0c9c7f6c1f01?q=80&w=1600&auto=format&fit=crop',
    array['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1200&auto=format&fit=crop'],
    true
  )
on conflict (slug) do nothing;

-- Sample heritage_objects for Modhera Sun Temple (used by the 3D hotspot viewer)
insert into heritage_objects (heritage_site_id, name, description, historical_significance)
select id, 'Main Shrine (Garbhagriha)',
  'The inner sanctum aligned so the equinox sunrise illuminates the sanctum floor directly.',
  'Astronomically aligned architecture reflecting Solanki-era solar worship.'
from heritage_sites where slug = 'modhera-sun-temple';

insert into heritage_objects (heritage_site_id, name, description, historical_significance)
select id, 'Sabha Mandapa Pillars',
  '108 carved pillars, each bearing a unique motif — from deities to floral medallions.',
  'Demonstrates the individualized artisanal approach of Solanki sculptors.'
from heritage_sites where slug = 'modhera-sun-temple';

insert into heritage_objects (heritage_site_id, name, description, historical_significance)
select id, 'Surya Kund Stepwell',
  'A stepped tank lined with 108 miniature shrines, used for ritual bathing.',
  'One of the earliest and most elaborate stepwells surviving in Gujarat.'
from heritage_sites where slug = 'modhera-sun-temple';
