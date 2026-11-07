import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ComboBanner } from './components/ComboBanner';
import { MenuCategories } from './components/MenuCategories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Locations } from './components/Locations';
import { AboutStory } from './components/AboutStory';
import { OrderOnline } from './components/OrderOnline';
import { Testimonials } from './components/Testimonials';
import { InstagramCarousel } from './components/InstagramCarousel';
import { Footer } from './components/Footer';
import { FloatingMobileButton } from './components/FloatingMobileButton';
import { OrderModal } from './components/OrderModal';
import { PitchDemoBar } from './components/PitchDemoBar';
import { useCart } from './context/CartContext';
import { useLanguage } from './context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const App = () => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const { lastAddedItem, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FF6600] selection:text-white relative">
      {/* Pitch Demo Bar for Presentations */}
      <PitchDemoBar />

      {/* Top Sticky Navbar */}
      <Navbar />

      {/* Hero Section with Parallax Scroll & Interactive Showcase */}
      <Hero />

      {/* Make It a Meal Combo Banner Strip */}
      <ComboBanner />

      {/* Menu Categories with Interactive Jump */}
      <MenuCategories
        selectedCategory={activeCategoryFilter}
        onSelectCategory={(categoryId) => setActiveCategoryFilter(categoryId)}
      />

      {/* Featured Products with Lightbox Modal & Quick Add */}
      <FeaturedProducts
        activeCategoryFilter={activeCategoryFilter}
        setActiveCategoryFilter={setActiveCategoryFilter}
      />

      {/* Side-by-Side: Our Locations & Our Story (Matches Reference Mockup) */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] bg-[#FF6600]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left: Our Locations */}
            <div className="lg:col-span-5 flex flex-col">
              <Locations />
            </div>

            {/* Right: Our Story */}
            <div className="lg:col-span-7 flex flex-col">
              <AboutStory />
            </div>
          </div>
        </div>
      </section>

      {/* Order Online Now */}
      <OrderOnline />

      {/* Testimonials */}
      <Testimonials />

      {/* Instagram Carousel Slider */}
      <InstagramCarousel />

      {/* Multi-Column Footer */}
      <Footer />

      {/* Mobile Floating Action Button (FAB) */}
      <FloatingMobileButton />

      {/* Order / Cart Modal Drawer */}
      <OrderModal />

      {/* Global Added Item Toast Notification */}
      <AnimatePresence>
        {lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#161616] border border-[#FF6600] text-white p-4 rounded-2xl shadow-[0_4px_30px_rgba(255,102,0,0.45)] flex items-center gap-3.5 max-w-sm backdrop-blur-md"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF6600]/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#FF6600]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white font-subheading truncate">
                {lastAddedItem.title}
              </div>
              <div className="text-[11px] text-gray-400 font-sans">
                {t({ en: 'Added to your order bag!', pt: 'Adicionado à sua sacola!' })}
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#FF6600] hover:bg-[#FF771A] text-white font-subheading text-[10px] uppercase font-bold tracking-wider px-3.5 py-2 rounded-lg transition-colors shrink-0 shadow-sm"
            >
              {t({ en: 'View', pt: 'Ver' })}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
