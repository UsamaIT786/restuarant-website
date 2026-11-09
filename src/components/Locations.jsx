import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { restaurantConfig } from '../data/config';

export const Locations = () => {
  const { t } = useLanguage();
  const { locations } = restaurantConfig;
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyAddress = (id, address) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="locations" className="h-full flex flex-col justify-between">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-1 bg-[#FF6600] rounded-full" />
        <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wider uppercase">
          {t({ en: 'OUR LOCATIONS', pt: 'NOSSAS UNIDADES' })}
        </h2>
      </div>

      {/* Locations Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
        {locations.map((loc, idx) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="rounded-3xl bg-[#141414] border border-[#262626] hover:border-[#FF6600] transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-[0_8px_30px_rgba(255,102,0,0.18)]"
          >
            <div>
              {/* Header with City & Live Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6600] shrink-0" />
                  <h3 className="font-heading text-2xl text-white group-hover:text-[#FF6600] transition-colors uppercase tracking-wide">
                    {loc.city}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-subheading font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t({ en: 'Open Now', pt: 'Aberto' })}
                </span>
              </div>

              {/* Address with Copy Icon */}
              <div className="flex items-start justify-between gap-2 text-gray-300 text-xs font-sans mb-3 bg-[#1a1a1a] p-2.5 rounded-xl border border-[#2e2e2e]">
                <span className="leading-snug">{loc.address}</span>
                <button
                  onClick={() => handleCopyAddress(loc.id, loc.address)}
                  className="text-gray-400 hover:text-[#FF6600] transition-colors p-1 shrink-0"
                  title="Copy address"
                >
                  {copiedId === loc.id ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Storefront Image */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-[#1e1e1e] border border-white/5">
                <img
                  src={loc.image}
                  alt={`${loc.city} Storefront`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 left-3 text-[11px] font-subheading text-white font-bold flex items-center gap-1">
                  <span className="text-[#FF6600]">★</span> {loc.badge}
                </div>
              </div>

              {/* Operating Info */}
              <div className="space-y-1.5 text-xs text-gray-400 font-sans mb-5">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#FF6600]" />
                  <span>{t(loc.hours)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#FF6600]" />
                  <a href={`tel:${loc.phone}`} className="hover:text-white transition-colors">
                    {loc.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#FF6600] hover:bg-[#FF771A] text-white font-subheading text-xs uppercase tracking-wider font-bold py-2.5 px-3 rounded-xl transition-all duration-300 shadow-orange-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t({ en: 'Directions', pt: 'Rotas' })}</span>
              </a>

              <a
                href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center justify-center gap-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-gray-200 hover:text-white border border-[#333333] font-subheading text-xs uppercase tracking-wider font-bold py-2.5 px-3 rounded-xl transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF6600]" />
                <span>{t({ en: 'Call Store', pt: 'Ligar' })}</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
