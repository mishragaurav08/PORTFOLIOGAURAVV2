import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
// Tools carousel and social links are rendered inside the `About` section
import Projects from '../components/Projects/Projects'
import Experience from '../components/Experience/Experience'
import Thoughts from '../components/Thoughts/Thoughts'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import Seo from '../components/SEO'

export default function Home() {
  return (
    <>
      <Seo 
        title="Gaurav Mishra Portfolio | UX/UI Designer, Frontend & iOS Developer"
        description="Explore Gaurav Mishra's portfolio: UX/UI design, frontend and iOS projects, Samsung PRISM research, Infosys internship, and products like Studique, Interact, LockR, and herSpace."
        keywords="Gaurav Mishra portfolio, UX UI designer portfolio, frontend developer portfolio, iOS developer portfolio, React Next.js developer, SwiftUI projects, Samsung PRISM, Infosys internship, Studique founder, SRMIST"
        canonicalUrl="https://gauravmishra.dev"
      />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="thoughts">
        <Thoughts />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  )
}
