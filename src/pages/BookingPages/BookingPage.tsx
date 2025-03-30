import React from 'react'
import Navbar from '@/components/Navbar'
import HeroBanner from '../../components/BookingComponents/HeroBanner'
import Footer from '@/components/footer'

const BookingPage : React.FC = () => {
  return (
    <div className="h-screen overflow-y-scroll text-textPrimary snap-y snap-mandatory">

        {/* Navigation Bar */}
        <section className="snap-start">
          <Navbar />
        </section>

        {/* Banner */}
        <section className="h-screen snap-start">
          <HeroBanner />
        </section>

        {/* Footer */}
        <section className="snap-start">
          <Footer />
        </section>
        
    </div>
  )
}

export default BookingPage
