import ServiceInnerHero from "../../components/ServicesInner/ServiceInnerHero";
import SupportAreas from "../../components/ServicesInner/SupportAreas";
import FooterModel from "../../components/layout/FooterModel";

const page = () => {
  return (
    <div>
      <FooterModel />
      <ServiceInnerHero
        heading="People Advisory"
        desc={`At Amsha Advisory, our People Advisory solutions are designed to help organisations strengthen their internal foundations through structured, practical, and people-centred support. We work closely with businesses to identify operational and organisational gaps that may be impacting efficiency, communication, leadership alignment, workplace culture, and overall performance.
Our approach goes beyond traditional HR support by focusing on how organisations function in practice, from structure and communication flow to accountability, operational processes, and employee experience. We create tailored solutions that support healthier workplace environments, stronger organisational performance, and long-term business sustainability.`}
        image="/s9.jpg"
      />
      <SupportAreas />
    </div>
  );
};

export default page;
