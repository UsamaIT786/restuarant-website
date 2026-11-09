import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  Copy,
  Check,
  ExternalLink,
  Search,
  Star,
  LocateFixed,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { restaurantConfig } from '../data/config';

/**
 * Utility: Distance in km between two coords (Haversine)
 */
const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Utility: is store open now based on simple open/close hours "HH:MM - HH:MM"
 * Falls back to true if hours aren't parseable.
 */
const parseHours = (hoursText) => {
  if (!hoursText) return null;
  const match = hoursText.match(
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?\s*[-–]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i
  );
  if (!match) return null;
  const to24 = (h, m = 0, ampm) => {
    let hour = parseInt(h, 10);
    if (ampm) {
      const ap = ampm.toUpperCase();
      if (ap === 'PM' && hour !== 12) hour += 12;
      if (ap === 'AM' && hour === 12) hour = 0;
    }
    return hour * 60 + parseInt(m || 0, 10);
  };
  return {
    open: to24(match[1], match[2], match[3]),
    close: to24(match[4], match[5], match[6]),
  };
};

const isOpenNow = (hoursText) => {
  const parsed = parseHours(hoursText);
  if (!parsed) return true;
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (parsed.close < parsed.open) {
    // Crosses midnight
    return minutes >= parsed.open || minutes < parsed.close;
  }
  return minutes >= parsed.open && minutes < parsed.close;
};

/* -------------------------- Subcomponents -------------------------- */

const StatusBadge = ({ open, t }) => (
  <span
    className={[
      'inline-flex items-center gap-1.5 text-[10px] font-subheading font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-sm transition-colors',
      open
        ? 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30'
        : 'bg-red-950/70 text-red-400 border-red-500/30',
    ].join(' ')}
    aria-label={open ? 'Open now' : 'Closed'}
  >
    <span
      className={[
        'w-1.5 h-1.5 rounded-full',
        open ? 'bg-emerald-400 animate-pulse' : 'bg-red-400',
      ].join(' ')}
    />
    {open
      ? t({ en: 'Open Now', pt: 'Aberto' })
      : t({ en: 'Closed', pt: 'Fechado' })}
  </span>
);

