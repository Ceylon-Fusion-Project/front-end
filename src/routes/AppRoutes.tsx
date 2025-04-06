import {Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProductRoutes from './ProductRoutes';
import AdminRoutes from './AdminRoutes';
import BookingRoutes from './BookingRoutes';
import OrderRoutes from './OrderRoutes';
import ProfileRoutes from './ProfileRoutes';
// import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
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

            {/* Booking Related Routes */}
            <Route path="/booking/*" element={<BookingRoutes />} />

            {/* Order Related Routes */}
            <Route path="/orders/*" element={<OrderRoutes />} />

            {/* UserAccount Realated routes */}
            <Route path="/profile/*" element={<ProfileRoutes />} />

            {/* <Route path="/about" element={<AboutUs/>} /> */}
            <Route path="/contact" element={<ContactUs/>} />
            
        </Routes>
    );
}
