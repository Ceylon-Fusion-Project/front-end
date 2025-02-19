import {Routes, Route} from 'react-router-dom';
import {ProductOverviewPage} from '../pages/productOverviewPage';

export default function ProductRoutes() {
    return (
        <Routes>
            {/* <Route path="/" element={<ProductOverviewPage />} /> */}
            <Route path="product-details/:id" element={<ProductOverviewPage />} />
        </Routes>
    );
}