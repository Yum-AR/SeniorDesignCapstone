import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/Sections/HeroSection';
import CTA from '../components/Sections/CTA';
import Features from '../components/Sections/Features';
import Footer from '../components/Sections/Footer';
import PhotoOptions from '../components/Sections/PhotoOptions';

const Home: React.FC = () =>
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
  </>;
export default Home;
