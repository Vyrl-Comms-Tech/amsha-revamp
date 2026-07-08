import AboutHero from '@/app/components/About/AboutHero'
import Founder from '@/app/components/About/Founder'
import AboutText from '@/app/components/About/Abouttext'
import TextAndBoxes from '@/app/components/About/TextAndBoxes'
import Brands from '../components/Home/Brands'
import Facts from '../components/Home/Facts'
import MissionVision from '../components/About/MissionVision'
import BrandsStraight from '../components/About/BrandsStraight'
import Newsletter from '../components/layout/NewsLetter'

const page = () => {
  return (
    <div>
        <AboutHero/>
        <TextAndBoxes/>
        {/* <AboutText/>
        <MissionVision/> */}
        {/* <BrandsStraight/> */}
        <Founder/>
        <Facts/>
        <Newsletter/>
    </div>
  )
}

export default page
