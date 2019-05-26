import { elasticsearch as es } from "../../network-sources";
import * as ts from "./cms-search.interfaces";
import * as map from "./cms-search.mappers";

const formatPerformance = (performance: any): ts.ProviderPerformanceDetail => {
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
};

const initServiceStats = (service: string): ts.ServiceStats => {
    return {
        hcpcs_code: service,
        provider_count: 0,
        n_of_svcs: 0,
        avg_submitted_charge_amt: 0,
        avg_mcare_pay_amt: 0,
        avg_mcare_allowed_amt: 0,
        avg_mcare_standardized_amt: 0,
        est_ttl_submitted_charge_amt: 0,
        est_ttl_mcare_pay_amt: 0,
        est_ttl_mcare_allowed_amt: 0,
        est_ttl_mcare_standardized_amt: 0,
    };
};

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
                    lat: geoOptions.location.lat,
                    lon: geoOptions.location.lon,
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

    const records: ts.ProviderPerformanceRecord[] = searchResults.hits.hits.map((record: any) => {
        const source = record._source;
        source.performances = source.performances
            .reduce((accum: ts.ProviderPerformanceDetail[], curr: any)
            : ts.ProviderPerformanceDetail[] => {
                // if they search using hcpcs, only return relevant performance records
                if (hcpcsOptions && hcpcsOptions.hcpcsCodes) {
                    if (hcpcsOptions.hcpcsCodes.includes(curr.hcpcs_code)) {
                        accum.push(formatPerformance(curr));
                    }
                // else send it all
                } else {
                    accum.push(formatPerformance(curr));
                }
                return accum;
            }, []);

        return source;
    });

    return records;
};

export const searchGeoServiceStats = async (
    geoOptions: ts.GeoOptions,
    hcpcsOptions: ts.ServiceOptions,
    entityType: string = "",
    limit: number = 10000,
    offset: number = 0,
): Promise<ts.ServiceStats[]> => {

    const geoProviderQuery = {
        query: {
            bool : genGeoProviderQuery(geoOptions, hcpcsOptions, entityType),
        },
        from: offset,
        size: limit,
    };

    const searchResults = await es.search({
        index: "provider-performance",
        _source: ["performances"],
        body: geoProviderQuery,
    });

    const providerPerformanceRecordsIndexDocs: any[] = searchResults.hits.hits;
    // double reduce. reduce arr performances within arr of providers --> result 1 array of performances
    const providerPerformanceRecords = providerPerformanceRecordsIndexDocs
        .reduce((outerAccum: ts.ProviderPerformanceDetail[], curr: any)
            : ts.ProviderPerformanceDetail[] => {
                const providerPerformances: ts.ProviderPerformanceRecord[] = curr._source.performances;
                return providerPerformances.reduce((innerAccum: ts.ProviderPerformanceDetail[], item: any)
                    : ts.ProviderPerformanceDetail[] => {
                        // if they search using hcpcs, only return relevant performance records
                        if (hcpcsOptions && hcpcsOptions.hcpcsCodes) {
                            if (hcpcsOptions.hcpcsCodes.includes(item.hcpcs_code)) {
                                innerAccum.push(formatPerformance(item));
                            }
                        // else send it all
                        } else {
                            innerAccum.push(formatPerformance(item));
                        }
                        return innerAccum;
                    } , outerAccum);
            }, []);
    const services = new Set(providerPerformanceRecords.map((item: ts.ProviderPerformanceDetail) => item.hcpcs_code));
    const aggregateServiceStats: any = {};
    for (const service of Array.from(services)) {
        const code: string = service.toString();
        aggregateServiceStats[code] = initServiceStats(code);
    }

    for (const providerPerformance of providerPerformanceRecords) {
        const { hcpcs_code: code } = providerPerformance;
        aggregateServiceStats[code].provider_count++;
        aggregateServiceStats[code].n_of_svcs =
            aggregateServiceStats[code].n_of_svcs + providerPerformance.n_of_svcs;

        aggregateServiceStats[code].est_ttl_submitted_charge_amt =
            aggregateServiceStats[code].est_ttl_submitted_charge_amt + providerPerformance.est_ttl_submitted_charge_amt;
        aggregateServiceStats[code].est_ttl_mcare_pay_amt =
            aggregateServiceStats[code].est_ttl_mcare_pay_amt + providerPerformance.est_ttl_mcare_pay_amt;
        aggregateServiceStats[code].est_ttl_mcare_allowed_amt =
            aggregateServiceStats[code].est_ttl_mcare_allowed_amt + (
            providerPerformance.avg_mcare_allowed_amt * providerPerformance.n_of_svcs
        );
        aggregateServiceStats[code].est_ttl_mcare_standardized_amt =
            aggregateServiceStats[code].est_ttl_mcare_standardized_amt + (
            providerPerformance.avg_mcare_standardized_amt * providerPerformance.n_of_svcs
        );
    }

    const serviceStats = Object.keys(aggregateServiceStats).map((hcpcs_code: string) => {
        const rawServiceStats = aggregateServiceStats[hcpcs_code];
        const { provider_count, n_of_svcs, hcpcs_code: dupCode, ...nServiceStats } = rawServiceStats;

        nServiceStats.avg_submitted_charge_amt = nServiceStats.est_ttl_submitted_charge_amt / n_of_svcs;
        nServiceStats.avg_mcare_pay_amt = nServiceStats.est_ttl_mcare_pay_amt / n_of_svcs;
        nServiceStats.avg_mcare_allowed_amt = nServiceStats.est_ttl_mcare_allowed_amt / n_of_svcs;
        nServiceStats.avg_mcare_standardized_amt = nServiceStats.est_ttl_mcare_standardized_amt / n_of_svcs;

        for (const key of Object.keys(nServiceStats)) {
            nServiceStats[key] = parseFloat(nServiceStats[key]).toFixed(2);
        }

        return { hcpcs_code, provider_count, n_of_svcs, ...nServiceStats };
    });
    return serviceStats;
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