const Toast = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    transition={{ duration: 0.25 }}
    role="status"
    aria-live="polite"
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#1a1a1a] border border-[#FF6600]/40 text-white text-sm px-4 py-3 rounded-xl shadow-2xl shadow-[#FF6600]/20"
  >
    <Check className="w-4 h-4 text-emerald-400" />
    <span className="font-sans">{message}</span>
    <button
      onClick={onClose}
      className="ml-2 text-gray-400 hover:text-white transition-colors"
      aria-label="Dismiss notification"
    >
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gradient-to-br from-[#1e1e1e] to-[#141414]`}
      >
        <MapPin className="w-10 h-10 text-[#333]" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

/* --------------------------- Main Component --------------------------- */

export const Locations = () => {
  const { t } = useLanguage();
  const { locations = [] } = restaurantConfig;

  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState(null);
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleCopyAddress = useCallback(
    async (id, address) => {
      try {
        await navigator.clipboard.writeText(address);
        setCopiedId(id);
        setToast(t({ en: 'Address copied!', pt: 'Endereço copiado!' }));
        setTimeout(() => setCopiedId(null), 2000);
      } catch {
        setToast(t({ en: 'Copy failed', pt: 'Falha ao copiar' }));
      }
    },
    [t]
  );

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setLocError(t({ en: 'Geolocation not supported', pt: 'Geolocalização indisponível' }));
      return;
    }
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        setToast(t({ en: 'Location detected!', pt: 'Localização detectada!' }));
      },
      () => {
        setLocError(t({ en: 'Permission denied', pt: 'Permissão negada' }));
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [t]);

  // Enrich + sort locations with distance
  const enrichedLocations = useMemo(() => {
    return locations
      .map((loc) => {
        const distance = userCoords
          ? getDistanceKm(
              userCoords.lat,
              userCoords.lng,
              loc.lat ?? loc.latitude,
              loc.lng ?? loc.longitude
            )
          : null;
        return {
          ...loc,
          _open: isOpenNow(t(loc.hours)),
          _distance: distance,
        };
      })
      .sort((a, b) => {
        if (a._distance == null && b._distance == null) return 0;
        if (a._distance == null) return 1;
        if (b._distance == null) return -1;
        return a._distance - b._distance;
      });
  }, [locations, userCoords, t]);

  const filteredLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enrichedLocations.filter((loc) => {
      const matchesQuery =
        !q ||
        loc.city?.toLowerCase().includes(q) ||
        loc.address?.toLowerCase().includes(q);
      const matchesFilter = !filterOpen || loc._open;
      return matchesQuery && matchesFilter;
    });
  }, [enrichedLocations, query, filterOpen]);

  return (
    <div id="locations" className="h-full flex flex-col">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-1 bg-gradient-to-r from-[#FF6600] to-[#FFAA00] rounded-full" />
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wider uppercase">
            {t({ en: 'OUR LOCATIONS', pt: 'NOSSAS UNIDADES' })}
          </h2>
          <span className="ml-1 text-xs font-sans text-gray-500 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-2.5 py-0.5">
            {filteredLocations.length}
          </span>
        </div>

        {/* Locate Me */}
        <button
          onClick={handleLocate}
          disabled={locating}
          className="inline-flex items-center justify-center gap-2 text-xs font-subheading uppercase tracking-wider font-bold text-gray-300 hover:text-[#FF6600] bg-[#141414] hover:bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#FF6600]/50 rounded-xl px-3.5 py-2.5 transition-all disabled:opacity-60"
          aria-label="Detect my location"
        >
          {locating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LocateFixed className="w-3.5 h-3.5" />
          )}
          <span>
            {locating
              ? t({ en: 'Locating…', pt: 'Localizando…' })
              : userCoords
              ? t({ en: 'Update Location', pt: 'Atualizar Local' })
              : t({ en: 'Near Me', pt: 'Perto de Mim' })}
          </span>
        </button>
      </div>

      {/* ---------- Toolbar ---------- */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t({ en: 'Search by city or address…', pt: 'Buscar por cidade ou endereço…' })}
            className="w-full pl-10 pr-10 py-2.5 bg-[#141414] border border-[#2a2a2a] focus:border-[#FF6600]/60 focus:ring-2 focus:ring-[#FF6600]/20 rounded-xl text-sm text-white placeholder:text-gray-500 font-sans outline-none transition-all"
            aria-label="Search locations"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setFilterOpen((v) => !v)}
          className={[
            'inline-flex items-center justify-center gap-2 text-xs font-subheading uppercase tracking-wider font-bold px-3.5 py-2.5 rounded-xl border transition-all',
            filterOpen
              ? 'bg-[#FF6600]/10 border-[#FF6600]/50 text-[#FF6600]'
              : 'bg-[#141414] border-[#2a2a2a] text-gray-300 hover:text-white hover:border-[#333]',
          ].join(' ')}
          aria-pressed={filterOpen}
        >
          <span
            className={[
              'w-1.5 h-1.5 rounded-full',
              filterOpen ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500',
            ].join(' ')}
          />
          {t({ en: 'Open Only', pt: 'Só Abertos' })}
        </button>
      </div>

      {/* Error inline */}
      <AnimatePresence>
        {locError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 text-xs text-red-400 bg-red-950/40 border border-red-500/30 rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {locError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Grid ---------- */}
      {filteredLocations.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16 border border-dashed border-[#2a2a2a] rounded-3xl">
          <MapPin className="w-10 h-10 text-[#333] mb-3" />
          <p className="text-gray-400 font-sans text-sm">
            {t({ en: 'No locations found', pt: 'Nenhuma unidade encontrada' })}
          </p>
          <button
            onClick={() => {
              setQuery('');
              setFilterOpen(false);
            }}
            className="mt-4 text-xs text-[#FF6600] hover:underline font-subheading uppercase tracking-wider font-bold"
          >
            {t({ en: 'Reset filters', pt: 'Limpar filtros' })}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
          <AnimatePresence mode="popLayout">
            {filteredLocations.map((loc, idx) => {
              const open = loc._open;
              return (
                <motion.div
                  key={loc.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="relative rounded-3xl bg-gradient-to-br from-[#171717] to-[#101010] border border-[#262626] hover:border-[#FF6600]/70 transition-colors duration-300 p-5 flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-[0_10px_40px_rgba(255,102,0,0.22)]"
                >
                  {/* Decorative glow */}
                  <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-[#FF6600]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="w-4 h-4 text-[#FF6600] shrink-0" />
                        <h3 className="font-heading text-2xl text-white group-hover:text-[#FF6600] transition-colors uppercase tracking-wide truncate">
                          {loc.city}
                        </h3>
                      </div>
                      <StatusBadge open={open} t={t} />
                    </div>

                    {/* Distance pill */}
                    {loc._distance != null && (
                      <div className="mb-2 inline-flex items-center gap-1 text-[10px] font-sans text-[#FF6600] bg-[#FF6600]/10 border border-[#FF6600]/30 rounded-full px-2 py-0.5">
                        <Navigation className="w-2.5 h-2.5" />
                        {loc._distance < 1
                          ? `${Math.round(loc._distance * 1000)} m`
                          : `${loc._distance.toFixed(1)} km`}
                      </div>
                    )}

                    {/* Address */}
                    <div className="flex items-start justify-between gap-2 text-gray-300 text-xs font-sans mb-3 bg-[#151515] p-2.5 rounded-xl border border-[#262626] group-hover:border-[#333] transition-colors">
                      <span className="leading-snug">{loc.address}</span>
                      <button
                        onClick={() => handleCopyAddress(loc.id, loc.address)}
                        className="text-gray-400 hover:text-[#FF6600] transition-colors p-1 shrink-0 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600]/40"
                        title={t({ en: 'Copy address', pt: 'Copiar endereço' })}
                        aria-label="Copy address"
                      >
                        {copiedId === loc.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-[#1e1e1e] border border-white/5">
                      <ImageWithFallback
                        src={loc.image}
                        alt={`${loc.city} Storefront`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      {loc.badge && (
                        <div className="absolute bottom-2.5 left-3 text-[11px] font-subheading text-white font-bold flex items-center gap-1 drop-shadow">
                          <Star className="w-3 h-3 text-[#FF6600] fill-[#FF6600]" />
                          {loc.badge}
                        </div>
                      )}
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-[#FF6600] hover:border-[#FF6600] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Open in maps"
                        title="Open in maps"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Info */}
                    <div className="space-y-1.5 text-xs text-gray-400 font-sans mb-5">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
                        <span>{t(loc.hours)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
                        <a
                          href={`tel:${loc.phone}`}
                          className="hover:text-white transition-colors truncate"
                        >
                          {loc.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative grid grid-cols-2 gap-2 mt-auto">
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#FF6600] to-[#FF7A1A] hover:from-[#FF771A] hover:to-[#FF8A33] text-white font-subheading text-xs uppercase tracking-wider font-bold py-2.5 px-3 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF6600]/25 hover:shadow-[#FF6600]/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF6600]/60"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{t({ en: 'Directions', pt: 'Rotas' })}</span>
                    </a>

                    <a
                      href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center justify-center gap-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-gray-200 hover:text-white border border-[#333333] hover:border-[#FF6600]/40 font-subheading text-xs uppercase tracking-wider font-bold py-2.5 px-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6600]/40"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FF6600]" />
                      <span>{t({ en: 'Call Store', pt: 'Ligar' })}</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};
