import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { restaurantConfig } from '../data/config';

export const Testimonials = () => {
  const { t } = useLanguage();
  const { testimonials, brand } = restaurantConfig;

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#0d0d0d] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6600]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Orange Accent Bars (matches mockup) */}
        <div className="flex items-center justify-center gap-4 mb-4 text-center">
          <div className="w-10 sm:w-16 h-1 bg-[#FF6600] rounded-full" />
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase">
            {t({ en: 'WHAT OUR CUSTOMERS SAY', pt: 'O QUE NOSSOS CLIENTES DIZEM' })}
          </h2>
          <div className="w-10 sm:w-16 h-1 bg-[#FF6600] rounded-full" />
        </div>

        <p className="text-center text-gray-400 max-w-lg mx-auto text-xs sm:text-sm font-sans mb-14">
          {t({
            en: 'Over 1,400+ five-star reviews across Google, Yelp, and Uber Eats.',
            pt: 'Mais de 1.400 avaliações 5 estrelas no Google, Yelp e plataformas de entrega.',
          })}
        </p>

        {/* 3 Review Cards Grid (Matches mockup!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#FF6600]/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_25px_rgba(255,102,0,0.15)] group relative"
            >
              <div>
                {/* 5 Yellow Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-200 text-sm sm:text-base font-sans italic leading-relaxed mb-6">
                  "{t(item.quote)}"
                </p>
              </div>

              {/* Author Info with Avatar */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#222222]">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#FF6600]/60 shrink-0 bg-[#222222]">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-subheading font-bold text-white text-sm">
                    — {item.name}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-sans">
                    {item.location} • {t({ en: 'Verified Diner', pt: 'Cliente Verificado' })}
                  </span>
                </div>
              </div>

              {/* Decorative Subtle Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 pointer-events-none group-hover:text-[#FF6600]/10 transition-colors" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

