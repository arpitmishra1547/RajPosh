// Hero Section Component
export default function HeroSection({ type, src, title, style }) {
  const commonWrapperClasses = "relative flex justify-center items-center h-125vh overflow-hidden";

  // --- UPDATED FONT SIZE & POSITION ---
  // Your original CSS for .videobg h2 was:
  // Mobile (max-width: 600px): font-size: 3rem (text-5xl) at top: 79%
  // Desktop: font-size: 30px (text-3xl) at top: 81.2%
  // This code now reflects that correct mobile-first order.
  const commonTitleClasses = "absolute z-10 text-white text-5xl md:text-3xl font-semibold font-['Poppins'] text-center top-[79%] md:top-[81.2%]";

  // --- UPDATED BUTTON POSITION ---
  // Your original CSS for .videobg button was:
  // Mobile & Desktop: top: 91%
  const buttonClasses = "hero-btn top-[91%]";
  // --- END OF UPDATES ---

  if (type === 'video') {
    return (
      <section className={commonWrapperClasses}>
        <video 
          src={src} 
          type="video/mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          // Set brightness to 85% to match original CSS
          className="w-full h-full object-cover filter brightness-[.85]"
        />
        <h2 className={commonTitleClasses}>{title}</h2>
        <button className={buttonClasses}>Discover the Collections</button>
      </section>
    );
  }

  // The code for the 'image' type (which you aren't using)
  // would be here, but is omitted for clarity.
  
  return null;
}