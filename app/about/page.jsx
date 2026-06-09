import AboutHero from '@/app/components/About/AboutHero'
import Founder from '@/app/components/About/Founder'
import AboutText from '@/app/components/About/Abouttext'
import Brands from '../components/Home/Brands'
import Facts from '../components/Home/Facts'

const page = () => {
  return (
    <div>
        <AboutHero/>
        <AboutText/>
        <Brands/>
        <Founder/>
        <Facts/>
    </div>
  )
}

export default page
