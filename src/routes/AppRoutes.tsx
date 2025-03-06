import {Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProductRoutes from './ProductRoutes';
import AdminRoutes from './AdminRoutes';
<<<<<<< HEAD
import ProfileRoutes from './ProfileRoutes';
=======
import BookingRoutes from './BookingRoutes';
import OrderRoutes from './OrderRoutes';
>>>>>>> 69f40c3331b4e0dae440b2416507bbf62ee6ba8a
// import FeatureXRoutes from "./FeatureXRoutes"; // Example: Other feature routes
// import NotFoundPage from "../pages/NotFoundPage"; // Optional 404 Page

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/feature-x" element={<FeatureXRoutes />} /> */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
            
            {/* Product Related Routes */}
            <Route path="/products/*" element={<ProductRoutes />} />
            
            {/* Admin Related Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

<<<<<<< HEAD
            {/* UserAccount Realated routes*/}
            <Route path="/profile/*" element={<ProfileRoutes />} />
=======
            {/* Booking Related Routes */}
            <Route path="/booking/*" element={<BookingRoutes />} />

            {/* Order Related Routes */}
            <Route path="/orders/*" element={<OrderRoutes />} />
>>>>>>> 69f40c3331b4e0dae440b2416507bbf62ee6ba8a
        </Routes>
    );
}
