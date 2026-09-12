// ...existing code...
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CollectionSlider from './components/CollectionSlider';
import CollectionShowcase from './components/CollectionShowcase';
import Footer from './components/Footer';
import { Handmade } from './components/Handmade';

// ...existing code...
export default function Home() {
  return (
    <div className="App">
      <Navbar />
      
      <main>
        {/* Hardcoded the first video section as requested */}
        <HeroSection 
          type="video"
          src="/v1.mp4"
          // title="Louis Vuitton Deep Time"
          title="Our Heritage Your Pride"
        />
        
         {/* --- 2. Add the new component right here --- */}
        {/* <CollectionSlider /> */}
        <CollectionShowcase />
        <Handmade />
        <Footer />
        
        {/* You can add more sections here later */}
      </main>
    </div>
  );
}
// ...existing code...