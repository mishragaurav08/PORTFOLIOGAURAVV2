import Head from 'next/head'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Contact />
      <Footer />
    </>
  )
}
