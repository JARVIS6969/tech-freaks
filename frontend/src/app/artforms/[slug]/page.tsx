import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, Mail, MapPin, Star } from "lucide-react";

interface Seller {
  name: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  priceRange: string;
  rating: number;
  yearsOfExperience: number;
}

const artformDetails: Record<
  string,
  {
    title: string;
    location: string;
    category: string;
    images: string[];
    video?: string;
    sellers?: Seller[];
    sections: { heading: string; content: string[] }[];
  }
> = {
  "warli-painting": {
    title: "Warli Painting",
    location: "Palghar, Thane",
    category: "Tribal",
    images: [
      "/images/warli.jpg.jpeg",
      "/images/warli1.jpeg",
      "/images/warli2.jpeg",
    ],
    video: "/videos/warli.mp4",
    sellers: [
      {
        name: "Jivya Soma Mashe Art Collective",
        location: "Palghar, Maharashtra",
        phone: "+91 98765 43210",
        whatsapp: "+91 98765 43210",
        email: "warliart.collective@example.com",
        priceRange: "₹1,500 – ₹8,000",
        rating: 4.8,
        yearsOfExperience: 15,
      },
      {
        name: "Anita Tribal Arts",
        location: "Dahanu, Thane",
        phone: "+91 91234 56789",
        whatsapp: "+91 91234 56789",
        email: "anita.tribalarts@example.com",
        priceRange: "₹1,200 – ₹6,500",
        rating: 4.6,
        yearsOfExperience: 10,
      },
    ],
    sections: [
      {
        heading: "1. What is Warli Art?",
        content: [
          "Warli art is a traditional tribal painting style from Maharashtra, India, associated with the Warli community.",
          "It is famous for its simple geometric forms, especially circles, triangles, squares, and lines, which are used to represent people, animals, nature, celebrations, and everyday village life.",
          "Despite its simple appearance, Warli paintings communicate stories about the community's relationship with nature, social life, traditions, farming, festivals, and spirituality.",
        ],
      },
      {
        heading: "2. Origin and History",
        content: [
          "Warli art is believed to have originated more than 2,000 years ago among the Warli tribe living in the northern Sahyadri range of Maharashtra.",
          "Traditionally, these paintings were created on the walls of mud houses using rice paste mixed with water and gum.",
          "The art was mainly practiced by women during special occasions such as weddings, harvests, and festivals.",
          "In modern times, Warli art has moved from walls to paper, cloth, and canvas, and is now recognized as an important tribal art form of India.",
        ],
      },
      {
        heading: "3. Style and Technique",
        content: [
          "Warli paintings use very basic geometric shapes:",
          "• Circle → represents the sun and moon",
          "• Triangle → represents mountains and trees",
          "• Square → represents a sacred enclosure or piece of land",
          "Human and animal figures are formed by combining two triangles joined at the tip.",
          "The paintings are usually done in white on a mud or brown background, giving them a distinctive look.",
        ],
      },
      {
        heading: "4. Themes Depicted",
        content: [
          "Common themes in Warli art include:",
          "• Farming and harvesting",
          "• Hunting and fishing",
          "• Wedding ceremonies and the famous Tarpa dance",
          "• Village life and community gatherings",
          "• Nature, animals, and trees",
          "• Festivals and rituals",
        ],
      },
    ],
  },

  "paithani-weaving": {
    title: "Paithani Weaving",
    location: "Paithan, Yeola",
    category: "Textile",
    images: [
      "/images/Paithani Weaving.jpeg",
      "/images/Paithani Weaving1.jpeg",
      "/images/paithani.jpg.jpeg",
    ],
    sections: [
      {
        heading: "1. What is Paithani Weaving?",
        content: [
          "Paithani is a traditional handwoven textile and saree-making tradition from Maharashtra, India. It is especially famous for its rich colors, intricate silk weaving, detailed zari work, and distinctive motifs such as peacocks, flowers, parrots and vines.",
          "The saree is traditionally woven by hand, and creating a high-quality Paithani can require considerable time and skill.",
          "The name Paithani comes from Paithan, an ancient town in Maharashtra that is traditionally regarded as the historical center of this textile tradition.",
          "Today, Yeola in Nashik district is one of the major centers associated with Paithani production.",
        ],
      },
      {
        heading: "2. History of Paithani",
        content: [
          "Paithani has a long history in Maharashtra.",
          "The tradition is associated with the ancient town of Paithan, located near the Godavari River. Paithan was an important center of trade and culture, which helped textile traditions develop and reach different parts of India.",
          "Paithani weaving later received significant patronage during the Maratha and Peshwa periods, when richly decorated textiles were valued by royal and wealthy families.",
          "Historically, Paithani sarees were associated with royal families, wealthy households, weddings, religious ceremonies, and special celebrations.",
          "The tradition has continued into modern times through handloom communities and weaving families.",
        ],
      },
      {
        heading: "3. Materials Used",
        content: [
          "Traditional Paithani primarily uses silk and zari.",
          "Silk forms the main body of the saree. High-quality silk gives Paithani its smooth texture, rich appearance, shine, strength, and elegant drape.",
          "Zari is metallic thread traditionally used to create decorative borders and pallus. Traditionally, zari was associated with gold and silver, although modern production can use other metallic materials.",
        ],
      },
      {
        heading: "4. The Paithani Weaving Process",
        content: [
          "Creating a Paithani involves several stages:",
          "Step 1 — Preparing the Silk: Silk yarn is prepared and processed before it is placed on the loom.",
          "Step 2 — Dyeing: The silk is dyed in the desired colors. Popular colors include green, purple, red, pink, blue, orange, yellow, and magenta.",
          "Step 3 — Preparing the Loom: The warp threads are arranged carefully on the handloom.",
          "Step 4 — Weaving: The weaver interlaces the warp and weft threads to create the fabric.",
          "Step 5 — Creating Motifs: The pallu and borders require particularly detailed work.",
          "Step 6 — Zari Work: Zari is incorporated into the border and pallu.",
          "Step 7 — Finishing: After weaving is completed, the saree is inspected and finished.",
        ],
      },
      {
        heading: "5. What Makes Paithani Special?",
        content: [
          "One of the most important characteristics of Paithani is that the decoration is woven into the fabric, rather than simply being printed onto it.",
          "This means that the motifs are an integral part of the textile.",
          "The weaver must carefully control thread placement, colors, motif shapes, borders, and pallu patterns.",
          "This is why skilled Paithani weaving requires considerable craftsmanship.",
        ],
      },
    ],
  },
};

