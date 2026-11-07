import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { restaurantConfig } from '../data/config';

export const InstagramCarousel = () => {
  const { t } = useLanguage();
  const { instagram } = restaurantConfig;
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.7;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-subheading font-bold text-[#FF6600] uppercase tracking-wider mb-1">
              <Instagram className="w-4 h-4" />
              <span>{instagram.handle}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-wider">
              {t(instagram.title)}
            </h2>
          </div>

          {/* Controls & Follow CTA */}
          <div className="flex items-center gap-3">
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1c1c1c] hover:bg-[#FF6600] text-white border border-[#333333] hover:border-[#FF6600] font-subheading text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-full transition-all duration-300 shadow-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>{t({ en: 'Follow Us', pt: 'Seguir' })}</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-[#181818] hover:bg-[#252525] border border-[#2a2a2a] text-white flex items-center justify-center transition-colors"
                aria-label="Previous photos"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-[#181818] hover:bg-[#252525] border border-[#2a2a2a] text-white flex items-center justify-center transition-colors"
                aria-label="Next photos"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {instagram.images.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -4 }}
              className="relative shrink-0 w-64 sm:w-72 aspect-square rounded-2xl overflow-hidden snap-start bg-[#161616] border border-[#262626] group cursor-pointer"
            >
              <img
                src={post.src}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Dark Overlay with Details */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between">
                  <Instagram className="w-5 h-5 text-[#FF6600]" />
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" /> {post.likes}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-sans text-gray-200 line-clamp-2 mb-2">
                    {post.caption}
                  </p>
                  <span className="text-[10px] font-subheading text-[#FF6600] font-bold tracking-wider uppercase">
                    View on Instagram →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

