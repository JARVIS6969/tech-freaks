import SectionHeading from "@/components/ui/SectionHeading";
import { fetchAllHeritageSites } from "@/lib/supabase/queries";
import ReportForm from "@/components/report/ReportForm";
import { Box, Camera, Video, MapPin } from "lucide-react";

export const metadata = {
  title: "Reports & Impact — HeritageLens",
};

export default async function ReportPage() {
  const sites = await fetchAllHeritageSites();

  const stats = [
    { label: "Heritage Sites Documented", value: sites.length, icon: <MapPin className="h-5 w-5" /> },
    { label: "UNESCO Sites Included", value: sites.filter((s) => s.is_unesco).length, icon: <Box className="h-5 w-5" /> },
    { label: "States Represented", value: new Set(sites.map((s) => s.state)).size, icon: <Camera className="h-5 w-5" /> },
    { label: "Immersive Formats", value: 5, icon: <Video className="h-5 w-5" /> },
  ];

  const byPeriod = ["Ancient", "Medieval", "Colonial", "Modern"].map((period) => ({
    period,
    count: sites.filter((s) => s.historical_period === period).length,
  }));

  const maxCount = Math.max(...byPeriod.map((p) => p.count), 1);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <SectionHeading
        eyebrow="Reports & Impact"
        title="Heritage Coverage Report"
        subtitle="A snapshot of what HeritageLens currently documents, plus a place to report issues or suggest a new heritage site."
      />

      {/* Stat cards */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-gold/15 bg-white p-6 shadow-card"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-gold">
              {s.icon}
            </div>
            <p className="mt-4 font-display text-3xl font-semibold text-brown">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-brown/60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Period breakdown */}
      <div className="mt-14 rounded-3xl border border-gold/15 bg-white p-8 shadow-card">
        <h3 className="font-display text-xl font-semibold text-brown">
          Sites by Historical Era
        </h3>
        <div className="mt-6 space-y-4">
          {byPeriod.map((p) => (
            <div key={p.period}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-brown/80">{p.period}</span>
                <span className="text-brown/50">{p.count} site{p.count !== 1 ? "s" : ""}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-cream">
                <div
                  className="h-full rounded-full bg-gold-gradient"
                  style={{ width: `${(p.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report an issue / suggest a site */}
      <div className="mt-14">
        <SectionHeading
          eyebrow="Feedback"
          title="Report an Issue or Suggest a Site"
          subtitle="Spot inaccurate history, a broken experience, or want a monument added? Let us know."
        />
        <div className="mt-10 mx-auto max-w-2xl">
          <ReportForm sites={sites} />
        </div>
      </div>
    </div>
  );
}
