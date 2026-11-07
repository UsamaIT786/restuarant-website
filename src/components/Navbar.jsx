import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Globe, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { restaurantConfig } from '../data/config';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { brand, navLinks } = restaurantConfig;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['hero', 'menu', 'favorites', 'story', 'locations', 'reviews', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#262626] py-2 shadow-2xl'
          : 'bg-[#0d0d0d]/80 backdrop-blur-sm py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#161616] border border-[#FF6600]/40 p-0.5 group-hover:border-[#FF6600] transition-colors duration-300 shadow-orange-sm">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl sm:text-3xl text-white tracking-wider leading-none group-hover:text-[#FF6600] transition-colors">
                {brand.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-subheading text-[#9ca3af] tracking-tight uppercase">
                {t(brand.tagline)}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || (link.id === 'home' && activeSection === 'hero');
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-subheading font-medium tracking-wide transition-all duration-200 relative py-1 ${
                    isActive ? 'text-[#FF6600]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t(link.label)}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6600] rounded-full shadow-[0_0_8px_#FF6600]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher, Cart, & Order Button */}
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-[#1a1a1a] p-1 rounded-full border border-[#2e2e2e] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-[#FF6600] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  language === 'pt'
                    ? 'bg-[#FF6600] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                PT
              </button>
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2e2e2e] rounded-full text-white transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#FF6600]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0d0d0d]"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Order Online Button */}
            <a
              href="#order-online"
              className="relative inline-flex items-center gap-2 bg-[#FF6600] hover:bg-[#FF771A] text-white font-subheading text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-orange-sm hover:shadow-orange-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t({ en: 'Order Online', pt: 'Pedir Online' })}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Cart & Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-[#1a1a1a] border border-[#2e2e2e] rounded-full text-white"
            >
              <ShoppingBag className="w-4 h-4 text-[#FF6600]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF6600]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#111111] border-b border-[#262626] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {/* Language Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Globe className="w-4 h-4 text-[#FF6600]" />
                  <span>{t({ en: 'Language', pt: 'Idioma' })}</span>
                </div>
                <div className="flex items-center bg-[#1a1a1a] p-1 rounded-full border border-[#2e2e2e]">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      language === 'en' ? 'bg-[#FF6600] text-white' : 'text-gray-400'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('pt')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      language === 'pt' ? 'bg-[#FF6600] text-white' : 'text-gray-400'
                    }`}
                  >
                    PT
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col space-y-3 pt-1">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-subheading font-medium text-gray-200 hover:text-[#FF6600] transition-colors py-1 flex items-center justify-between"
                  >
                    <span>{t(link.label)}</span>
                    <span className="text-gray-600">→</span>
                  </a>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-2">
                <a
                  href="#order-online"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#FF6600] hover:bg-[#FF771A] text-white font-subheading text-sm uppercase tracking-wider font-bold py-3 rounded-full shadow-orange-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t({ en: 'Order Online Now', pt: 'Pedir Online Agora' })}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

