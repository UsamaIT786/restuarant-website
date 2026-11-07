import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame, History, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { restaurantConfig } from '../data/config';

export const AboutStory = () => {
  const { t } = useLanguage();
  const { story } = restaurantConfig;
  const [showFullStory, setShowFullStory] = useState(false);
  const [activeImage, setActiveImage] = useState('interior');

  return (
    <div id="story" className="h-full flex flex-col justify-between">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-1 bg-[#FF6600] rounded-full" />
        <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wider uppercase">
          {t({ en: 'OUR STORY', pt: 'NOSSA HISTÓRIA' })}
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-[#141414] border border-[#262626] p-6 sm:p-7 flex flex-col justify-between shadow-xl flex-1 hover:border-[#FF6600]/40 transition-colors"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Text & Narrative */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[#FF6600] text-[11px] font-subheading font-black uppercase tracking-widest block mb-1">
                {t(story.badge)}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-white leading-tight">
                {t(story.headline)}
              </h3>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
              {t({
                en: "Mr. Burdog was born in Brazil in 2017, from a dream to bring the best of Brazilian street food to the world. Today, we are in Orlando and Pompano Beach, serving burgers, hot dogs and snacks made with quality ingredients, bold flavors and a lot of passion.",
                pt: "O Mr. Burdog nasceu no Brasil em 2017, do sonho de levar o melhor da comida de rua brasileira para o mundo. Hoje estamos em Orlando e Pompano Beach, servindo hambúrgueres, lanches e petiscos feitos com ingredientes de primeira, sabor marcante e muita paixão."
              })}
            </p>

            <AnimatePresence>
              {showFullStory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-3 text-gray-400 text-xs font-sans border-t border-[#222222]"
                >
                  <p>{t(story.paragraphs[1])}</p>
                  <p>{t(story.paragraphs[2])}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <button
                onClick={() => setShowFullStory(!showFullStory)}
                className="inline-flex items-center gap-2 border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white font-subheading text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-full transition-all duration-300"
              >
                <span>{showFullStory ? t({ en: 'Read Less', pt: 'Ler Menos' }) : t({ en: 'Read Our Full Story', pt: 'Conheça Mais' })}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showFullStory ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Atmosphere Image with Visual Switcher */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-[#0d0d0d]">
              <img
                src={activeImage === 'interior' ? story.image : '/images/story-grill.jpg'}
                alt="Mr. Burdog Restaurant Atmosphere"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 pointer-events-none" />
              
              {/* Image Switcher Pills */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                <button
                  onClick={() => setActiveImage('interior')}
                  className={`text-[10px] font-subheading font-bold px-2.5 py-1 rounded-full transition-all ${
                    activeImage === 'interior'
                      ? 'bg-[#FF6600] text-white shadow-sm'
                      : 'bg-black/70 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  Interior
                </button>
                <button
                  onClick={() => setActiveImage('grill')}
                  className={`text-[10px] font-subheading font-bold px-2.5 py-1 rounded-full transition-all ${
                    activeImage === 'grill'
                      ? 'bg-[#FF6600] text-white shadow-sm'
                      : 'bg-black/70 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  Chapa
                </button>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-subheading text-white">
                <span className="font-bold flex items-center gap-1.5 text-xs">
                  <Flame className="w-3.5 h-3.5 text-[#FF6600]" />
                  {activeImage === 'interior' ? 'Mr. Burdog Orlando Dining Room' : 'Sizzling on the Chapa'}
                </span>
                <span className="text-gray-400 text-[10px]">Since 2017</span>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Animated Timeline */}
        <div className="mt-8 pt-6 border-t border-[#222222]">
          <div className="text-[11px] font-subheading font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <History className="w-4 h-4 text-[#FF6600]" />
            <span>{t({ en: 'Our Milestones & Expansion', pt: 'Nossos Marcos & Expansão' })}</span>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6600] via-amber-500 to-[#FF6600] -translate-y-1/2 z-0 opacity-70" />

            {/* Timeline Milestones */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
              {story.timeline.map((step) => (
                <div
                  key={step.year}
                  className="bg-[#1c1c1c] border border-[#2a2a2a] p-3 rounded-2xl text-center group hover:border-[#FF6600] transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="font-heading text-xl sm:text-2xl text-[#FF6600] block leading-none">
                    {step.year}
                  </span>
                  <span className="text-xs font-subheading font-bold text-white block mt-1 leading-tight">
                    {t(step.title)}
                  </span>
                  <span className="text-[10px] text-gray-400 font-sans block mt-1 line-clamp-2">
                    {t(step.desc)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
