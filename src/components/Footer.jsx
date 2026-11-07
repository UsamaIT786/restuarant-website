import React from 'react';
import { Phone, Mail, Instagram, Facebook, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { restaurantConfig } from '../data/config';

export const Footer = () => {
  const { t } = useLanguage();
  const { brand, footer, navLinks } = restaurantConfig;

  return (
    <footer id="contact" className="bg-[#080808] border-t border-[#1e1e1e] pt-16 pb-24 sm:pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid (Matches mockup structure!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1c1c1c]">
          
          {/* Col 1: Brand & Logo (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#161616] border border-[#FF6600]/40 p-0.5">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-heading text-3xl text-white tracking-wider block leading-none">
                  {brand.name}
                </span>
                <span className="text-[11px] font-subheading text-[#FF6600] tracking-wide uppercase font-semibold">
                  {t(brand.tagline)}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans text-gray-400 leading-relaxed max-w-sm">
              {t(footer.brandBio)}
            </p>
          </div>

          {/* Col 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-subheading font-bold text-white text-sm uppercase tracking-wider">
              {t({ en: 'Quick Links', pt: 'Links Rápidos' })}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="hover:text-[#FF6600] transition-colors"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-subheading font-bold text-white text-sm uppercase tracking-wider">
              {t({ en: 'Contact', pt: 'Contato' })}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6600] shrink-0" />
                <a href={`tel:${footer.contactInfo.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white transition-colors">
                  {footer.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#FF6600] shrink-0" />
                <a href="https://instagram.com/mrburdog" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {footer.contactInfo.instagram}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6600] shrink-0" />
                <a href={`mailto:${footer.contactInfo.email}`} className="hover:text-white transition-colors">
                  {footer.contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Opening Hours & Socials (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-2">
              <h4 className="font-subheading font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6600]" />
                <span>{t({ en: 'Opening Hours', pt: 'Horário de Funcionamento' })}</span>
              </h4>
              <div className="space-y-1 text-xs font-sans">
                {footer.hours.map((h, i) => (
                  <div key={i} className="flex justify-between text-gray-400">
                    <span>{t(h.days)}:</span>
                    <span className="text-gray-200 font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Us Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-subheading uppercase font-bold text-gray-400 block mb-2 tracking-wider">
                {t({ en: 'Follow Us', pt: 'Siga-nos' })}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/mrburdog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#181818] hover:bg-[#FF6600] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/mrburdog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#181818] hover:bg-[#FF6600] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com/@mrburdog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#181818] hover:bg-[#FF6600] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 text-xs font-black"
                  aria-label="TikTok"
                >
                  TT
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-sans gap-4">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 transition-colors cursor-pointer">
              {t({ en: 'Privacy Policy', pt: 'Política de Privacidade' })}
            </span>
            <span>•</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">
              {t({ en: 'Terms of Service', pt: 'Termos de Uso' })}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

