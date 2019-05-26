export interface SearchOptions {
    must?: any[];
    filter?: any;
}

export interface GeoOptions {
    location?: ProviderPerformanceLocation;
    distanceUnit?: string;
    distanceValue?: number;
    top_left?: ProviderPerformanceLocation;
    bottom_right?: ProviderPerformanceLocation;
}

export interface ServiceOptions {
    hcpcsCodes: string[];
    allServices: boolean;
}

export interface ServiceSuggestion {
    hcpcs_code: string;
    hcpcs_description: string;
}

export interface ProviderSuggestion {
    npi: number;
    entity_type: string;
    address_city: string;
    address_state: string;
    gender: string;
    name_first: string;
    name_last: string;
}

export interface ProviderPerformanceDetail {
    npi: number;
    hcpcs_code: string;
    n_of_svcs: number;
    n_of_distinct_mcare_beneficiary_per_day_svcs: number;
    n_of_mcare_beneficiaries: number;
    avg_mcare_pay_amt: number;
    avg_submitted_charge_amt: number;
    avg_mcare_allowed_amt: number;
    avg_mcare_standardized_amt: number;
    est_ttl_mcare_pay_amt: number;
    est_ttl_submitted_charge_amt: number;
    mcare_participation_indicator: boolean;
    place_of_service: string;
    var_avg_mcare_submitted_charge_pay_amt: number;
}

export interface ProviderPerformanceLocation {
    lat: string;
    lon: string;
}

export interface ProviderPerformanceRecord {
    npi: number;
    entity_type: string;
    location: ProviderPerformanceLocation;
    performances: ProviderPerformanceDetail[];
}

export interface ServiceStats {
    hcpcs_code: string;
    provider_count: number;
    n_of_svcs: number;
    avg_submitted_charge_amt: number;
    avg_mcare_pay_amt: number;
    avg_mcare_allowed_amt: number;
    avg_mcare_standardized_amt: number;
    est_ttl_submitted_charge_amt: number;
    est_ttl_mcare_pay_amt: number;
    est_ttl_mcare_allowed_amt: number;
    est_ttl_mcare_standardized_amt: number;
}
