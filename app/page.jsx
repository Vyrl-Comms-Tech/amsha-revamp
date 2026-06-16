import Hero from "./components/Home/Hero";
import Hero2 from "./components/Home/Hero2";
import Marquee from "./components/Home/Marquee";
import Brands from "./components/Home/Brands";
import Hero3 from "./components/Home/Hero3";
import OverlapingCards from "./components/Home/OverlapingCards";
import PeopleAdvisory from "./components/Home/PeopleAdvisory";
import WhyChooseUs from "./components/Home/WhyChooseUs";
import Facts from "./components/Home/Facts";
import Particles from "./components/Home/Particles";
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
