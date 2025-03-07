import React from "react";
import Wishlist from "../components/Wishlistcomponents/Wishlist";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const WishlistPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-white p-6">
                <Wishlist />
            </main>
            <Footer />
        </div>
    );
};

export default WishlistPage;