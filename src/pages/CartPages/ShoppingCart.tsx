import Cart from "../../components/ShoppingCartComponents/Cart";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const ShoppingCartPage: React.FC = () => {
  return (
    // <div className="min-h-screen flex flex-col">
    //   <Navbar />
    //   <div className="flex-grow flex items-center justify-center bg-white">
    //     <Cart />
    //   </div>
    //   <Footer />
    // </div>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-white px-4 py-8 pt-28">
        {" "}
        {/* pt-28 = ~7rem */}
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
          🛒 Your Shopping Cart
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Review your selected items and proceed to checkout
        </p>
        <div className="flex items-start justify-center gap-8 flex-wrap">
          <Cart />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
