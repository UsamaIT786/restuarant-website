import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Utensils, Flame, Sparkles, Coffee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { restaurantConfig } from '../data/config';

export const Hero = () => {
  const { t } = useLanguage();
  const { hero } = restaurantConfig;

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-28 pb-12 lg:pt-28 lg:pb-16 flex items-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* High-Performance GPU Ambient Glow (No heavy CSS blur filters) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,102,0,0.15),transparent)] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,102,0,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-checkered-dark opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Authentic Brazilian Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left z-20"
          >
            {/* Main Headline (Matches reference design) */}
            <h1 className="flex flex-col text-white leading-[0.95] tracking-tight font-heading">
              <span className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                {t(hero.titlePrefix)}
              </span>
              <span className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#FF6600] tracking-wide my-1 filter drop-shadow-[0_2px_15px_rgba(255,102,0,0.4)] transform -rotate-1 origin-left">
                {t(hero.titleHighlight)}
              </span>
              <span className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                {t(hero.titleSuffix)}
              </span>
            </h1>

            {/* Quick Category Icons Row (Burgers, Hot Dogs, Snacks, Drinks) */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 sm:mt-8">
              <a href="#burgers" className="flex flex-col items-center gap-1.5 text-gray-300 hover:text-[#FF6600] transition-colors group">
                <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">🍔</span>
                <span className="text-xs font-subheading font-bold uppercase tracking-wider">{t({ en: 'Burgers', pt: 'Burgers' })}</span>
              </a>

              <span className="text-gray-700">|</span>

              <a href="#hotdogs" className="flex flex-col items-center gap-1.5 text-gray-300 hover:text-[#FF6600] transition-colors group">
                <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">🌭</span>
                <span className="text-xs font-subheading font-bold uppercase tracking-wider">{t({ en: 'Hot Dogs', pt: 'Hot Dogs' })}</span>
              </a>

              <span className="text-gray-700">|</span>

              <a href="#snacks" className="flex flex-col items-center gap-1.5 text-gray-300 hover:text-[#FF6600] transition-colors group">
                <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">🍟</span>
                <span className="text-xs font-subheading font-bold uppercase tracking-wider">{t({ en: 'Snacks', pt: 'Petiscos' })}</span>
              </a>

              <span className="text-gray-700">|</span>

              <a href="#drinks" className="flex flex-col items-center gap-1.5 text-gray-300 hover:text-[#FF6600] transition-colors group">
                <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">🥤</span>
                <span className="text-xs font-subheading font-bold uppercase tracking-wider">{t({ en: 'Drinks', pt: 'Bebidas' })}</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 sm:mt-9">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6600] hover:bg-[#FF771A] text-white font-subheading font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-orange-sm"
              >
                <span>{t(hero.ctaPrimary)}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#order-online"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/60 hover:bg-black text-white border border-white/30 hover:border-white/60 font-subheading font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                <span>{t(hero.ctaSecondary)}</span>
                <ShoppingBag className="w-4 h-4 text-[#FF6600]" />
              </a>
            </div>

            {/* Subtitle / Description */}
            <p className="mt-6 text-gray-400 text-xs sm:text-sm max-w-lg mx-auto lg:mx-0 font-sans leading-relaxed">
              {t(hero.subtitle)}
            </p>
          </motion.div>

          {/* Right Column: Pure Hero Food Visual (Fixed: No clutter, no overlapping heading!) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            {/* Visual Container matching reference mockup */}
            <div className="relative w-full max-w-lg lg:max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-[#111111]">
              <img
                src="/images/hero-burger-right.jpg"
                alt="Mr. Burdog Authentic Brazilian Burger and Hot Dog"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-102"
              />

              {/* Subtle edge gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
