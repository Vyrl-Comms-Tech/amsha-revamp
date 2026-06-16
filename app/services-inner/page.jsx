import React from 'react'
import ServicesInnerHero from '@/app/components/ServicesInner/ServiceInnerHero'
import SupportAreas from '@/app/components/ServicesInner/SupportAreas'
import OtherInner from '@/app/components/ServicesInner/otherInner'

const page = () => {
  return (
    <div>
        <ServicesInnerHero/>
        <SupportAreas/>
      <OtherInner/>

    </div>
  )
}

export default page