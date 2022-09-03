import { useState } from 'react'
import Head from 'next/head'
import HeroSection from '../components/Sections/HeroSection'
import CTA from '../components/Sections/CTA'
import Features from '../components/Sections/Features'
import Footer from '../components/Sections/Footer'
import PhotoOptions from '../components/Sections/PhotoOptions'
import FeaturedSection from '../components/Sections/FeaturedPhoto'

import { useAuth } from '../firebase/AuthContext'

export default function Home() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="">
        <Head>
          <title>Yummr</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        </Head>
        <main className="">
          <HeroSection />
          <PhotoOptions />
          <Features />
          <CTA />
        </main>

        <Footer />
      </div>
    </>
  )
}
