import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '../../components/footer'
import BookingGallery from '../../components/BookingComponents/BookingGallery'
import BookingInfo from '../../components/BookingComponents/BookingInfo'

interface BookingOverviewPageProps {
  type?: "package" | "room" | "event";  // Make type optional as we'll extract it from URL
}

const BookingOverviewPage: React.FC<BookingOverviewPageProps> = ({ type: propType }) => {
  // Extract the item type and ID from URL parameters
  const { id } = useParams<{ id: string }>();
  const path = window.location.pathname;
  
  // Determine the type based on URL if not provided as prop
  let type = propType;
  if (!type) {
    if (path.includes('/booking/package/')) {
      type = "package";
    } else if (path.includes('/booking/room/')) {
      type = "room";
    } else if (path.includes('/booking/event/')) {
      type = "event";
    }
  }
  
  return (
    <div className="min-h-screen text-textPrimary">
      {/* Navigation Bar */}
      <section className="grid-area-nav">
        <Navbar />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        {/* Booking Gallery */}
        <section className="w-full">
          <BookingGallery />
        </section>

        {/* Booking Information */}
        <section className="w-full">
          {type && <BookingInfo type={type as "package" | "room" | "event"} />}
        </section>
      </div>
      
      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default BookingOverviewPage;