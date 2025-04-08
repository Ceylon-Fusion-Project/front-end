export interface Booking {
    id: string
    type: "accommodation" | "experience"
    name: string
    description: string
    roomType?: string
    duration?: string
    image: string
    location: string
    address: string
    checkInDate: string
    checkOutDate: string
    bookingDate: string
    guests: number
    status: string
    paymentMethod: string
    paymentStatus: string
    basePrice: number
    taxes: number
    totalAmount: number
    rating: number
    reviewCount: number
    hasReviewed: boolean
  }
  
  