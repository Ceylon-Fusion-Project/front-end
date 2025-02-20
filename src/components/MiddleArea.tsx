import React from "react";
import FilterButton from "./FilterButton";

const MiddleArea: React.FC = () => {
  return (
    <div className="container p-4 mx-auto">
      
      {/* Target Section */}
      <section id="target-section" className="min-h-screen p-8 bg-gray-100">

        <div className="flex min-h-screen p-6 bg-gray-100 md:p-12">

            {/* Filter Button */}
            <FilterButton />
            {/* Main Content (Right) */}
            
        </div>

      </section>
      
    </div>
  );
};

export default MiddleArea;