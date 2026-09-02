import Image from "next/image";
import Link from "next/link";

const artforms = [
  {
    title: "Warli Painting",
    location: "Maharashtra · Tribal",
    description:
      "A tribal art form using geometric shapes to depict daily life and nature, originating from the Warli tribe.",
    image: "/images/warli.jpg.jpeg",
  },
  {
    title: "Paithani Weaving",
    location: "Maharashtra · Textile",
    description:
      "Handwoven silk sarees known for rich colors, intricate borders, and traditional motifs.",
    image: "/images/paithani.jpg.jpeg",
  },
  {
    title: "Pattachitra",
    location: "Odisha · Classical",
    description:
      "Traditional cloth-based scroll painting known for intricate details and mythological themes.",
    image: "/images/Pattachitra.jpg.jpeg",
  },
];

export default function FeaturedArtforms() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold">
        Cultural Heritage
      </p>
      <h2 className="mt-2 text-4xl font-bold text-brown md:text-5xl">
        Traditional Art Forms
      </h2>
      <p className="mt-4 max-w-2xl text-base text-brown/70">
        Explore India&apos;s rich artistic traditions preserved through generations.
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
              <p className="mt-3 text-sm text-brown/70">{art.description}</p>
              <Link
                href="/artforms"
                className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
              >
                Explore →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/artforms"
          className="rounded-full border border-gold px-8 py-3 text-base font-semibold text-gold transition-colors hover:bg-gold hover:text-white"
        >
          View All Art Forms
        </Link>
      </div>
    </section>
  );
}
