'use client'; // This component uses hooks

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';

// Inline SVG icons (thin outlined style to match your images)
const IconBars = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 6h18" />
    <path d="M3 12h18" />
    <path d="M3 18h18" />
  </svg>
);

const IconSearch = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="11" cy="11" r="6" />
    <path d="M21 21l-4.5-4.5" />
  </svg>
);

const IconHeart = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

// IconUser and IconCart removed; using Lordicon custom elements for those two icons

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenuCategory, setOpenMenuCategory] = useState(null);
  const { getTotalItems, isLoaded } = useCart();

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setShowNavbar(false); // Scrolling Down
      } else {
        setShowNavbar(true); // Scrolling Up
      }
      
      setIsScrolled(scrollTop > 0);
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); 
    }

    // Attach the event listener correctly (using the function, not a string)
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Remove the event listener correctly
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  // --- UPDATED CLASSES ---
  // Switched to mobile-first: 150px height on mobile, 90px on desktop
  // Added hover: classes
  const navClasses = `
    fixed w-full z-50 transition-all duration-700
    flex justify-between items-center
    h-[150px] md:h-[90px]
    px-6 md:px-[50px]
    ${showNavbar ? "top-0" : "-top-[150px]"}
    ${isScrolled
      ? "bg-white text-black shadow-sm border-b border-gray-200"
      : "bg-transparent text-white"}
    hover:bg-white hover:text-black hover:shadow-sm hover:border-b hover:border-gray-200
  `;
  // --- END OF UPDATE ---

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      <nav className={navClasses}>
        {/* Left Links */}
        <ul className="flex items-center gap-6">
          <li>
            <button 
              aria-label="menu" 
              className="flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 md:w-5 md:h-5" fill="currentColor" aria-hidden>
                <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" />
              </svg>
            </button>
          </li>
          <li>
            <button aria-label="search" className="flex items-center justify-center">
              <IconSearch className="w-6 h-6 md:w-5 md:h-5" />
            </button>
          </li>
        </ul>

        {/* Brand - Centered */}
        <a href="#" className={`absolute left-1/2 transform -translate-x-1/2 font-brand text-5xl md:text-3xl transition-colors duration-300 ${
          isScrolled ? 'text-[#b99b77]' : 'text-black'
        }`}>
          RajPosh
        </a>

        {/* Right Links: Home / Shop + Account & Cart icons */}
        <ul className="flex items-center gap-6">
          <li className="hidden md:block">
            <a href="#" className="text-sm md:text-base text-nav-inactive hover:text-nav-active transition-colors">Home</a>
          </li>
          
          {/* Shop Dropdown */}
          <li 
            className="hidden md:block relative group"
          >
            <button 
              className={`flex items-center gap-1 text-sm md:text-base transition-colors duration-300 group-hover:text-[#b99b77]`}
            >
              Shop
              <svg 
                className={`w-3 h-3 transition-transform duration-300 group-hover:-rotate-180`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Menu - visible only on button hover */}
            <div className="absolute top-full right-0 bg-white text-black rounded-lg shadow-xl p-8 z-50 w-[1000px] hidden group-hover:block">
                <div className="grid grid-cols-3 gap-8">
                  {/* Left: Collections */}
                  <div className="space-y-6 border-r border-gray-200 pr-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-gray-900">Poshak Collections</h3>
                        <span className="bg-[#b99b77] text-white text-xs font-medium px-2 py-1 rounded">TRENDING</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">Explore our latest hijab styles crafted for elegance, comfort, and timeless modest fashion.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-gray-900">Bridal Collections</h3>
                        <span className="bg-[#b99b77] text-white text-xs font-medium px-2 py-1 rounded">TRENDING</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">Discover elegant abayas designed for modern modesty, grace, and everyday sophistication.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-gray-900">Jwellery Collections</h3>
                        <span className="bg-[#b99b77] text-white text-xs font-medium px-2 py-1 rounded">TRENDING</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">Explore stylish modest dresses perfect for every occasion, season, and personal style.</p>
                    </div>
                  </div>

                  {/* Middle: Categories */}
                  <div className="border-r border-gray-200 pr-8">
                    <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-5">CATEGORIES</h3>
                    <ul className="space-y-3">
                      <li className="group relative">
                        <a href="/collection/poshak" className="text-sm text-gray-700 hover:text-[#b99b77] transition-colors flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Poshak
                        </a>
                        <ul className="mt-0 hidden group-hover:block bg-white text-sm space-y-2 pl-6 z-50">
                          <li><a href="/collection/poshak/daily-wear" className="block text-gray-600 hover:text-[#b99b77]">Daily wear</a></li>
                          <li><a href="/collection/poshak/party-wear" className="block text-gray-600 hover:text-[#b99b77]">Party wear</a></li>
                          <li><a href="/collection/poshak/bridal" className="block text-gray-600 hover:text-[#b99b77]">Bridal</a></li>
                          <li><a href="/collection/poshak/cotton-special" className="block text-gray-600 hover:text-[#b99b77]">Cotton Special</a></li>
                        </ul>
                      </li>

                      <li className="group relative">
                        <a href="/collection/saree" className="text-sm text-gray-700 hover:text-[#b99b77] transition-colors flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Saree
                        </a>
                        <ul className="mt-0 hidden group-hover:block bg-white text-sm space-y-2 pl-6 z-50">
                          <li><a href="/collection/saree/royal-georgette" className="block text-gray-600 hover:text-[#b99b77]">Royal Georgette</a></li>
                          <li><a href="/collection/saree/chiffon" className="block text-gray-600 hover:text-[#b99b77]">Chiffon</a></li>
                          <li><a href="/collection/saree/daily-wear" className="block text-gray-600 hover:text-[#b99b77]">Daily wear</a></li>
                        </ul>
                      </li>

                      <li className="group relative">
                        <a href="/collection/jewellery" className="text-sm text-gray-700 hover:text-[#b99b77] transition-colors flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Jewellery
                        </a>
                        <ul className="mt-0 hidden group-hover:block bg-white text-sm space-y-2 pl-6 z-50">
                          <li><a href="/collection/jewellery/aad-set" className="block text-gray-600 hover:text-[#b99b77]">Aad Set</a></li>
                          <li><a href="/collection/jewellery/earring" className="block text-gray-600 hover:text-[#b99b77]">Earring</a></li>
                          <li><a href="/collection/jewellery/necklace" className="block text-gray-600 hover:text-[#b99b77]">Necklace</a></li>
                          <li><a href="/collection/jewellery/bor" className="block text-gray-600 hover:text-[#b99b77]">Bor</a></li>
                          <li><a href="/collection/jewellery/nath" className="block text-gray-600 hover:text-[#b99b77]">Nath</a></li>
                          <li><a href="/collection/jewellery/hathphool" className="block text-gray-600 hover:text-[#b99b77]">Hathphool</a></li>
                          <li><a href="/collection/jewellery/sets" className="block text-gray-600 hover:text-[#b99b77]">Sets</a></li>
                          <li><a href="/collection/jewellery/bridal-sets" className="block text-gray-600 hover:text-[#b99b77]">Bridal Sets</a></li>
                        </ul>
                      </li>

                      <li className="group relative">
                        <a href="/collection/odhni" className="text-sm text-gray-700 hover:text-[#b99b77] transition-colors flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Odhni
                        </a>
                        <ul className="mt-0 hidden group-hover:block bg-white text-sm space-y-2 pl-6 z-50">
                          <li><a href="/collection/odhni/cotton" className="block text-gray-600 hover:text-[#b99b77]">Cotton</a></li>
                          <li><a href="/collection/odhni/party-wear" className="block text-gray-600 hover:text-[#b99b77]">Party wear</a></li>
                        </ul>
                      </li>

                      <li>
                        <a href="#" className="text-sm text-gray-700 hover:text-[#b99b77] transition-colors flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Bridal
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-sm text-gray-700 hover:text-[#b99b77] transition-colors flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Accessories
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Right: Image */}
                  <div>
                    <img 
                      src="/traditional-rajasthani-poshak-ethnic-wear.jpg" 
                      alt="Collection showcase" 
                      className="w-full h-80 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
            </div>
          </li>

          {/* Account & Cart icons */}
          <li>
            <Link href="/account" aria-label="account" className="p-2 rounded-full hover:bg-gray-100/50 block">
              <lord-icon
                src="https://cdn.lordicon.com/kdduutaw.json"
                trigger="hover"
                colors="primary:#121331,secondary:#000000"
                style={{ width: '28px', height: '28px' }}
              />
            </Link>
          </li>
          <li className="relative">
            <Link href="/cart" aria-label="cart" className="p-2 rounded-full hover:bg-gray-100/50 block">
              <lord-icon
                src="https://cdn.lordicon.com/uisoczqi.json"
                trigger="hover"
                colors="primary:#121331,secondary:#000000"
                style={{ width: '28px', height: '28px' }}
              />
              {isLoaded && getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Side Menu */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Side Menu Panel */}
          <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-lg overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="close menu"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            {/* Menu Items */}
            <nav className="pt-20 px-6 space-y-0">
              <a href="#" className="block py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors">
                SHOP ALL
              </a>

              {/* POSHAK (expandable) */}
              <div>
                <button
                  onClick={() => setOpenMenuCategory(openMenuCategory === 'Poshak' ? null : 'Poshak')}
                  className="w-full text-left py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors flex justify-between items-center"
                >
                  <span>POSHAK</span>
                  <span className={`transform transition-transform ${openMenuCategory === 'Poshak' ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {openMenuCategory === 'Poshak' && (
                  <div className="pl-6 bg-white">
                    <a href="/collection/poshak/daily-wear" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Daily wear</a>
                    <a href="/collection/poshak/party-wear" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Party wear</a>
                    <a href="/collection/poshak/bridal" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Bridal</a>
                    <a href="/collection/poshak/cotton-special" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Cotton Special</a>
                  </div>
                )}
              </div>

              {/* SAREES (expandable) */}
              <div>
                <button
                  onClick={() => setOpenMenuCategory(openMenuCategory === 'Saree' ? null : 'Saree')}
                  className="w-full text-left py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors flex justify-between items-center"
                >
                  <span>SAREES</span>
                  <span className={`transform transition-transform ${openMenuCategory === 'Saree' ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {openMenuCategory === 'Saree' && (
                  <div className="pl-6 bg-white">
                    <a href="/collection/saree/royal-georgette" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Royal Georgette</a>
                    <a href="/collection/saree/chiffon" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Chiffon</a>
                    <a href="/collection/saree/daily-wear" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Daily wear</a>
                  </div>
                )}
              </div>

              <a href="#" className="block py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors">
                LEHENGAS
              </a>

              {/* ODHNI (expandable) */}
              <div>
                <button
                  onClick={() => setOpenMenuCategory(openMenuCategory === 'Odhni' ? null : 'Odhni')}
                  className="w-full text-left py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors flex justify-between items-center"
                >
                  <span>ODHNI</span>
                  <span className={`transform transition-transform ${openMenuCategory === 'Odhni' ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {openMenuCategory === 'Odhni' && (
                  <div className="pl-6 bg-white">
                    <a href="/collection/odhni/cotton" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Cotton</a>
                    <a href="/collection/odhni/party-wear" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Party wear</a>
                  </div>
                )}
              </div>

              {/* JEWELLERY (expandable) */}
              <div>
                <button
                  onClick={() => setOpenMenuCategory(openMenuCategory === 'Jewellery' ? null : 'Jewellery')}
                  className="w-full text-left py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors flex justify-between items-center"
                >
                  <span>JEWELLERY</span>
                  <span className={`transform transition-transform ${openMenuCategory === 'Jewellery' ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {openMenuCategory === 'Jewellery' && (
                  <div className="pl-6 bg-white">
                    <a href="/collection/jewellery/aad-set" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Aad Set</a>
                    <a href="/collection/jewellery/earring" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Earring</a>
                    <a href="/collection/jewellery/necklace" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Necklace</a>
                    <a href="/collection/jewellery/bor" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Bor</a>
                    <a href="/collection/jewellery/nath" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Nath</a>
                    <a href="/collection/jewellery/hathphool" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Hathphool</a>
                    <a href="/collection/jewellery/sets" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Sets</a>
                    <a href="/collection/jewellery/bridal-sets" className="block py-2 text-sm text-gray-700 hover:text-[#b99b77]">Bridal Sets</a>
                  </div>
                )}
              </div>

              <a href="#" className="block py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors">
                READY TO SHIP
              </a>
              <a href="#" className="block py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors">
                WHY US
              </a>
              <a href="#" className="block py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors">
                OUR STORY
              </a>
              <a href="#" className="block py-4 px-4 text-sm font-semibold text-gray-900 hover:text-[#b99b77] border-b border-gray-200 transition-colors">
                LOGIN
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}