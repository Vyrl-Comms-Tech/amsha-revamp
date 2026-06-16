import Brands from "../components/Home/Brands";
import ServiceHero from "../components/services/ServiceHero";
import StickySteps from "../components/services/StickySteps";
import OurClientsHorizontal from "../components/services/OurClientsHorizontal";

export default function ServicesPage() {
  return (
    <main >
      <ServiceHero />
      <Brands />
      <OurClientsHorizontal />
      <StickySteps/>
    </main>
  );
}
