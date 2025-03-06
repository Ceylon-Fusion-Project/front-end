// import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BookingPage from '@/pages/BookingPages/BookingPage';

export default function BookingRoutes() {
  return (
    <Routes>

        {/* Booking Page */}
        <Route
          path="/"
          element={
            <BookingPage />
          }
        />
        
    </Routes>
  )
}
