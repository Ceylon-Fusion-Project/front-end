import { Routes, Route } from 'react-router-dom';
import OrderCheckout from './../pages/OrderCheckout';

export default function ProductRoutes() {
    return (
        <Routes>
            {/*Route to order checkout*/}
            <Route path="order-checkout" element={<OrderCheckout />}/>
        </Routes>
    );
}
