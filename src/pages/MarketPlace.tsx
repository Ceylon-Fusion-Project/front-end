import Navbar from "@/components/Navbar";
import SlideshowBanner from "@/components/SlideshowBanner";
import MiddleArea from "@/components/MiddleArea";
import Footer from "@/components/footer";

const Marketplace: React.FC = () => {
  return (
    <section className="mt-5 pt-5">
      <div className="h-screen text-textPrimary snap-y snap-mandatory">

        {/* Navigation Bar */}
        <section className="snap-start">
          <Navbar />
        </section>

        {/* Slideshow Banner */}
        <section className="h-screen snap-start">
          <SlideshowBanner />
        </section>

        {/* Middle Area */}
        <section className="snap-start">
          <MiddleArea />
        </section> 

        {/* Footer */}
        <section className="snap-start">
          <Footer />
        </section>

      </div>
    </section>
  );
};

export default Marketplace;
