export interface OrderItem {
    id: number
    name: string
    quantity: number
    price: number
    image: string
  }
  
  export interface ShippingAddress {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  
  export interface Order {
    id: string
    date: string
    status: string
    total: number
    items: OrderItem[]
    shippingAddress: ShippingAddress
    paymentMethod: string
    trackingNumber: string
  }
  
  