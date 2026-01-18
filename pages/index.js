import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
// Tools carousel and social links are rendered inside the `About` section
import Projects from '../components/Projects/Projects'
import Experience from '../components/Experience/Experience'
import Thoughts from '../components/Thoughts/Thoughts'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import SEO from '../components/SEO'

export default function Home() {
  return (
    <>
      <SEO 
        title="Gaurav Mishra - UX/UI Designer & Frontend Developer | SRMIST Portfolio"
        description="Gaurav Mishra - UX/UI Designer and Frontend Developer at SRMIST. Co-founder of Studique (15,000+ students). Specialized in React, Next.js, and product design. View my portfolio, projects, and experience."
        keywords="Gaurav Mishra, Gaurav Mishra SRMIST, Gaurav SRM, Studique, Studique SRM, portfolio, UX designer SRMIST, frontend developer, web developer"
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
        <Experience limit={2} />
      </div>
      <div id="thoughts">
        <Thoughts limit={3} />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  )
}
