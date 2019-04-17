export interface Payload1 {
    must?: any[];
    filter?: any;
};

export interface Payload2 {
    latitude?: number;
    longitude?: number;
    distanceUnit?: string;
    distanceValue?: number;
    top_left?: any;
    bottom_right?: any;
};

export interface Payload3 {
    hcpcsCodes: string[];
    allServices: boolean;
};
