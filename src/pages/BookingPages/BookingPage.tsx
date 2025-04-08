import React from 'react'
import Navbar from '@/components/Navbar'
import HeroBanner from '../../components/BookingComponents/HeroBanner'
import Footer from '@/components/footer'
import BookingArea from '@/components/BookingComponents/BookingArea'

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

        {/* BookingArea */}
        <section className="snap-start">
          <BookingArea />
        </section>

        {/* Footer */}
        <section className="snap-start">
        <div className="[&_.bg-\[\#8d6837\]]:bg-[#346757]">
          <Footer />
        </div>
        </section>
        
    </div>
  )
}

export default BookingPage
