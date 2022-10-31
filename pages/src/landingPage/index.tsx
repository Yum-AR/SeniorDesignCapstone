import React from 'react';
import Head from 'next/head';
import CTA from './components/CTA';
import PhotoOptions from './components/PhotoOptions';
import Footer from './components/Footer';
import Features from './components/Features';
import HeroSection from './components/HeroSection';

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
