import React from "react";
import BlogParentHero from "../components/Blog/blogParentHero";
import BlogGrid from "../components/Blog/blogGrid";
import FooterModel from "../components/layout/FooterModel";
const page = () => {
  return (
   <>
   <BlogParentHero/>
   <BlogGrid/>
   <FooterModel />
   </>
  );
};

export default page;
