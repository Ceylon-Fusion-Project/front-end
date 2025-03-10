import ProfileLayout from '@/components/UserAccount/ProfileLayout';
import OrdersPage from '@/pages/AccountPages/OrdersPage';
import ProfileHome from '@/pages/AccountPages/ProfileHome';
import SettingsPage from '@/pages/AccountPages/SettingsPage';
import { Routes, Route } from 'react-router-dom';
// import BookingsPage from '@/pages/AccountPages/BookingsPage';
// import SettingsPage from '@/pages/AccountPages/SettingsPage';
// import BuyerDashboard from '@/pages/AccountPages/BuyerDashboard';

export default function ProfileRoutes() {
  return (
    <Routes>
      {/* Profile Routes */}
      <Route
        path="/"
        element={
          <ProfileLayout>
            <ProfileHome />
          </ProfileLayout>
        }
      />
      <Route
        path="orders"
        element={
          <ProfileLayout>
            <OrdersPage />
          </ProfileLayout>
        }
      />
      {/* <Route
        path="bookings"
        element={
          <ProfileLayout>
            <BookingsPage />
          </ProfileLayout>
        }
      /> */}
      <Route
        path="settings"
        element={
          <ProfileLayout>
            <SettingsPage />
          </ProfileLayout>
        }
      />
      
      {/* Buyer Dashboard */}
      {/* <Route
        path="dashboard"
        element={
          <ProfileLayout>
            <BuyerDashboard />
          </ProfileLayout>
        }
      /> */}
      
      {/* Onboarding (outside of ProfileLayout) */}
      {/* <Route path="onboarding" element={<OnboardingPage />} /> */}
    </Routes>
  );
}