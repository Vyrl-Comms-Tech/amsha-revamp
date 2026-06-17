import React from 'react'
import ServiceInnerHero from '../components/ServicesInner/ServiceInnerHero'
import SupportAreas from '../components/ServicesInner/SupportAreas'
import ServiceOtherInner from "../components/ServicesInner/ServiceOtherInner";

const page = () => {
  return (
    <div>
      <ServiceInnerHero />
      <SupportAreas />
      <ServiceOtherInner />
    </div>
  )
}

export default page
