// src/types/experienceCenterTypes.ts
export interface Event {
    eventId: number;
    eventName: string;
    eventDescription: string;
    pricePerEvent: number;
    startTime: string;
    endTime: string;
  }
  
  export interface ExperienceCenter {
    experienceCenterId: number;
    experienceCenterCode: string;
    experienceCenterName: string;
    experienceCenterDescription: string;
    location: string;
    locationMapLink: string;
    demoVideoLink: string;
    events: Event[];
  }