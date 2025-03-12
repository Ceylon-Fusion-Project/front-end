import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminComponents/AdminLayout';
import Dashboard from '../pages/AdminPages/Dashboard';
import ProductManagement from '../pages/AdminPages/ProductManagement';
import Origins from '../pages/AdminPages/OriginManagement';
import Certifications from '../pages/AdminPages/CertificationManagement';
import Bookings from '../pages/AdminPages/BookingManagement';
import AdminProfile from '../pages/AdminPages/AdminProfile';
import ExperienceCenterManagement from '../components/AdminComponents/BookingComponents/ExperienceCenterManagement';

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
            <div><ProductManagement /></div>
          </AdminLayout>
        }
      />
      {/* Origin Management Page */}
      <Route
        path="origins"
        element={
          <AdminLayout>
            <div><Origins /></div>
          </AdminLayout>
        }
      />
      {/* Certification Management Page */}
      <Route
        path="certifications"
        element={
          <AdminLayout>
            <div><Certifications /></div>
          </AdminLayout>
        }
      />
      {/* Booking Management Page */}
      <Route
        path="bookings"
        element={
          <AdminLayout>
            <div><Bookings /></div>
          </AdminLayout>
        }
      />
      {/* Experience Center Management Page */}
      <Route
        path="experience-center-management"
        element={
          <AdminLayout>
            <div><ExperienceCenterManagement /></div>
          </AdminLayout>
        }
      />
      {/* Admin Profile Page */}
      <Route
        path="profile"
        element={
          <AdminLayout>
            <div><AdminProfile /></div>
          </AdminLayout>
        }
      />
    </Routes>
  );
}