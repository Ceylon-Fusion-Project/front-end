import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import Wishlist from "../../components/Wishlistcomponents/Wishlist";

const WishlistPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-8 px-4 mt-20">
        <Wishlist />
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;