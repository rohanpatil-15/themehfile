import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import ReviewsSection from "@/components/ReviewsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full overflow-hidden">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ReviewsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
