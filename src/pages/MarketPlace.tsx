import Navbar from "@/components/Navbar";

const Marketplace: React.FC = () => {
  return (

      <div className="h-screen overflow-y-scroll text-textPrimary snap-y snap-mandatory">

        {/* Navigation Bar */}
        <section className="snap-start">
          <Navbar />
        </section>
        
      </div>
      
  );
};

export default Marketplace;
