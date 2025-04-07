// import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BookingPage from '@/pages/BookingPages/BookingPage';
import BookingOverviewPage from '@/pages/BookingPages/BookingOverviewPage';

export default function BookingRoutes() {
  return (
    <Routes>

        {/* Booking Page */}
        <Route
          path="/booking-page"
          element={
            <BookingPage />
          }
        />

        {/* Package Booking Overview */}
      <Route 
        path="/package/:id" 
        element={<BookingOverviewPage type="package" />} 
      />
      
      {/* Room Booking Overview */}
      <Route 
        path="/room/:id" 
        element={<BookingOverviewPage type="room" />} 
      />
      
      {/* Event Booking Overview */}
      <Route 
        path="event/:id" 
        element={<BookingOverviewPage type="event" />} 
      />

    </Routes>
  )
}
