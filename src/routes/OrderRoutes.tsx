import { Routes, Route } from "react-router-dom";
import OrderCheckout from "../pages/OrderPages/OrderCheckout";
import ShoppingCartPage from "../pages/CartPages/ShoppingCart";
import WishlistPage from "../pages/WishlistPages/WishlistPage";

export default function ProductRoutes() {
  return (
    <Routes>
      {/*Route to order checkout*/}
      <Route path="order-checkout" element={<OrderCheckout />} />
      {/* <Route
        path="order-checkout"
        element={
          <StripeWrapper>
            <OrderCheckout />
          </StripeWrapper>
        }
      /> */}

      {/* Route to shopping cart */}
      <Route path="shopping-cart" element={<ShoppingCartPage />} />

      {/* Route to WishList */}
      <Route path="wishList" element={<WishlistPage />} />
    </Routes>
  );
}
