import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ShoppingBag, Eye, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { restaurantConfig } from '../data/config';
import { ProductDetailModal } from './ProductDetailModal';

export const FeaturedProducts = ({ activeCategoryFilter, setActiveCategoryFilter }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { featuredProducts } = restaurantConfig;

  const [addedId, setAddedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categoriesFilter = [
    { id: 'all', label: { en: 'All Items', pt: 'Cardápio Completo' } },
    { id: 'burgers', label: { en: 'Burgers', pt: 'Hambúrgueres' } },
    { id: 'hotdogs', label: { en: 'Hot Dogs', pt: 'Cachorros-Quentes' } },
    { id: 'snacks', label: { en: 'Snacks & Skewers', pt: 'Petiscos & Espetos' } },
    { id: 'sides', label: { en: 'Sides & Salgados', pt: 'Porções & Salgados' } },
    { id: 'drinks', label: { en: 'Milkshakes & Drinks', pt: 'Bebidas & Shakes' } },
    { id: 'desserts', label: { en: 'Plates & Stroganoff', pt: 'Pratos Feitos' } },
  ];

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr));
    }, 1500);
  };

  const filteredProducts =
    activeCategoryFilter && activeCategoryFilter !== 'all'
      ? featuredProducts.filter((item) => item.category === activeCategoryFilter)
      : featuredProducts;

  return (
    <section id="favorites" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FF6600]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Orange Accent Bars (matches mockup) */}
        <div className="flex items-center justify-center gap-4 mb-3 text-center">
          <div className="w-10 sm:w-16 h-1 bg-[#FF6600] rounded-full" />
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase">
            {t({ en: 'OUR FAVORITES', pt: 'NOSSOS FAVORITOS' })}
          </h2>
          <div className="w-10 sm:w-16 h-1 bg-[#FF6600] rounded-full" />
        </div>

        <p className="text-center text-gray-400 max-w-xl mx-auto text-xs sm:text-sm font-sans mb-10 leading-relaxed">
          {t({
            en: 'Click any item to view custom toppings, authentic ingredients, or customize your meal.',
            pt: 'Clique em qualquer item para ver ingredientes, acompanhamentos e personalizar seu lanche.',
          })}
        </p>

        {/* Filter Pills with Active Animated Indicator */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-12">
          {categoriesFilter.map((tab) => {
            const isActive = (activeCategoryFilter || 'all') === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`text-xs font-subheading font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#FF6600] text-white shadow-orange-sm scale-105'
                    : 'bg-[#141414] text-gray-400 hover:text-white hover:bg-[#1f1f1f] border border-[#2a2a2a]'
                }`}
              >
                {t(tab.label)}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => {
              const isJustAdded = addedId === product.id;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: (idx % 5) * 0.08 }}
                  onClick={() => setSelectedProduct(product)}
                  className="group rounded-3xl bg-[#141414] border border-[#262626] hover:border-[#FF6600] transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 hover:shadow-[0_8px_30px_rgba(255,102,0,0.25)] hover:-translate-y-1.5 cursor-pointer relative"
                >
                  <div>
                    {/* Food Photo Container */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-checkered-dark mb-4 border border-white/5">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        loading="lazy"
                      />
                      
                      {/* Product Badge */}
                      {product.badge && (
                        <div className="absolute top-2.5 left-2.5 bg-[#FF6600] text-black text-[10px] font-subheading tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow font-black">
                          {product.badge}
                        </div>
                      )}

                      {/* Quick Inspect Hover Hint */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 bg-black/80 text-white text-[11px] font-subheading font-bold px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
                          <Eye className="w-3.5 h-3.5 text-[#FF6600]" />
                          <span>{t({ en: 'View Details', pt: 'Ver Detalhes' })}</span>
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-heading text-xl sm:text-2xl text-white group-hover:text-[#FF6600] transition-colors leading-tight mb-1.5">
                      {product.title}
                    </h3>

                    {/* Product Description */}
                    <p className="text-gray-400 text-xs font-sans leading-relaxed line-clamp-2 mb-4">
                      {t(product.description)}
                    </p>
                  </div>

                  {/* Price & Quick Add to Order Button */}
                  <div className="pt-3 border-t border-[#222222] flex items-center justify-between mt-auto">
                    <span className="font-heading text-2xl text-[#FF6600] tracking-tight">
                      {product.price}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`inline-flex items-center gap-1.5 text-xs font-subheading font-bold uppercase tracking-wider px-3.5 py-2 rounded-full transition-all duration-300 ${
                        isJustAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-[#222222] hover:bg-[#FF6600] text-white hover:shadow-orange-sm active:scale-95'
                      }`}
                      title="Quick Add to Order"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t({ en: 'Added', pt: 'Pronto' })}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t({ en: 'Add', pt: 'Pedir' })}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Product Detail / Customizer Lightbox Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
