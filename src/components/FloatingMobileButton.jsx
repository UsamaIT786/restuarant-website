import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const FloatingMobileButton = () => {
  const { t } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <button
            onClick={() => {
              const orderSection = document.getElementById('order-online');
              if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                setIsCartOpen(true);
              }
            }}
            className="w-full flex items-center justify-between bg-[#FF6600] active:bg-[#E65C00] text-white font-subheading font-bold text-sm uppercase tracking-wider py-3.5 px-6 rounded-full shadow-[0_4px_25px_rgba(255,102,0,0.55)] border border-[#ff8533]"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>
                {cartCount > 0
                  ? t({ en: `View Order (${cartCount} items)`, pt: `Ver Pedido (${cartCount} itens)` })
                  : t({ en: 'Order Online Now', pt: 'Pedir Online Agora' })}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <span>{t({ en: 'Order', pt: 'Pedir' })}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

