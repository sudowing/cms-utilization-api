import { elasticsearch as es } from "../../network-sources";
import * as ts from "./cms-search.interfaces";
import * as map from "./cms-search.mappers";

const genGeoProviderQuery = (
    geoOptions: ts.GeoOptions,
    hcpcsOptions: ts.ServiceOptions,
    entityType: string = "",
) => {
    const payload: ts.SearchOptions = {};
    let geoFilter;
    if (geoOptions.top_left && geoOptions.bottom_right) {
        geoFilter = {
            geo_bounding_box: {
                location: {
                    top_left: geoOptions.top_left,
                    bottom_right: geoOptions.bottom_right,
                },
            },
        };
    } else {
        geoFilter = {
            geo_distance: {
                distance: `${geoOptions.distanceValue}${geoOptions.distanceUnit}`,
                location: {
                    lat: geoOptions.latitude,
                    lon: geoOptions.longitude,
                },
            },
        };
    }

    payload.filter = geoFilter;
    payload.must = [];
    if (entityType && (entityType === "I" || entityType === "O")) {
        payload.must.push({match: {entity_type: entityType}});
    }
    if (hcpcsOptions && hcpcsOptions.hcpcsCodes && hcpcsOptions.hcpcsCodes.length) {
        const hcpcsSearch = hcpcsOptions.hcpcsCodes.map((item) => ({match: {"performances.hcpcs_code": item}}));
        const mustOrShould = hcpcsOptions.allServices ? "must" : "should";
        const hcpcsAllorAny: any = {};
        hcpcsAllorAny[`${mustOrShould}`] = hcpcsSearch;
        payload.must.push({ bool: hcpcsAllorAny });
    }

    return payload;
};

export const searchGeoProviders = async (
    geoOptions: ts.GeoOptions,
    hcpcsOptions: ts.ServiceOptions,
    entityType: string = "",
    limit: number = 10000,
    offset: number = 0,
): Promise<ts.ProviderPerformanceRecord[]> => {

    const geoProviderQuery = {
        query: {
            bool : genGeoProviderQuery(geoOptions, hcpcsOptions, entityType),
        },
        from: offset,
        size: limit,
    };

    const searchResults = await es.search({
        index: "provider-performance",
        body: geoProviderQuery,
    });

    const records = searchResults.hits.hits.map((record: any) => {
        const source = record._source;
        source.performances = source.performances.map((performance: any) => {
            const {
                rank_n_of_svcs,
                rank_n_of_distinct_mcare_beneficiary_per_day_svcs,
                rank_n_of_mcare_beneficiaries,
                rank_avg_mcare_standardized_amt,
                rank_avg_mcare_allowed_amt,
                rank_avg_submitted_charge_amt,
                rank_avg_mcare_pay_amt,
                rank_est_ttl_mcare_pay_amt,
                rank_est_ttl_submitted_charge_amt,
                rank_var_avg_mcare_submitted_charge_pay_amt,
                ...remaining
            } = performance;
            return map.providerPerformanceRecord(remaining);
        });
        return source;
    });

    return records;
};

export const autocompleteServices = async (
    search: string = "",
    limit: number = 50,
    ): Promise<ts.ServiceSuggestion[]> => {
    const serviceAutocomplete = {
        query: {
            match : { hcpcs_description: search },
        },
        size: limit,
    };
    const searchResults = await es.search({
        index: "services",
        body: serviceAutocomplete,
    });
    const records = searchResults.hits.hits.map((record: any) => {
        const { hcpcs_code, hcpcs_description} = record._source;
        return { hcpcs_code, hcpcs_description };
    });
    return records;
};

export const suggestProviders = async (
    search: string = "",
    limit: number = 50,
    ): Promise<ts.ProviderSuggestion[]> => {
    const suggestProvidersBody = {
        suggest: {
            hcpcs_suggest : {
                prefix : search,
                completion : {
                    field : "suggest",
                    size: limit,
                },
            },
        },
    }
    const searchResults: any = await es.search({
        index: "providers",
        body: suggestProvidersBody,
    });
    const records = searchResults.suggest.hcpcs_suggest[0].options.map((record: any) => {
        const { suggest, ...rest} = record._source;
        return rest;
    });
    return records;
};
