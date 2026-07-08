import Brands from "../components/Home/Brands";
import ServiceHero from "../components/services/ServiceHero";
import StickySteps from "../components/services/StickySteps";
import OurClientsHorizontal from "../components/services/OurClientsHorizontal";
import BrandsStraight from "../components/About/BrandsStraight";
import Newsletter from "../components/layout/NewsLetter";

export default function ServicesPage() {
  return (
    <main >
      <ServiceHero />
      {/* <BrandsStraight /> */}
      <OurClientsHorizontal />
      <StickySteps/>
      <Newsletter/>
    </main>
  );
}
