import AboutHero from '@/app/components/About/AboutHero'
import Founder from '@/app/components/About/Founder'
import AboutText from '@/app/components/About/Abouttext'
import Brands from '../components/Home/Brands'
import Facts from '../components/Home/Facts'
import BrandsStraight from '../components/About/BrandsStraight'

const page = () => {
  return (
    <div>
        <AboutHero/>
        <AboutText/>
        <BrandsStraight/>
        <Founder/>
        <Facts/>
    </div>
  )
}

export default page
