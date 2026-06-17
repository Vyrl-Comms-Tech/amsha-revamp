import React from 'react'
import ServiceInnerHero from '../components/ServicesInner/ServiceInnerHero'
import SupportAreas from '../components/ServicesInner/SupportAreas'
import OtherInner from '../components/ServicesInner/otherInner'

const page = () => {
  return (
    <div>
      <ServiceInnerHero />
      <SupportAreas />
      <OtherInner />
    </div>
  )
}

export default page