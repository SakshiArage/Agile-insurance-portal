import HeroSection from '../components/HeroSection'
import Status from '../components/Status'
import Testimonials from '../components/Testimonial'
import ChoiceUS from '../components/ChoiceUS'
import AboutUs from '../components/AboutUs'

// Homepage section order. Reorder, add, or remove sections here.
const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Status />
      <AboutUs />
      <ChoiceUS />
      <Testimonials />
    </div>
  )
}

export default LandingPage
