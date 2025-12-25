import Head from 'next/head'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
// Tools carousel and social links are rendered inside the `About` section
import Projects from '../components/Projects/Projects'
import Experience from '../components/Experience/Experience'

export default function Home() {
  return (
    <>
      <Head>
        <title>Gaurav - Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Hero />
      <About />
      <Projects />
      <Experience />
    </>
  )
}
