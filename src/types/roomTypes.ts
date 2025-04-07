// roomTypes.ts
export enum RoomType {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    SUITE = "SUITE",
    DELUXE = "DELUXE",
  }
  
  export interface Room {
    roomId: number;
    roomCode: string;
    roomNumber: number;
    roomType: RoomType;
    roomImageURLs: string[];
    beds: number;
    pricePerNight: number;
    createdAt?: string;
    updatedAt?: string;
    accommodationId: number;
  }
  