import { NextPage } from "next"
import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/Footer'
import LandingPageContent from '../components/landingPageContent/landingPageContent'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MedBotAI</title>
      </Head>
      <main>
        <Navbar />
        <LandingPageContent />
        <Footer />
      </main>
    </>
  )
}

export default Home
