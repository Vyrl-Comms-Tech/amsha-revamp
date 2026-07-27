import Brands from "../components/Home/Brands";
import ServiceHero from "../components/services/ServiceHero";
import StickySteps from "../components/services/StickySteps";
import OurClientsHorizontal from "../components/services/OurClientsHorizontal";
import BrandsStraight from "../components/About/BrandsStraight";
import Newsletter from "../components/layout/NewsLetter";

export const metadata = {
    title: "HR Consultancy Services Dubai | Amsha Advisory",
  description:
    "Get expert HR consultancy services in Dubai with Amsha Advisory. We offer tailored HR solutions to help your business grow and stay compliant.",
};

export default function ServicesPage() {
  return (
    <main >
      <ServiceHero />
      {/* <BrandsStraight /> */}
      {/* <OurClientsHorizontal /> */}
      <StickySteps/>
      <Newsletter/>
    </main>
  );
}
