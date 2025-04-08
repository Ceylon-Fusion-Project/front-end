// src/types/experienceCenterTypes.ts
export interface ExperienceEvent {
    eventId: number;
    eventName: string;
    eventDescription: string;
    pricePerEvent: number;
    startTime: string;
    endTime: string;
  }
  
  export interface ExperienceCenter {
    experienceCenterId: number;
    experienceCode: string;
    experienceName: string;
    experienceDescription: string;
    location: string;
    locationMapLink: string;
    demoVideoLink: string;
    events: ExperienceEvent[];
  }