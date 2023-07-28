import { NextPage } from "next"
import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/Footer'
import LandingPageContent from '../components/landingPageContent/landingPageContent'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebaseConfig"
import { useEffect } from "react";
import { useRouter } from "next/router"
import LoadingScreen from "../components/loading/loadingScreen"

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user && user.emailVerified) router.push('/dashboard');
  }, [user]);

  if (loading) return <LoadingScreen />

  return (
    <>
      <Head>
        <title>Medi | Home</title>
        <link rel="icon" href="/logo.svg" />
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
