import SectionHeading from "@/components/ui/SectionHeading";
import ExploreGrid from "@/components/heritage/ExploreGrid";
import ARExperience from "@/components/heritage/ARExperience";
import Model3DViewer from "@/components/heritage/Model3DViewer";
import VRTour from "@/components/heritage/VRTour";
import DroneView from "@/components/heritage/DroneView";
import HeritageMap from "@/components/heritage/HeritageMap";
import { fetchAllHeritageSites } from "@/lib/supabase/queries";
import { getObjectsForSite } from "@/lib/data/heritageObjects";

export const metadata = {
  title: "Explore Heritage — HeritageLens",
};

export default async function ExplorePage() {
  const sites = await fetchAllHeritageSites();
  const featuredSite = sites[0];
  const featuredObjects = getObjectsForSite(featuredSite.id);

  return (
    <div className="pb-20">
      {/* Header + search/filter grid */}
      <section className="heritage-pattern px-5 pb-16 pt-14 md:px-8">
        <SectionHeading
          eyebrow="Explore Heritage"
          title="All Heritage Sites"
          subtitle="Search and filter monuments by location, period, heritage type, and available immersive experiences."
        />
        <div className="mt-10">
          <ExploreGrid sites={sites} />
        </div>
      </section>

      {/* 3D */}
      <section id="3d" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8">
        <SectionHeading
          eyebrow="3D Heritage"
          title={`Explore ${featuredSite.name} in 3D`}
          subtitle="Rotate, zoom, and pan the monument. Click a hotspot to learn about a specific architectural element."
        />
        <div className="mt-10">
          <Model3DViewer
            modelUrl={featuredSite.model_3d_url}
            objects={featuredObjects}
            siteName={featuredSite.name}
          />
        </div>
      </section>

      {/* AR */}
      <section id="ar" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8">
        <SectionHeading
          eyebrow="AR Experience"
          title="View Heritage in the Real World"
          subtitle="Place a life-size monument model in your own space using your phone's camera."
        />
        <div className="mt-10">
          <ARExperience siteName={featuredSite.name} />
        </div>
      </section>
      


      {/* Drone */}
      <section className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8">
        <SectionHeading
          eyebrow="Aerial View"
          title="See Heritage From Above"
          subtitle="Explore the monument's layout and surroundings from a drone's-eye view."
        />
        <div className="mt-10">
          <DroneView droneImageUrl={featuredSite.drone_view_url} />
        </div>
      </section>

      {/* Map */}
      <section id="map" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8">
        <SectionHeading
          eyebrow="Heritage Map"
          title="Discover Sites Across India"
          subtitle="Filter by heritage type and select a marker to preview a site."
        />
        <div className="mt-10">
          <HeritageMap sites={sites} />
        </div>
      </section>
    </div>
  );
}
