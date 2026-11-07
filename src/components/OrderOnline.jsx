import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { restaurantConfig } from '../data/config';

export const OrderOnline = () => {
  const { t } = useLanguage();
  const { setIsCartOpen } = useCart();
  const { orderOnline } = restaurantConfig;

  return (
    <section id="order-online" className="relative py-20 bg-gradient-to-r from-[#140800] via-[#220d01] to-[#140800] border-y-2 border-[#FF6600]/80 overflow-hidden shadow-2xl">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-44 bg-[#FF6600]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Fast Delivery Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#1c1c1c]/90 border border-[#FF6600]/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#FF6600] animate-pulse" />
            <span className="text-xs font-subheading font-bold text-white tracking-wider uppercase">
              {t({ en: '⚡ 25-35 Min Average Delivery In Orlando & Pompano', pt: '⚡ Entrega Média de 25-35 Min em Orlando & Pompano' })}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left: Hand Holding Phone Displaying App */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center shrink-0"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#FF6600]/30 rounded-3xl blur-2xl group-hover:bg-[#FF6600]/50 transition-all" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#FF6600]/60 shadow-2xl bg-[#0d0d0d] p-1.5 transition-transform duration-500 group-hover:scale-105">
                <img
                  src={orderOnline.phoneMockupImage}
                  alt="Order Mr. Burdog Online"
                  className="h-48 sm:h-56 md:h-64 object-contain rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Center: "ORDER ONLINE NOW!" + Hand-Drawn Arrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-2"
          >
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase leading-none drop-shadow-md">
                {t({ en: 'ORDER ONLINE', pt: 'PEÇA ONLINE' })}{' '}
                <span className="text-[#FF6600] italic font-black">
                  {t({ en: 'NOW!', pt: 'AGORA!' })}
                </span>
              </h2>

              <span className="hidden sm:inline-block text-white text-3xl md:text-4xl animate-pulse font-mono">
                ➔
              </span>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm font-sans max-w-md">
              {t(orderOnline.subtitle)}
            </p>
          </motion.div>

          {/* Right: Delivery Partner Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 shrink-0"
          >
            {/* Uber Eats */}
            <a
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#000000] hover:bg-[#1a1a1a] text-white border border-[#333333] hover:border-[#06C167] font-subheading text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 group"
            >
              <span className="text-[#06C167] font-black text-base lowercase tracking-normal">
                Uber<span className="text-white">Eats</span>
              </span>
            </a>

            {/* DoorDash */}
            <a
              href="https://www.doordash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#FF3008] hover:bg-[#E02600] text-white font-subheading text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-4 fill-white" viewBox="0 0 24 16">
                <path d="M23.111 2.89A6.689 6.689 0 0 0 17.5 0H0v3.13h17.5c2.19 0 3.966 1.777 3.966 3.967 0 2.19-1.776 3.966-3.966 3.966H6.262L10.43 16h7.07c5.247 0 9.5-4.253 9.5-9.5a9.46 9.46 0 0 0-3.889-3.61z" />
              </svg>
              <span>DoorDash</span>
            </a>

            {/* Direct Order (WhatsApp or In-App Cart) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 bg-[#1c1c1c] hover:bg-[#FF6600] text-white border border-[#FF6600] font-subheading text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-300 shadow-orange-sm hover:scale-105 active:scale-95 group"
            >
              <ShoppingBag className="w-4 h-4 text-[#FF6600] group-hover:text-white transition-colors" />
              <span>{t({ en: 'Order Online (Direct)', pt: 'Pedir Direto (Sem Taxa)' })}</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
