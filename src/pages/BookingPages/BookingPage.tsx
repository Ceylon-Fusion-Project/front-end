import React from 'react'
import Navbar from '@/components/Navbar'
import Banner from '../../components/BookingComponents/Banner'

const BookingPage : React.FC = () => {
  return (
    <div className="h-screen overflow-y-scroll text-textPrimary snap-y snap-mandatory">

        {/* Navigation Bar */}
        <section className="snap-start">
          <Navbar />
        </section>

        {/* Banner */}
        <section className="h-screen snap-start">
          <Banner />
        </section>
        
    </div>
  )
}

export default BookingPage
