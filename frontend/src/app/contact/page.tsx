import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldButton from "@/components/ui/GoldButton";

export const metadata = {
  title: "About & Contact — HeritageLens",
};

const TEAM_VALUES = [
  {
    title: "Preserve authentically",
    body: "Every historical fact shown is sourced and cross-checked before it reaches the interface — no invented history, ever.",
  },
  {
    title: "Make it experiential",
    body: "Static text can't convey scale or atmosphere. AR, VR, 3D and drone views exist to make heritage felt, not just read.",
  },
  {
    title: "Build for everyone",
    body: "From a village elder on a budget phone to a researcher on a workstation — the experience should degrade gracefully, never break.",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-20">
      {/* About */}
      <section className="heritage-pattern px-5 pt-14 pb-16 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            eyebrow="About HeritageLens"
            title="Technology can help us experience the past."
            subtitle="HeritageLens is a cultural-heritage technology platform built to make India's monuments interactive, educational, and immersive — instead of static pages of text and a single photograph."
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
          {TEAM_VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-gold/15 bg-white p-6 shadow-card"
            >
              <h3 className="font-display text-lg font-semibold text-brown">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-brown/70">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <h2 className="font-display text-2xl font-semibold text-brown">
          Why we built this
        </h2>
        <p className="mt-4 leading-relaxed text-brown/70">
          Most heritage websites are digital brochures: a photo, a paragraph,
          maybe a map pin. They rarely convey what it actually feels like to
          stand inside a thousand-year-old stepwell, or to see a temple's
          spire the way it looked before centuries of weathering. HeritageLens
          started as a hackathon project to close that gap — pairing verified
          historical research with AR placement, 3D exploration, 360° tours,
          and an AI guide trained on each site's own documented history.
        </p>
        <p className="mt-4 leading-relaxed text-brown/70">
          The project currently documents six sites across four Indian
          states, with the architecture built to scale to hundreds more via
          Supabase — see the technical documentation for details on adding
          new monuments.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-5 pb-20 md:px-8">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact Us"
          subtitle="Questions, partnership ideas, or want to contribute heritage data? Reach out."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-gold/15 bg-white p-6 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-gold">
              <Mail className="h-5 w-5" />
            </div>
            <p className="mt-4 font-semibold text-brown">Email</p>
            <a
              href="mailto:team@heritagelens.app"
              className="mt-1 block text-sm text-brown/60 hover:text-gold"
            >
              team@heritagelens.app
            </a>
          </div>

          <div className="rounded-3xl border border-gold/15 bg-white p-6 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-gold">
              <MapPin className="h-5 w-5" />
            </div>
            <p className="mt-4 font-semibold text-brown">Built for</p>
            <p className="mt-1 text-sm text-brown/60">
              College / university hackathon demonstration
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-gold/15 bg-white p-8 shadow-card">
          <form className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brown">
                  Name
                </label>
                <input
                  required
                  className="w-full rounded-xl border border-gold/25 bg-cream/30 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-gold focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brown">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-gold/25 bg-cream/30 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-gold focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brown">
                Message
              </label>
              <textarea
                required
                rows={4}
                className="w-full rounded-xl border border-gold/25 bg-cream/30 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-gold focus:outline-none"
                placeholder="Tell us what you'd like to share..."
              />
            </div>
            <GoldButton type="submit" className="w-full sm:w-auto">
              Send Message
            </GoldButton>
          </form>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://github.com"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-brown/60 hover:border-gold hover:text-gold"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-brown/60 hover:border-gold hover:text-gold"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
