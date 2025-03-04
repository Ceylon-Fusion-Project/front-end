import {Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProductRoutes from './ProductRoutes';
import AdminRoutes from './AdminRoutes';
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
        </Routes>
    );
}
