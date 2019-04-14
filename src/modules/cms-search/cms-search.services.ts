import { elasticsearch as es } from ../../network-sources;

interface Payload1 {
    must?: any[];
    filter?: any;
}

interface Payload2 {
    latitude: number;
    longitude: number;
    distanceUnit: string;
    distanceValue: number;
};

interface Payload3 {
    hcpcsCodes: string[];
    allServices: boolean;
};

const genGeoProviderQuery = (geoOptions: Payload2, hcpcsOptions: Payload3, entityType: string = "") => {
    const payload: Payload1 = {};
    payload.filter = {
        geo_distance: {
            distance: `${geoOptions.distanceValue}${geoOptions.distanceUnit}`,
            location: {
                lat: geoOptions.latitude,
                lon: geoOptions.longitude,
            },
        },
    };
    payload.must = [];
    if (entityType) {
        payload.must.push({match: {entity_type: entityType}});
    }
    if (hcpcsOptions.hcpcsCodes.length) {
        const hcpcsSearch = hcpcsOptions.hcpcsCodes.map((item) => ({match: {"performances.hcpcs_code": item}}));
        const mustOrShould = hcpcsOptions.allServices ? "must" : "should";
        const zzz: any = {};
        zzz[`${mustOrShould}`] = hcpcsSearch;
        payload.must.push({ bool: zzz });
    }
    return payload;
};

const geo: Payload2 = {
    latitude: 39.8707347,
    longitude: -74.8982277,
    distanceUnit: "miles",
    distanceValue: 3,
};

const hcpcs: Payload3 = {
    hcpcsCodes: ["99203", "99213", "99204"],
    allServices: false,
}


const oooo = {
    query: {
        bool : genGeoProviderQuery(geo, hcpcs),
    },
};
