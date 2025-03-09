import { Routes, Route } from 'react-router-dom';
import OrderCheckout from '../pages/OrderPages/OrderCheckout';

export default function ProductRoutes() {
    return (
        <Routes>
            {/*Route to order checkout*/}
            <Route path="order-checkout" element={<OrderCheckout />}/>
        </Routes>
    );
}
