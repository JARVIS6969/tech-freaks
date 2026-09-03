import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Artforms | HeritageLens",
  description: "Explore traditional and regional art forms preserved through HeritageLens.",
};

const artforms = [
  {
    title: "Warli Painting",
    location: "Palghar, Thane · Tribal",
    description:
      "A tribal art form using geometric shapes to depict daily life and nature, originating from the Warli tribe.",
    image: "/images/warli.jpg.jpeg",
    slug: "warli-painting", // ← added
  },
  {
    title: "Paithani Weaving",
    location: "Paithan, Yeola · Textile",
    description:
      "Handwoven silk sarees known for rich colors, intricate borders, and traditional motifs like peacocks and flowers.",
    image: "/images/paithani.jpg.jpeg",
    slug: "paithani-weaving", // ← added
  },
  {
    title: "Sawantwadi Craft",
    location: "Sindhudurg · Woodcraft",
    description:
      "Colourful wooden lacquerware and handcrafted toys developed under the patronage of the Sawant Bhonsle royal family.",
    image: "/images/sawantwadi.jpg.jpeg",
  },
  {
    title: "Lavani",
    location: "Maharashtra · Folk Dance",
    description:
      "A powerful folk dance performed to dholki beats, known for graceful movements and expressive storytelling.",
    image: "/images/lavani.jpg.jpeg",
  },
  {
    title: "Tamasha",
    location: "Maharashtra · Folk Theatre",
    description:
      "A vibrant folk theatre combining music, dance, drama, poetry and comedy, closely linked with Lavani performances.",
    image: "/images/tamasha.jpg.jpeg",
  },
  {
    title: "Powada",
    location: "Maharashtra · Folk Ballad",
    description:
      "A Marathi ballad tradition celebrating heroic figures and Maratha history, performed by Shahir poet-singers.",
    image: "/images/powada.jpg.jpeg",
  },
  {
    title: "Koli Dance",
    location: "Konkan Coast · Folk Dance",
    description:
      "A vibrant dance of the Koli fishing community reflecting their bond with the sea, boats and coastal life.",
    image: "/images/kohli dance.jpg.jpeg",
  },
  {
    title: "Gondhal",
    location: "Maharashtra · Ritual Performance",
    description:
      "A devotional folk performance combining singing, narration, music and dance to honour deities like Khandoba.",
    image: "/images/gondhal.jpg.jpeg",
  },
  {
    title: "Dashavatara",
    location: "Konkan Region · Folk Theatre",
    description:
      "Traditional Konkan folk theatre centered on stories of Lord Vishnu's ten avatars, rich in music and drama.",
    image: "/images/Dashavatara.jpg.jpeg",
  },
  {
    title: "Bharud",
    location: "Maharashtra · Devotional Theatre",
    description:
      "Devotional musical storytelling associated with Sant Eknath, blending humour, songs and social messages.",
    image: "/images/Bharud.jpg.jpeg",
  },
  {
    title: "Gauri Dance",
    location: "Vidarbha · Tribal Dance",
    description:
      "A ritual tribal dance celebrating Goddess Gauri, performed during harvest festivals and community celebrations.",
    image: "/images/gauri dance.jpg.jpeg",
  },
  {
    title: "Karvat Kathi (Karvati) Silk Weaving",
    location: "Vidarbha region of Maharashtra,Bhandara district",
    description:
      "Karvat Kathi is a traditional Tussar-silk handloom from Vidarbha, famous for its distinctive saw-tooth (“karvat”) border and cultural significance in weddings and festivals",
    image: "/images/Karvat-Kathi-(Karvati)-Silk-Weaving.jpg",
  },
];

export default function ArtformsPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">
          Cultural Heritage
        </p>
        <h1 className="mt-2 text-4xl font-bold text-brown md:text-5xl">
          Artforms
        </h1>
        <p className="mt-4 max-w-2xl text-base text-brown/70">
          Discover the traditional art forms, crafts, and cultural expressions
          preserved as part of India&apos;s heritage.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {artforms.map((art) => (
            <div
              key={art.title}
              className="overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brown">{art.title}</h3>
                <p className="mt-1 text-sm text-brown/50">{art.location}</p>
                <p className="mt-3 text-sm text-brown/70">
                  {art.description}
                </p>

                {/* Updated Explore link */}
                {art.slug ? (
                  <Link
                    href={`/artforms/${art.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
                  >
                    Explore →
                  </Link>
                ) : (
                  <Link
                    href="#"
                    className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
                  >
                    Explore →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}