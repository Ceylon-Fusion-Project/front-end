// import React from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/footer";
// import Wishlist from "../../components/Wishlistcomponents/Wishlist";


// const WishlistPage: React.FC = () => {
//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar />
//             <main className="flex-grow bg-white p-6">
//                 <Wishlist />
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default WishlistPage;

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import Wishlist from "../../components/Wishlistcomponents/Wishlist";

const WishlistPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-10 shadow-inner">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800">My Favorites</h1>
          <p className="text-gray-600 mt-2">Your collection of Ceylon Fusion treasures</p>
        </div>
      </div> */}
      <main className="flex-grow py-8 px-4 mt-20">
        <Wishlist />
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;