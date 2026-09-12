'use client'; // This component needs to be a Client Component for hooks (useRef, useState)

import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// 1. DUMMY DATA: Replace these with your actual collection images and names
const collections = [
  { id: 1, label: 'WEDDING', imgSrc: 'https://placehold.co/400x500/EAD9C9/5D4037?text=Wedding' },
  { id: 2, label: 'KURTA SET', imgSrc: 'https://placehold.co/400x500/D4AFA6/5D4037?text=Kurta+Set' },
  { id: 3, label: 'ANARKALI', imgSrc: 'https://placehold.co/400x500/F5E08B/5D4037?text=Anarkali' },
  { id: 4, label: 'LEHENGA', imgSrc: 'https://placehold.co/400x500/BCAAA4/5D4037?text=Lehenga' },
  { id: 5, label: 'SAREE', imgSrc: 'https://placehold.co/400x500/C5CAE9/5D4037?text=Saree' },
  { id: 6, label: 'JEWELLERY', imgSrc: 'https://placehold.co/400x500/F8BBD0/5D4037?text=Jewellery' },
];

// 2. THE CARD COMPONENT (Internal to this file)
function CollectionCard({ imgSrc, label }) {
  return (
    // This div controls the size of the card
    <div className="flex-shrink-0 w-[calc(50%-0.5rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)] relative rounded-lg overflow-hidden snap-start">
      <img 
        src={imgSrc} 
        alt={label} 
        className="w-full h-full object-cover aspect-[4/5]" // 4:5 aspect ratio like your image
      />
      {/* This is the label, e.g., "WEDDING" */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="bg-white text-black text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full">
          {label}
        </span>
      </div>
    </div>
  );
}

// 3. THE SLIDER COMPONENT (Main export)
export default function CollectionSlider() {
  const scrollContainerRef = useRef(null);

  // Function to scroll the container
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Calculate 80% of the container's visible width to scroll by
      const scrollAmount = current.clientWidth * 0.8; 
      
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <section className="w-full py-12 md:py-20 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER: Title and Buttons --- */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-brand text-gray-800 tracking-wide">
            SHOP BY COLLECTION
          </h2>
          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
              aria-label="Scroll Left"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
              aria-label="Scroll Right"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* --- SCROLLABLE CONTAINER --- */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {collections.map(collection => (
            <CollectionCard 
              key={collection.id} 
              imgSrc={collection.imgSrc} 
              label={collection.label} 
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}