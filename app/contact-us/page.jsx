import React from "react";
import ContactUsHero from "../components/contactUs/contactUsHero";
import ContactHero from "../components/contactUs/contactHero";
import FooterModel from "../components/layout/FooterModel";
// export const metadata = {
//   title: "Amsha Advisory | Contact Us",
//   description:
//     "Amsha Advisory delivers people-centric HR solutions, talent assessment, training, and strategic consulting to drive business growth and workplace ...",
// };
const page = () => {
  return (
    <div>
      {/* <ContactUsHero /> */}
      <ContactHero/>
      <FooterModel />
    </div>
  );
};

export default page;
