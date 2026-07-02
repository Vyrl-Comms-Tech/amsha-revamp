import Brands from "../components/Home/Brands";
import ServiceHero from "../components/services/ServiceHero";
import StickySteps from "../components/services/StickySteps";
import OurClientsHorizontal from "../components/services/OurClientsHorizontal";
import BrandsStraight from "../components/About/BrandsStraight";

export default function ServicesPage() {
  return (
    <main >
      <ServiceHero />
      <BrandsStraight />
      <OurClientsHorizontal />
      <StickySteps/>
    </main>
  );
}
