import React from 'react'
import BlogInnerHero from '@/app/components/BlogInner/BlogInnerHero'
import BlogInnerContent from '@/app/components/BlogInner/BlogInnerContent'
import FooterModel from '@/app/components/layout/FooterModel'

const page = () => {
  return (
    <div>
        <BlogInnerHero/>
        <BlogInnerContent/>
        <FooterModel />
    </div>
  )
}

export default page