'use client'; // This component needs to be a Client Component for the accordion (useState)

import { useState } from 'react';
import { FaGlobe, FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaSnapchat, FaPinterestP, FaFoursquare } from 'react-icons/fa';
import { IoIosAdd, IoIosRemove } from 'react-icons/io'; // For accordion

// --- Footer Links Data (from your original HTML) ---
const footerLinks = [
  {
    title: 'HELP',
    links: [
      { text: 'You can <span>call</span> or <span>email us</span>.', href: '#' },
      { text: "FAQ's", href: '#' },
      { text: 'Product Care', href: '#' },
      { text: 'Stores', href: '#' },
    ]
  },
  {
    title: 'SERVICES',
    links: [
      { text: 'Repairs', href: '#' },
      { text: 'Personalization', href: '#' },
      { text: 'Art of Gifting', href: '#' },
      { text: 'Download our Apps', href: '#' },
    ]
  },
  {
    title: 'ABOUT LOUIS VUITTON',
    links: [
      { text: 'Fashion Shows', href: '#' },
      { text: 'Art & Culture', href: '#' },
      { text: 'La Maison', href: '#' },
      { text: 'Sustainability', href: '#' },
      { text: 'Latest News', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Foundation Louis Vuitton', href: '#' },
    ]
  },
  {
    title: 'CONNECT',
    links: [
      { text: '<span>Sign up</span> for first access to latest collections, campaigns and videos.', href: '#' },
      { text: 'Follow Us', href: '#' },
    ]
  }
];

// --- Social Media Icons Data ---
const socialLinks = [
  { icon: <FaInstagram />, href: '#' },
  { icon: <FaFacebookF />, href: '#' },
  { icon: <FaTwitter />, href: '#' },
  { icon: <FaYoutube />, href: '#' },
  { icon: <FaSnapchat />, href: '#' },
  { icon: <FaPinterestP />, href: '#' },
  { icon: <FaFoursquare />, href: '#' },
];

// --- Reusable Link Component ---
// This uses 'jost_light' (font-light) and sizes from your CSS
const FooterLink = ({ link }) => (
  <div className="font-light text-black text-sm mb-2.5 p-1">
    <a
      href={link.href}
      className="text-black no-underline
                 [&_span]:underline [&_span]:underline-offset-4" // Styles <span> tags
      dangerouslySetInnerHTML={{ __html: link.text }}
    />
  </div>
);

// --- Desktop Footer (4-column) ---
function DesktopFooter() {
  return (
    <>
      <hr className="border-t border-gray-200 my-9" />
      <section className="hidden md:flex flex-wrap max-w-full px-16">
        {footerLinks.map((col) => (
          <div key={col.title} className="flex-1 md:w-1/2 lg:w-1/4 text-left min-w-[200px] mb-8">
            {/* Heading: font-size: 12px, font-weight: 600 */}
            <div className="font-sans text-xs font-semibold mb-4 p-1">{col.title}</div>
            {col.links.map((link, index) => (
              <FooterLink key={index} link={link} />
            ))}
            {col.title === 'CONNECT' && (
              <div className="flex gap-4 my-2 px-1">
                {socialLinks.slice(0, 3).map((social, i) => ( // Show first 3 icons
                  <a key={i} href={social.href} className="text-black text-lg">{social.icon}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
      <hr className="hidden md:block border-t border-gray-200 my-9" />
      
      {/* Desktop Bottom Bar */}
      <footer className="hidden md:flex justify-between items-center px-16">
        <a href="#" className="font-light text-sm text-black no-underline flex items-center gap-2">
          <FaGlobe />
          <span className="underline underline-offset-4">ENGLISH (INTL)</span>
        </a>
        <ul className="flex gap-8">
          <li><a href="#" className="font-light text-sm text-black no-underline">Sitemap</a></li>
          <li><a href="#" className="font-light text-sm text-black no-underline">Legal & privacy</a></li>
          <li><a href="#" className="font-light text-sm text-black no-underline">Cookies</a></li>
        </ul>
      </footer>
    </>
  );
}

// --- Mobile Accordion Footer ---
function MobileAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="md:hidden w-full">
      {footerLinks.map((item, index) => (
        <div key={item.title}>
          <hr className="border-t border-gray-200" />
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center text-left
                       font-light text-2xl text-black bg-white 
                       py-6 px-6 cursor-pointer"
          >
            {item.title}
            {activeIndex === index ? <IoIosRemove /> : <IoIosAdd />}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-out bg-white
                        ${activeIndex === index ? 'max-h-[1000px]' : 'max-h-0'}`} // Use large max-h
          >
            <div className="px-10 py-4">
              {item.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block font-light text-xl text-black no-underline my-6
                             [&_span]:underline [&_span]:underline-offset-8"
                  dangerouslySetInnerHTML={{ __html: link.text }}
                />
              ))}
              {item.title === 'CONNECT' && (
                <div className="flex flex-wrap justify-center gap-8 my-10">
                  {socialLinks.map((social, i) => (
                    <a key={i} href={social.href} className="text-black text-4xl">{social.icon}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <hr className="border-t border-gray-200" />
    </div>
  );
}

// --- Mobile-Only Bottom Bar ---
function MobileFooter() {
  return (
    <footer className="md:hidden flex flex-col items-center text-center my-16">
      <ul className="flex justify-center gap-6 mb-4">
        <li><a href="#" className="font-light text-xl text-black no-underline">Sitemap</a></li>
        <li><a href="#" className="font-light text-xl text-black no-underline">Legal & privacy</a></li>
        <li><a href="#" className="font-light text-xl text-black no-underline">Cookies</a></li>
      </ul>
      <div className="mt-8">
        <a href="#" className="font-light text-xl text-black no-underline flex items-center gap-2">
          <FaGlobe />
          <span className="underline underline-offset-8">ENGLISH (INTL)</span>
        </a>
      </div>
    </footer>
  );
}


// --- Main Exported Component ---
export default function OriginalFooter() {
  return (
    <div className="bg-white text-black w-full">
      {/* Desktop Footer Links */}
      <DesktopFooter />

      {/* Mobile Accordion Footer */}
      <MobileAccordion />

      {/* Mobile-only Bottom Bar */}
      <MobileFooter />
      
      {/* Final Logo (font-brand, 1.3em) */}
      <div className="mt-11 mb-12 font-brand text-xl text-center">
        Louis Vuitton
      </div>
    </div>
  );
}