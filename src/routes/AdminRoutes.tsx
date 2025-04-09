import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminComponents/AdminLayout';
import Dashboard from '../pages/AdminPages/Dashboard';
import ProductManagement from '../pages/AdminPages/ProductManagement';
import Origins from '../pages/AdminPages/OriginManagement';
import Certifications from '../pages/AdminPages/CertificationManagement';
import Bookings from '../pages/AdminPages/BookingManagement';
import AdminProfile from '../pages/AdminPages/AdminProfile';
import ExperienceCenterManagement from '../components/AdminComponents/BookingComponents/ExperienceCenterManagement';
import AccommodationManagement from '@/components/AdminComponents/BookingComponents/AccommodationManagement';
import RoomManagement from '@/components/AdminComponents/BookingComponents/RoomManagement';
import RoomDetails from '@/components/AdminComponents/BookingComponents/RoomDetails';
import EventDetails from '@/components/AdminComponents/BookingComponents/EventDetails';
import EventManagement from '@/components/AdminComponents/BookingComponents/EventManagement';
import AdminSettings from '@/pages/AdminPages/AdminSettings';
import PackageManagement from '@/components/AdminComponents/BookingComponents/PackageManagement';
import PackageForm from '@/components/AdminComponents/BookingComponents/PackageForm';
import PackageDetails from '@/components/AdminComponents/BookingComponents/PackageDetails';
import SelectionPage from '../pages/AdminPages/SelectionPage';
import CombinedPackageManagement from '@/components/AdminComponents/BookingComponents/CombinedPackegeManagement';



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
      {/* Booking Management Page  Navigations*/}
      <Route
        path="bookings"
        element={
          <AdminLayout>
            <div><Bookings /></div>
          </AdminLayout>
        }
      />

         {/* Package Management Page  Navigations*/}
      <Route
        path="package-management"
        element={
          <AdminLayout>
            <div><PackageManagement /></div>
          </AdminLayout>
        }
      />
      <Route
        path="combined-package-management"
        element={
          <AdminLayout>
            <div><CombinedPackageManagement /></div>
          </AdminLayout>
        }
      />
      <Route
        path="package-management/add-package"
        element={
          <AdminLayout>
            <div><PackageForm /></div>
          </AdminLayout>
        }
      />
      <Route
        path="package-management/package-details/:packageId"
        element={
          <AdminLayout>
            <div><PackageDetails /></div>
          </AdminLayout>
        }
      />
      {/* Experience Center Management  */}
      <Route
        path="experience-center-management"
        element={
          <AdminLayout>
            <div><ExperienceCenterManagement /></div>
          </AdminLayout>
        }
      />
      <Route
        path="accommodation-management"
        element={
          <AdminLayout>
            <div><AccommodationManagement /></div>
          </AdminLayout>
        }
      />
      {/* Room Details Page */}
      <Route
        path="accommodation-management/rooms/:accommodationId"
        element={
          <AdminLayout>
            <div><RoomDetails /></div>
          </AdminLayout>
        }
      />
      {/*Event  Details Page */}
      <Route
        path="experience-center-management/events/:experienceCenterId"
        element={
          <AdminLayout>
            <div><EventDetails /></div>
          </AdminLayout>
        }
      />
      <Route
        path="room-management"
        element={
          <AdminLayout>
            <div><RoomManagement /></div>
          </AdminLayout>
        }
      />
      <Route
        path="event-management"
        element={
          <AdminLayout>
            <div><EventManagement /></div>
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
      <Route
        path="profilesettings"
        element={
          <AdminLayout>
            <div><AdminSettings /></div>
          </AdminLayout>
        }
      />
      {/*Route to Selection*/}
      <Route path="selection" element={<SelectionPage />}/>
    </Routes>
  );
}