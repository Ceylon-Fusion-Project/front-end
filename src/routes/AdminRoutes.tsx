//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminComponents/AdminLayout';
 import Dashboard from '../pages/AdminPages/Dashboard';
// import ProductManagement from '../pages/AdminPages/ProductManagement';
// import Origins from '../pages/AdminPages/Origins';
// import Certifications from '../pages/AdminPages/Certifications';
// import Bookings from '../pages/AdminPages/Bookings';

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Dashboard: AdminLayout wraps the Dashboard page */}
      <Route
        path="/"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      {/* Product Management */}
      <Route
        path="products"
        element={
          <AdminLayout>
            <div>{/* <ProductManagement /> */}</div>
          </AdminLayout>
        }
      />
      {/* Origin Management Page */}
      <Route
        path="origins"
        element={
          <AdminLayout>
            <div>{/* <Origins /> */}</div>
          </AdminLayout>
        }
      />
      {/* Certification Management Page */}
      <Route
        path="certifications"
        element={
          <AdminLayout>
            <div>{/* <Certifications /> */}</div>
          </AdminLayout>
        }
      />
      {/* Booking Management Page */}
      <Route
        path="bookings"
        element={
          <AdminLayout>
            <div>{/* <Bookings /> */}</div>
          </AdminLayout>
        }
      />
    </Routes>
  );
}
