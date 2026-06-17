import ServiceInnerHero from "../../components/ServicesInner/ServiceInnerHero";
import SupportAreas from "../../components/ServicesInner/SupportAreas";
import FooterModel from "../../components/layout/FooterModel";

const page = () => {
  return (
    <div>
      <FooterModel />
      <ServiceInnerHero
        heading="People Advisory"
        desc="At Amsha Advisory, our People Advisory solutions are designed to help organisations strengthen their internal foundations through structured, practical, and people-centred support. We work closely with businesses to identify operational and organisational gaps that may be impacting efficiency, communication, leadership alignment, workplace culture, and overall performance."
        image="/ab1.png"
      />
      <SupportAreas />
    </div>
  );
};

export default page;
