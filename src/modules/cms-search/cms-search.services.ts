import { elasticsearch as es } from "../../network-sources";
import * as ts from "./cms-search.interfaces";

const genGeoProviderQuery = (geoOptions: ts.Payload2, hcpcsOptions: ts.Payload3, entityType: string = "") => {
    const payload: ts.Payload1 = {};
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

export const searchGeoProviders = async (
    geoOptions: ts.Payload2,
    hcpcsOptions: ts.Payload3,
    entityType: string = "",
) => {
    const geoProviderQuery = {
        query: {
            bool : genGeoProviderQuery(geoOptions, hcpcsOptions, entityType),
        },
    };
    const searchResults = await es.search({
        index: "provider-performance",
        body: geoProviderQuery,
    });
    return searchResults;
};


export const autocompleteServices = async (search: string = "") => {
    const serviceAutocomplete = {
        query: {
            match : { hcpcs_description: search },
        },
    };
    const searchResults = await es.search({
        index: "services",
        body: serviceAutocomplete,
    });
    return searchResults;
};