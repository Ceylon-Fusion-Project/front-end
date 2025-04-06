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
    accommodationDescription: string;
    location: string;
    accommodationMapLink: string;
    accDemoVideoLink: string; 
    isAvailable: boolean;
    rooms: Room[];
  }

  export interface AccommodationFormValues {
    accommodationCode: string;
    accommodationName: string;
    accommodationType: string;
    accommodationDescription: string;
    location: string;
    accommodationMapLink: string;
    accDemoVideoLink: string; // Optional if not always required
    isAvailable: boolean; // Optional for now
  }
  