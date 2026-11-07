import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, Star, Flame, Sparkles, Utensils, Coffee, ChevronDown, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { restaurantConfig } from '../data/config';

export const Hero = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { hero, brand } = restaurantConfig;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms based on scroll position (works seamlessly on mobile & PC)
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.1]);

  // Interactive Hero Food Showcase
  const [selectedShowcase, setSelectedShowcase] = useState(0);

  const showcaseItems = [
    {
      id: 'mockup-burger',
      title: 'Mr. Burdog Monster Burger',
      badge: 'Signature Legend',
      image: hero.heroBurgerDetail,
      tag: 'Double Angus • Crispy Hardwood Bacon • Melted Cheddar',
      price: '$16.99',
      numericPrice: 16.99,
    },
    {
      id: 'picanha-burger',
      title: 'Picanha Burger',
      badge: '100% Picanha',
      image: '/images/burger-picanha.jpg',
      tag: 'Prime Brazilian Cut • Queijo Coalho • Chimichurri',
      price: '$17.99',
      numericPrice: 17.99,
    },
    {
      id: 'brazilian-hotdog',
      title: 'Monster Pressed Dog',
      badge: 'Street Food King',
      image: '/images/hotdog-brazilian.jpg',
      tag: 'Shredded Chicken • Sweet Corn • Batata Palha',
      price: '$12.99',
      numericPrice: 12.99,
    },
  ];

  const currentItem = showcaseItems[selectedShowcase];

  const iconMap = {
    Utensils: <Utensils className="w-3.5 h-3.5 text-[#FF6600]" />,
    Flame: <Flame className="w-3.5 h-3.5 text-[#FF6600]" />,
    Sparkles: <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" />,
    Coffee: <Coffee className="w-3.5 h-3.5 text-[#FF6600]" />,
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[95vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-between overflow-hidden bg-[#0a0a0a]"
    >
      {/* Dynamic Background Parallax Lighting */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#FF6600]/20 via-[#FF4500]/10 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"
      />
      <div className="absolute inset-0 bg-checkered-dark opacity-35 pointer-events-none" />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a] pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        
        {/* Top Live Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center lg:justify-start gap-3 mb-6 flex-wrap"
        >
          <div className="inline-flex items-center gap-2 bg-[#161616]/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-subheading font-bold text-gray-200 tracking-wider uppercase">
              {t({ en: 'Open Daily in Orlando & Pompano', pt: 'Aberto Todos os Dias em Orlando & Pompano' })}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-subheading text-[#FF6600] bg-[#FF6600]/10 border border-[#FF6600]/30 px-3 py-1.5 rounded-full font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{t({ en: 'Average Prep: 12-15 Mins', pt: 'Preparo Médio: 12-15 Min' })}</span>
          </div>
        </motion.div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call-to-Actions */}
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left z-20"
          >
            {/* Main Headline */}
            <h1 className="flex flex-col text-white leading-[0.92] tracking-tight font-heading">
              <span className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-gray-100 drop-shadow-md">
                {t(hero.titlePrefix)}
              </span>
              <span className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-[#FF6600] tracking-wider my-1 sm:my-2 filter drop-shadow-[0_4px_30px_rgba(255,102,0,0.5)]">
                {t(hero.titleHighlight)}
              </span>
              <span className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white drop-shadow-md">
                {t(hero.titleSuffix)}
              </span>
            </h1>

            {/* Quick Category Icons Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-4 mt-6 text-xs font-subheading font-semibold text-gray-300 flex-wrap"
            >
              {hero.quickCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-[#2a2a2a] hover:border-[#FF6600] hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {iconMap[cat.icon] || <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" />}
                  </span>
                  <span>{t(cat.label)}</span>
                </a>
              ))}
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-6 text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed"
            >
              {t(hero.subtitle)}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 mt-8"
            >
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FF6600] hover:bg-[#FF771A] text-white font-subheading font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-orange-md hover:shadow-orange-lg hover:scale-105 active:scale-95 group"
              >
                <span>{t(hero.ctaPrimary)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#order-online"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#141414] hover:bg-[#1f1f1f] text-white border border-white/20 hover:border-[#FF6600]/80 font-subheading font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#FF6600]" />
                <span>{t(hero.ctaSecondary)}</span>
              </a>
            </motion.div>

            {/* Trust Rating & Verified Customers Strip */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8 pt-6 border-t border-[#1e1e1e]">
              <div className="flex -space-x-2 shrink-0">
                <img src="/images/avatar-ana.jpg" alt="Ana" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" />
                <img src="/images/avatar-marcos.jpg" alt="Marcos" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" />
                <img src="/images/avatar-juliana.jpg" alt="Juliana" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">{brand.rating}</span>
                </div>
                <span className="text-[11px] text-gray-400 font-sans block">
                  {brand.reviewsCount} {t({ en: 'happy customers in Florida', pt: 'clientes felizes na Flórida' })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Scroll Parallax & Interactive Switcher */}
          <motion.div
            style={{ y: heroImageY, scale: heroImageScale }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex flex-col justify-center items-center"
          >
            {/* Glowing Neon Aura Behind Food */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6600]/30 via-orange-600/20 to-transparent rounded-full filter blur-[90px] scale-95 pointer-events-none" />

            {/* Central Food Showcase Box */}
            <div className="relative w-full max-w-lg lg:max-w-xl">
              
              {/* Main Animated Food Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 bg-[#121212] group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden"
                  >
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Fade Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-75 pointer-events-none" />

                    {/* In-Card Details Badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                      <div>
                        <span className="inline-block bg-[#FF6600] text-black text-[10px] font-subheading font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                          {currentItem.badge}
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl text-white leading-none">
                          {currentItem.title}
                        </h3>
                        <p className="text-[11px] text-gray-300 font-sans mt-0.5">
                          {currentItem.tag}
                        </p>
                      </div>

                      <div className="text-right shrink-0 ml-2">
                        <span className="font-heading text-2xl sm:text-3xl text-[#FF6600]">
                          {currentItem.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Showcase Selectors (Toggles between 3 signature items) */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {showcaseItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedShowcase(index)}
                    className={`text-[11px] font-subheading font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                      selectedShowcase === index
                        ? 'bg-[#FF6600] text-white shadow-orange-sm scale-105'
                        : 'bg-[#181818] text-gray-400 hover:text-white border border-[#2a2a2a]'
                    }`}
                  >
                    {item.badge}
                  </button>
                ))}
              </div>

              {/* Floating Badge 1: 100% Angus & Picanha */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -left-3 sm:top-2 sm:-left-6 bg-[#161616]/95 backdrop-blur-md border border-[#FF6600]/50 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 z-20 pointer-events-none"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FF6600]/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#FF6600]" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-subheading font-bold">
                    {t({ en: 'Sizzling On The Chapa', pt: 'Selado na Chapa' })}
                  </div>
                  <div className="text-xs font-bold text-white">
                    {t({ en: '100% Angus & Picanha', pt: '100% Angus & Picanha' })}
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 2: Brazilian Green Sauce */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-2 sm:bottom-12 sm:-right-6 bg-[#161616]/95 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 z-20 pointer-events-none"
              >
                <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center text-lg">
                  🇧🇷
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-subheading font-bold">
                    {t({ en: 'Made Fresh Daily', pt: 'Feito Todo Dia' })}
                  </div>
                  <div className="text-xs font-bold text-white">
                    {t({ en: 'Secret Green Sauce', pt: 'Molho Verde Original' })}
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Animated Scroll Down Indicator at Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center pt-8 pointer-events-none"
      >
        <span className="text-[10px] font-subheading font-bold text-gray-500 uppercase tracking-widest mb-1.5">
          {t({ en: 'Scroll to explore', pt: 'Role para explorar' })}
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-gray-600 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#FF6600]"
          />
        </div>
      </motion.div>
    </section>
  );
};
