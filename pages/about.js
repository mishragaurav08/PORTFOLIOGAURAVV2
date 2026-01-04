import Head from 'next/head'
import About from '../components/About/About'
import Footer from '../components/Footer/Footer'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <About />
      <Footer />
    </>
  )
}
