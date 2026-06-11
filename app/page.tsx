import Hero from "../app/components/Home/Hero";
import Hero2 from "../app/components/Home/Hero2";
import Marquee from "../app/components/Home/Marquee";
import Brands from "../app/components/Home/Brands";
import Hero3 from "../app/components/Home/Hero3";
import OverlapingCards from "../app/components/Home/OverlapingCards";
import PeopleAdvisory from "../app/components/Home/PeopleAdvisory";
import WhyChooseUs from "../app/components/Home/WhyChooseUs";
import Facts from "../app/components/Home/Facts";
import Particles from "../app/components/Home/Particles";
export default function Home() {
  return (
    <>
      <Hero />
      <Hero2 />
      <Hero3 />
      {/* <Marquee/> */}
      <Brands />
      <OverlapingCards />
      <PeopleAdvisory />
      <WhyChooseUs />
      <Facts />
      {/* <Particles /> */}
    </>
  );
}
