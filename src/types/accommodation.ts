// src/types/accommodation.ts
export interface Room {
    roomId: number;
    roomCode: string;
    roomNumber: string;
    roomType: string;
    beds: number;
    pricePerNight: number;
  }
  
  export interface Accommodation {
    accommodationId: number;
    accommodationCode: string;
    accommodationName: string;
    accommodationType: string;
    description: string;
    location: string;
    locationMapLink: string;
    rooms: Room[];
  }