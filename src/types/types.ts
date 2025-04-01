// types.ts
export interface Origin {
    originID?: number; // Optional for new origins
    stateLocation: string;
    stateMapLink: string;
    partOfPlant: string;
    originDescription: string;
    factoryName: string;
    factoryAddress: string;
    factoryMapLink: string;
    demoVideoLink: string;
    createdDate?: string; // Optional
    updatedDate?: string; // Optional
    originCode: string;
  }