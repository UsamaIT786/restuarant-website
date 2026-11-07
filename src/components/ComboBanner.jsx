import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Plus, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { restaurantConfig } from '../data/config';

export const ComboBanner = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { comboBanner } = restaurantConfig;
  const [comboAdded, setComboAdded] = useState(false);

  const handleAddComboDeal = () => {
    const specialCombo = {
      id: `combo-deal-${Date.now()}`,
      title: 'Monster Burger & Fries Combo + Drink',
      numericPrice: 14.99,
      price: '$14.99',
      image: comboBanner.image,
      category: 'burgers',
      badge: 'Super Combo Deal',
    };
    addToCart(specialCombo);
    setComboAdded(true);
    setTimeout(() => setComboAdded(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#120700] via-[#200c01] to-[#120700] py-8 sm:py-10 border-y-2 border-[#FF6600]/80 shadow-[0_0_40px_rgba(255,102,0,0.25)]">
      {/* Decorative ambient flares */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#FF6600]/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#FF6600]/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Fiery top & bottom accent borders */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6600] to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6600] to-transparent opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left: Make It a Meal Badge & Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
          >
            <div className="relative shrink-0">
              <div className="flex items-center gap-2 bg-[#FF6600] text-black font-heading text-3xl sm:text-4xl md:text-5xl px-6 py-2.5 rounded-2xl transform -rotate-2 shadow-2xl tracking-wide uppercase font-black">
                <Flame className="w-8 h-8 fill-black text-black animate-bounce" />
                <span>{t(comboBanner.badge)}</span>
              </div>
            </div>

            <div className="max-w-md">
              <h3 className="font-subheading font-extrabold text-white text-lg sm:text-xl md:text-2xl uppercase tracking-wide">
                {t(comboBanner.subtitle)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
                {t({
                  en: 'Includes golden crispy fries & ice-cold Coca-Cola or Guaraná Antarctica.',
                  pt: 'Inclui batatas fritas crocantes e Coca-Cola ou Guaraná Antarctica bem gelado.',
                })}
              </p>
            </div>
          </motion.div>

          {/* Center: Image Visual (Fries + Soda) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center relative py-2"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#FF6600]/30 rounded-full blur-2xl group-hover:bg-[#FF6600]/50 transition-all" />
              <div className="relative bg-[#0d0d0d]/90 p-2.5 rounded-3xl border border-[#FF6600]/50 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img
                  src={comboBanner.image}
                  alt="Mr. Burdog Combo Fries and Drink"
                  className="h-24 sm:h-28 md:h-32 object-contain rounded-xl filter drop-shadow-xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Price & Upgrade Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-5 text-center"
          >
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-[11px] sm:text-xs font-subheading font-black text-gray-400 uppercase tracking-widest">
                {t(comboBanner.pricePrefix)}
              </span>
              <span className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#FF6600] tracking-tight leading-none drop-shadow-md">
                {comboBanner.price}
              </span>
            </div>

            <button
              onClick={handleAddComboDeal}
              className={`inline-flex items-center gap-2 text-xs font-subheading uppercase tracking-wider font-bold px-7 py-4 rounded-full transition-all duration-300 shadow-orange-md hover:scale-105 active:scale-95 ${
                comboAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-[#FF6600] hover:bg-[#FF771A] text-white hover:shadow-orange-lg'
              }`}
            >
              {comboAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t({ en: 'Combo Added!', pt: 'Combo Adicionado!' })}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>{t(comboBanner.cta)}</span>
                </>
              )}
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
