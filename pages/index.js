import Head from 'next/head'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
// Tools carousel and social links are rendered inside the `About` section
import Projects from '../components/Projects/Projects'
import Experience from '../components/Experience/Experience'
import Thoughts from '../components/Thoughts/Thoughts'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Gaurav</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
        <Experience limit={3} />
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
