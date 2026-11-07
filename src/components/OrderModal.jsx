import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { restaurantConfig } from '../data/config';

export const OrderModal = () => {
  const { t } = useLanguage();
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [includeComboUpgrade, setIncludeComboUpgrade] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('orlando');

  const { locations, brand, footer } = restaurantConfig;

  const comboUpgradeFee = includeComboUpgrade ? cart.length * 4.99 : 0;
  const finalTotal = cartTotal + comboUpgradeFee;

  const handleWhatsAppCheckout = () => {
    let orderSummary = `*Novo Pedido - ${brand.name}*\n`;
    orderSummary += `*Unidade:* ${deliveryLocation === 'orlando' ? 'Orlando (I-Drive)' : 'Pompano Beach'}\n\n`;
    orderSummary += `*Itens do Pedido:*\n`;

    cart.forEach((item) => {
      orderSummary += `• ${item.quantity}x ${item.title} - $${((item.numericPrice || 0) * item.quantity).toFixed(2)}\n`;
    });

    if (includeComboUpgrade) {
      orderSummary += `\n🍟 *Upgrade Combo (Fritas + Refrigerante):* Sim (+$${comboUpgradeFee.toFixed(2)})\n`;
    }

    orderSummary += `\n*Total Estimado:* $${finalTotal.toFixed(2)}\n\n`;
    orderSummary += `Olá! Gostaria de confirmar meu pedido. Como faço para retirar ou informar o endereço de entrega?`;

    const phone = deliveryLocation === 'orlando' ? '14075907534' : '19548809210';
    const encoded = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#121212] border-l border-[#262626] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#222222] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FF6600]/20 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-[#FF6600]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-white tracking-wide">
                      {t({ en: 'YOUR ORDER', pt: 'SEU PEDIDO' })}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-sans">
                      {cart.length} {t({ en: 'item(s) selected', pt: 'item(ns) selecionados' })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#202020] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
                    <p className="text-gray-400 text-sm font-sans">
                      {t({
                        en: 'Your order bag is currently empty.',
                        pt: 'Sua sacola de pedidos está vazia.',
                      })}
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        const menu = document.getElementById('favorites');
                        if (menu) menu.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-subheading font-bold text-[#FF6600] uppercase tracking-wider hover:underline"
                    >
                      {t({ en: 'Browse Our Menu →', pt: 'Explorar Cardápio →' })}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Location Selector */}
                    <div className="bg-[#181818] p-3 rounded-xl border border-[#2a2a2a] mb-2">
                      <label className="text-[11px] font-subheading font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                        {t({ en: 'Select Pickup / Order Location:', pt: 'Unidade para Pedido:' })}
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                        <button
                          onClick={() => setDeliveryLocation('orlando')}
                          className={`py-2 px-3 rounded-lg border text-left transition-all ${
                            deliveryLocation === 'orlando'
                              ? 'bg-[#FF6600]/20 border-[#FF6600] text-white font-bold'
                              : 'bg-[#121212] border-[#2e2e2e] text-gray-400'
                          }`}
                        >
                          📍 Orlando (I-Drive)
                        </button>
                        <button
                          onClick={() => setDeliveryLocation('pompano')}
                          className={`py-2 px-3 rounded-lg border text-left transition-all ${
                            deliveryLocation === 'pompano'
                              ? 'bg-[#FF6600]/20 border-[#FF6600] text-white font-bold'
                              : 'bg-[#121212] border-[#2e2e2e] text-gray-400'
                          }`}
                        >
                          📍 Pompano Beach
                        </button>
                      </div>
                    </div>

                    {/* Cart Items */}
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#181818] p-3.5 rounded-xl border border-[#262626] flex items-center justify-between gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-lg shrink-0 bg-[#0d0d0d]"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading text-lg text-white leading-tight truncate">
                            {item.title}
                          </h4>
                          <span className="text-[#FF6600] font-heading text-base block">
                            ${((item.numericPrice || 0) * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-[#121212] border border-[#2e2e2e] rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Upsell: Make It a Combo */}
                    <div
                      onClick={() => setIncludeComboUpgrade(!includeComboUpgrade)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        includeComboUpgrade
                          ? 'bg-[#FF6600]/15 border-[#FF6600]'
                          : 'bg-[#181818] border-[#2e2e2e] hover:border-[#FF6600]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🍟🥤</span>
                        <div>
                          <div className="text-xs font-subheading font-bold text-white flex items-center gap-1.5">
                            <span>{t({ en: 'Upgrade All to Combos', pt: 'Transformar em Combo' })}</span>
                            <span className="text-[10px] bg-[#FF6600] text-black px-1.5 py-0.2 rounded font-black uppercase">
                              +$4.99/ea
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400 font-sans">
                            {t({ en: 'Includes crispy fries & cold soda', pt: 'Inclui fritas crocantes e refrigerante' })}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          includeComboUpgrade
                            ? 'bg-[#FF6600] border-[#FF6600] text-white'
                            : 'border-gray-500 bg-[#121212]'
                        }`}
                      >
                        {includeComboUpgrade && <span className="text-xs font-black">✓</span>}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer / Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#222222] bg-[#161616] space-y-3">
                  <div className="space-y-1 text-xs text-gray-400 font-sans">
                    <div className="flex justify-between">
                      <span>{t({ en: 'Subtotal:', pt: 'Subtotal:' })}</span>
                      <span className="text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    {includeComboUpgrade && (
                      <div className="flex justify-between text-[#FF6600]">
                        <span>{t({ en: 'Combo Upgrades:', pt: 'Upgrades de Combo:' })}</span>
                        <span>+${comboUpgradeFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-heading text-white pt-2 border-t border-[#2a2a2a]">
                      <span className="text-lg">{t({ en: 'Total Estimated:', pt: 'Total Estimado:' })}</span>
                      <span className="text-2xl text-[#FF6600]">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Primary WhatsApp Checkout Button */}
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-subheading text-xs uppercase tracking-wider font-extrabold py-3.5 rounded-full shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>{t({ en: 'Order via WhatsApp Direct', pt: 'Enviar Pedido via WhatsApp' })}</span>
                  </button>

                  {/* Quick Clear */}
                  <div className="flex justify-between items-center pt-1 text-[11px] text-gray-500 font-sans">
                    <button
                      onClick={clearCart}
                      className="hover:text-red-400 transition-colors"
                    >
                      {t({ en: 'Clear bag', pt: 'Limpar sacola' })}
                    </button>
                    <span>{t({ en: 'Direct from kitchen • No app fees', pt: 'Direto da cozinha • Sem taxas' })}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

