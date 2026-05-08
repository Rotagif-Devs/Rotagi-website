import Hero from '@/components/sheempower/Hero'
import About from '@/components/sheempower/About'
import Values from '@/components/sheempower/Values'
import RegisterInterestSection from '@/components/sheempower/Register'
import Comingsoon from '@/components/sheempower/Comingsoon'
import Where from '@/components/sheempower/Where'

const page = () => {
  return (
    <div>
        <Hero/>
        <About/>
        <Values/>
        <Where/>
        <Comingsoon/>
        <RegisterInterestSection/>
    </div>
  )
}
export default page