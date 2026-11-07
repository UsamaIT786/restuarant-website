import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Flame, Sparkles, Check, Clock, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const ProductDetailModal = ({ product, onClose }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const availableAddons = [
    { id: 'extra-bacon', name: { en: 'Crispy Hardwood Bacon', pt: 'Bacon Defumado Extra' }, price: 1.99 },
    { id: 'extra-cheese', name: { en: 'Queijo Coalho Slice', pt: 'Fatia de Queijo Coalho' }, price: 2.50 },
    { id: 'double-patty', name: { en: 'Double Beef Patty', pt: 'Carne Extra (Blend 180g)' }, price: 4.50 },
    { id: 'extra-sauce', name: { en: 'Signature Green Sauce Pot', pt: 'Potinho Molho Verde' }, price: 0.99 },
  ];

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemBasePrice = product.numericPrice || 14.99;
  const unitPrice = itemBasePrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const customizedProduct = {
      ...product,
      id: `${product.id}-${Date.now()}`,
      title: selectedAddons.length > 0 ? `${product.title} (Customized)` : product.title,
      numericPrice: unitPrice,
      price: `$${unitPrice.toFixed(2)}`,
      quantity: quantity,
      addons: selectedAddons,
    };

    addToCart(customizedProduct);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#141414] border border-[#2a2a2a] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-gray-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Hero Image */}
          <div className="relative w-full h-56 sm:h-72 bg-checkered-dark overflow-hidden shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-90" />

            {/* Badges */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              {product.badge && (
                <span className="bg-[#FF6600] text-black text-[11px] font-subheading font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              )}
              {product.calories && (
                <span className="bg-black/70 backdrop-blur-sm text-gray-300 text-[11px] font-sans px-3 py-1 rounded-full border border-white/10">
                  {product.calories}
                </span>
              )}
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222222] pb-4">
              <div>
                <h3 className="font-heading text-3xl sm:text-4xl text-white tracking-wide">
                  {product.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-sans mt-1">
                  {t(product.description)}
                </p>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <span className="font-heading text-3xl sm:text-4xl text-[#FF6600]">
                  ${unitPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-subheading font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                  {t({ en: 'Key Ingredients', pt: 'Ingredientes Principais' })}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs font-sans bg-[#1c1c1c] text-gray-300 border border-[#2e2e2e] px-3 py-1 rounded-full"
                    >
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Add-ons */}
            <div>
              <h4 className="text-xs font-subheading font-bold text-gray-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>{t({ en: 'Customize Your Order', pt: 'Personalize Seu Pedido' })}</span>
                <span className="text-[10px] text-[#FF6600] font-normal">{t({ en: 'Optional', pt: 'Opcional' })}</span>
              </h4>

              <div className="space-y-2">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#FF6600]/15 border-[#FF6600] text-white'
                          : 'bg-[#181818] border-[#262626] text-gray-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                            isChecked
                              ? 'bg-[#FF6600] border-[#FF6600] text-white font-bold'
                              : 'border-gray-500'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        <span className="text-xs font-subheading font-medium">
                          {t(addon.name)}
                        </span>
                      </div>
                      <span className="text-xs font-heading text-[#FF6600]">
                        +${addon.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer with Quantity & Add to Cart */}
          <div className="p-4 sm:p-6 border-t border-[#222222] bg-[#101010] flex items-center justify-between gap-4 shrink-0">
            {/* Quantity Controller */}
            <div className="flex items-center bg-[#181818] border border-[#2e2e2e] rounded-xl p-1 shrink-0">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-gray-400 hover:text-white"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-sm text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Order Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 font-subheading text-xs sm:text-sm uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl transition-all shadow-orange-md ${
                isAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-[#FF6600] hover:bg-[#FF771A] text-white hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t({ en: 'Added to Bag!', pt: 'Adicionado à Sacola!' })}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {t({ en: 'Add to Order', pt: 'Adicionar ao Pedido' })} • ${totalPrice.toFixed(2)}
                  </span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

