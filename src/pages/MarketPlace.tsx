import Navbar from "@/components/Navbar";
import SlideshowBanner from "@/components/SlideshowBanner";

const Marketplace: React.FC = () => {
  return (

      <div className="h-screen overflow-y-scroll text-textPrimary snap-y snap-mandatory">

        {/* Navigation Bar */}
        <section className="snap-start">
          <Navbar />
        </section>

        {/* Slideshow Banner */}
        <section className="h-screen snap-start">
          <SlideshowBanner />
        </section>

        
      </div>
      
  );
};

export default Marketplace;
