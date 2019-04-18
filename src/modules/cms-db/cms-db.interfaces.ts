// providers
export interface Provider {
    npi: number;
    entity_type: string;
    provider_type: string;
    address_street_01: string;
    address_street_02: string|null;
    address_city: string;
    address_zip_code: string;
    address_state: string;
    address_country: string;
    address_latitude: string;
    address_longitude: string;
};

export interface ProviderIndividual {
    npi: number;
    name_last: string;
    name_first: string;
    name_middle: string;
    credentials: string;
    gender: string;
};

export interface ProviderOrganization {
    npi: number;
    name: string;
};

export interface ProviderPerformance {
    npi: number;
    mcare_participation_indicator: string;
    place_of_service: string;
    hcpcs_code: string;
    n_of_svcs: number;
    n_of_mcare_beneficiaries: number;
    n_of_distinct_mcare_beneficiary_per_day_svcs: number;
    avg_mcare_allowed_amt: number;
    avg_submitted_charge_amt: number;
    avg_mcare_pay_amt: number;
    avg_mcare_standardized_amt: number;
    prisma_id: number;
};
// services
// [
//     {
//         "hcpcs_code": "11750",
//         "hcpcs_description": "Removal of nail",
//         "hcpcs_drug_indicator": "N"
//     }
// ]

// service_performance
// "hcpcs_code": "00120",
// "entity_type": "I",
// "providers": "120",
// "n_of_svcs": "2643",
// "n_of_distinct_mcare_beneficiary_per_day_svcs": "2643",
// "n_of_mcare_beneficiaries": "2366",
// "avg_avg_mcare_pay_amt": "153.5457220367500000",
// "avg_avg_submitted_charge_amt": "1641.1967590876666667",
// "avg_avg_mcare_allowed_amt": "198.4330608313750000",
// "avg_avg_mcare_standardized_amt": "153.6243475798333333",
// "min_avg_mcare_pay_amt": "56.865",
// "max_avg_mcare_pay_amt": "346.31818182",
// "var_avg_mcare_pay_amt": "289.45318182",
// "min_avg_mcare_allowed_amt": "72.645277778",
// "max_avg_mcare_allowed_amt": "441.73363636",
// "var_avg_mcare_allowed_amt": "369.088358582",
// "min_avg_submitted_charge_amt": "214.28571429",
// "max_avg_submitted_charge_amt": "4820.5128205",
// "var_avg_submitted_charge_amt": "4606.22710621",
// "min_avg_mcare_standardized_amt": "59.816388889",
// "max_avg_mcare_standardized_amt": "344.67473684",
// "var_avg_mcare_standardized_amt": "284.858347951",
// "est_ttl_mcare_pay_amt": "405821.3433431302500000",
// "est_ttl_submitted_charge_amt": "4337683.0342687030000881",
// "est_ttl_mcare_allowed_amt": "524458.5797773241250000",
// "est_ttl_mcare_standardized_amt": "406029.1506534994999119",
// "rank_providers": "1855",
// "rank_n_of_svcs": "2272",
// "rank_n_of_distinct_mcare_beneficiary_per_day_svcs": "2158",
// "rank_n_of_mcare_beneficiaries": "2041",
// "rank_avg_avg_mcare_pay_amt": "2287",
// "rank_avg_avg_submitted_charge_amt": "1359",
// "rank_avg_avg_mcare_allowed_amt": "2271",
// "rank_avg_avg_mcare_standardized_amt": "2283",
// "rank_min_avg_mcare_pay_amt": "2553",
// "rank_max_avg_mcare_pay_amt": "1688",
// "rank_var_avg_mcare_pay_amt": "1069",
// "rank_min_avg_mcare_allowed_amt": "2636",
// "rank_max_avg_mcare_allowed_amt": "1687",
// "rank_var_avg_mcare_allowed_amt": "1054",
// "rank_min_avg_submitted_charge_amt": "2362",
// "rank_max_avg_submitted_charge_amt": "1182",
// "rank_var_avg_submitted_charge_amt": "992",
// "rank_min_avg_mcare_standardized_amt": "2511",
// "rank_max_avg_mcare_standardized_amt": "1585",
// "rank_var_avg_mcare_standardized_amt": "946",
// "rank_est_ttl_mcare_pay_amt": "1935",
// "rank_est_ttl_submitted_charge_amt": "1502",
// "rank_est_ttl_mcare_allowed_amt": "1932",
// "rank_est_ttl_mcare_standardized_amt": "1936",
// "var_avg_mcare_submitted_charge_pay_amt": "1487.6510370509166667",
// "rank_var_avg_mcare_submitted_charge_pay_amt": "1177",
// "prisma_id": 1936

// service_provider_performance
// "hcpcs_code": "00103",
// "npi": 1003082041,
// "entity_type": "I",
// "n_of_svcs": "22",
// "n_of_distinct_mcare_beneficiary_per_day_svcs": 22,
// "n_of_mcare_beneficiaries": 21,
// "avg_mcare_pay_amt": "64.815",
// "avg_submitted_charge_amt": "1034.3454545",
// "avg_mcare_allowed_amt": "85.811818182",
// "avg_mcare_standardized_amt": "67.333181818",
// "est_ttl_mcare_pay_amt": "1425.930",
// "est_ttl_submitted_charge_amt": "22755.5999990",
// "rank_n_of_svcs": "992",
// "rank_n_of_distinct_mcare_beneficiary_per_day_svcs": "991",
// "rank_n_of_mcare_beneficiaries": "1035",
// "rank_avg_mcare_standardized_amt": "2407",
// "rank_avg_mcare_allowed_amt": "2430",
// "rank_avg_submitted_charge_amt": "927",
// "rank_avg_mcare_pay_amt": "2443",
// "rank_est_ttl_mcare_pay_amt": "1902",
// "rank_est_ttl_submitted_charge_amt": "944",
// "mcare_participation_indicator": "Y",
// "place_of_service": "F",
// "var_avg_mcare_submitted_charge_pay_amt": "969.5304545",
// "rank_var_avg_mcare_submitted_charge_pay_amt": "805",
// "prisma_id": 1047

// service_provider_performance_summary
// "npi": 1003082041,
// "entity_type": "I",
// "ttl_hcpcs_code": "11",
// "ttl_n_of_svcs": "248",
// "est_ttl_submitted_charge_amt": "247814.53000004",
// "est_ttl_mcare_pay_amt": "16340.229999964",
// "var_est_ttl_mcare_submitted_charge_pay_amt": "231474.300000076",
// "est_ttl_mcare_pay_amt_by_ttl_hcpcs_code": "1485.4754545421818182",
// "est_ttl_mcare_pay_amt_by_ttl_n_of_svcs": "65.8880241934032258",
// "rank_ttl_hcpcs_code": "252577",
// "rank_ttl_n_of_svcs": "631107",
// "rank_est_ttl_submitted_charge_amt": "257445",
// "rank_est_ttl_mcare_pay_amt": "593405",
// "rank_var_est_ttl_mcare_submitted_charge_pay_amoun": "195538",
// "rank_est_ttl_mcare_pay_amt_by_ttl_hcpcs_code": "809382",
// "rank_est_ttl_mcare_pay_amt_by_ttl_n_of_servi": "342927",
// "summary_type": 1,
// "prisma_id": 342928


// service_provider_performance_summary_type
// "id": 1,
// "slug": "overall",
// "description": "Overall Summary",
// "group_membership": false


export interface ServiceProviderTerms {
    npi?: number;
    hcpcs_code?: string;
}