import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Pricing from '@/components/Pricing';
import Reviews from '@/components/Reviews';
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import MobileStickyBar from '@/components/MobileStickyBar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Pricing />
        <Reviews />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <MobileStickyBar />
    </>
  );
}
