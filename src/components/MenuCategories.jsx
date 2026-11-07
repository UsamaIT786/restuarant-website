import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { restaurantConfig } from '../data/config';

export const MenuCategories = ({ onSelectCategory, selectedCategory }) => {
  const { t } = useLanguage();
  const { categories } = restaurantConfig;

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#0d0d0d] relative">
      {/* Decorative ambient background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF6600]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Orange Accent Bars (matches mockup) */}
        <div className="flex items-center justify-center gap-4 mb-14 text-center">
          <div className="w-10 sm:w-16 h-1 bg-[#FF6600] rounded-full" />
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase">
            {t({ en: 'OUR MENU', pt: 'NOSSO CARDÁPIO' })}
          </h2>
          <div className="w-10 sm:w-16 h-1 bg-[#FF6600] rounded-full" />
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.id);
                  }
                  const favSection = document.getElementById('favorites');
                  if (favSection) {
                    favSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group cursor-pointer rounded-2xl p-3 sm:p-4 bg-[#141414] border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                  isSelected
                    ? 'border-[#FF6600] shadow-[0_0_20px_rgba(255,102,0,0.3)] scale-[1.03]'
                    : 'border-[#262626] hover:border-[#FF6600] hover:shadow-[0_0_20px_rgba(255,102,0,0.25)] hover:scale-[1.02]'
                }`}
              >
                {/* Image Container with Dark Checkered Backdrop */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-checkered-dark mb-3">
                  <img
                    src={cat.image}
                    alt={t(cat.name)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2">
                    <span className="w-7 h-7 rounded-full bg-[#FF6600] text-white flex items-center justify-center shadow-md">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Category Title */}
                <div className="text-center">
                  <h3 className="font-heading text-lg sm:text-xl text-white group-hover:text-[#FF6600] transition-colors uppercase tracking-wide leading-tight">
                    {t(cat.name)}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-sans block mt-0.5">
                    {cat.count}
                  </span>
                </div>

                {/* Orange bottom highlight indicator on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

