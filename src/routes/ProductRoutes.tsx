import {Routes, Route} from 'react-router-dom';
import {ProductOverviewPage} from '../pages/productOverviewPage';
import Marketplace from '@/pages/MarketPlace';

export default function ProductRoutes() {
    return (
        <Routes>
            {/*Route to marketplace*/}
            <Route path="product-marketplace" element={<Marketplace />}/>
            {/* <Route path="/" element={<ProductOverviewPage />} /> */}
            <Route path="product-details/:id" element={<ProductOverviewPage />} />
        </Routes>
    );
}