export default function ArtformDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = artformDetails[params.slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link
          href="/artforms"
          className="inline-flex items-center text-amber-700 hover:text-amber-900 mb-8 font-medium"
        >
          ← Back to Artforms
        </Link>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {data.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {data.location} · {data.category}
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {data.images.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-gray-100"
            >
              <Image
                src={src}
                alt={`${data.title} ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Video Section (only shows if video exists) */}
        {data.video && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Watch {data.title} in Action
            </h2>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
              <video
                src={data.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
                poster={data.images[0]}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Sellers Section (only shows if sellers exist) */}
        {data.sellers && data.sellers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Buy Authentic {data.title}
            </h2>
            <p className="text-gray-600 mb-6">
              Connect directly with verified artisans and support traditional
              craftsmanship.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.sellers.map((seller, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {seller.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                      <Star className="h-4 w-4 fill-amber-500" />
                      {seller.rating}
                    </div>
                  </div>

                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {seller.location}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    {seller.yearsOfExperience}+ years of experience
                  </p>

                  <p className="mt-2 text-base font-semibold text-amber-700">
                    {seller.priceRange}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    
                      <a
                        href={`tel:${seller.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Call
                    </a>
                    
                      <a
                        href={`https://wa.me/${seller.whatsapp.replace(/[\s+]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                    
                      <a
                        href={`mailto:${seller.email}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-400">
              * Seller details shown here are sample/demo data for
              demonstration purposes.
            </p>
          </div>
        )}

        {/* Detailed Sections */}
        <div className="space-y-10">
          {data.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.heading}
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                {section.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
