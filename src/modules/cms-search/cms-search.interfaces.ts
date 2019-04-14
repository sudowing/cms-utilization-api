export interface Payload1 {
    must?: any[];
    filter?: any;
};

export interface Payload2 {
    latitude: number;
    longitude: number;
    distanceUnit: string;
    distanceValue: number;
};

export interface Payload3 {
    hcpcsCodes: string[];
    allServices: boolean;
};
