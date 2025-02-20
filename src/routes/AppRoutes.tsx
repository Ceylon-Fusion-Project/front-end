import {Routes, Route} from 'react-router-dom';
///import LandingPage from '../LandingPage';
import ProductRoutes from './ProductRoutes';
// import FeatureXRoutes from "./FeatureXRoutes"; // Example: Other feature routes
// import NotFoundPage from "../pages/NotFoundPage"; // Optional 404 Page

export default function AppRoutes() {
    return (
        <Routes>
            {/* <Route path="/landingpage" element={<LandingPage />} /> */}
            {/* <Route path="/feature-x" element={<FeatureXRoutes />} /> */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
            
            {/* Product Related Routes */}
            <Route path="/products/*" element={<ProductRoutes />} />
        </Routes>
    );
}
