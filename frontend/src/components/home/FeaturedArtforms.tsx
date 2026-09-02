import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldButton from "@/components/ui/GoldButton";

const artforms = [
  {
    title: "Warli Painting",
    location: "Maharashtra · Tribal",
    description:
      "A tribal art form using geometric shapes to depict daily life and nature.",
    image: "/images/artforms/warli-painting.jpg",
  },
  {
    title: "Madhubani Painting",
    location: "Bihar · Folk",
    description:
      "Vibrant folk art from the Mithila region, known for intricate patterns.",
    image: "/images/artforms/madhubani.jpg",
  },
  {
    title: "Pattachitra",
    location: "Odisha · Classical",
    description:
      "Traditional cloth-based scroll painting known for mythological themes.",
    image: "/images/artforms/pattachitra.jpg",
  },
];

export default function FeaturedArtforms() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Cultural Heritage"
        title="Traditional Art Forms"
        subtitle="Explore India's rich artistic traditions preserved through generations."
      />

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {artforms.map((art) => (
          <div
            key={art.title}
            className="overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative h-52 w-full">
              <Image src={art.image} alt={art.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-brown">{art.title}</h3>
              <p className="mt-1 text-sm text-brown/50">{art.location}</p>
              <p className="mt-3 text-sm text-brown/70">{art.description}</p>
              <Link href="/artforms" className="mt-4 inline-block text-sm font-semibold text-gold hover:underline">
                Explore →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <GoldButton href="/artforms" variant="outline" size="lg">
          View All Art Forms
        </GoldButton>
      </div>
    </section>
  );
}