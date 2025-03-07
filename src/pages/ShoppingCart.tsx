import Cart from "../components/ShoppingCartComponents/Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const ShoppingCartPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-white">
        <Cart />
      </div>
      <Footer />
    </div> 
  );
};

export default ShoppingCartPage;
