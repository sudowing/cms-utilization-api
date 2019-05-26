// providers
export interface Provider {
    npi: number
    entity_type: string
    provider_type: string
    address_street_01: string
    address_street_02: string | null
    address_city: string
    address_zip_code: string
    address_state: string
    address_country: string
    address_latitude: string
    address_longitude: string
}

export interface ProviderIndividual {
    npi: number
    name_last: string
    name_first: string
    name_middle: string
    credentials: string
    gender: string
}

export interface ProviderOrganization {
    npi: number
    name: string
}

export interface ProviderPerformance {
    npi: number
    mcare_participation_indicator: string
    place_of_service: string
    hcpcs_code: string
    n_of_svcs: number
    n_of_mcare_beneficiaries: number
    n_of_distinct_mcare_beneficiary_per_day_svcs: number
    avg_mcare_allowed_amt: number
    avg_submitted_charge_amt: number
    avg_mcare_pay_amt: number
    avg_mcare_standardized_amt: number
    prisma_id: number
}

export interface Service {
    hcpcs_code: string
    hcpcs_description: string
    hcpcs_drug_indicator: string
}

export interface ServicePerformance {
    hcpcs_code: string
    entity_type: string
    providers: number
    n_of_svcs: number
    n_of_distinct_mcare_beneficiary_per_day_svcs: number
    n_of_mcare_beneficiaries: number
    avg_avg_mcare_pay_amt: number
    avg_avg_submitted_charge_amt: number
    avg_avg_mcare_allowed_amt: number
    avg_avg_mcare_standardized_amt: number
    min_avg_mcare_pay_amt: number
    max_avg_mcare_pay_amt: number
    var_avg_mcare_pay_amt: number
    min_avg_mcare_allowed_amt: number
    max_avg_mcare_allowed_amt: number
    var_avg_mcare_allowed_amt: number
    min_avg_submitted_charge_amt: number
    max_avg_submitted_charge_amt: number
    var_avg_submitted_charge_amt: number
    min_avg_mcare_standardized_amt: number
    max_avg_mcare_standardized_amt: number
    var_avg_mcare_standardized_amt: number
    est_ttl_mcare_pay_amt: number
    est_ttl_submitted_charge_amt: number
    est_ttl_mcare_allowed_amt: number
    est_ttl_mcare_standardized_amt: number
    rank_providers: number
    rank_n_of_svcs: number
    rank_n_of_distinct_mcare_beneficiary_per_day_svcs: number
    rank_n_of_mcare_beneficiaries: number
    rank_avg_avg_mcare_pay_amt: number
    rank_avg_avg_submitted_charge_amt: number
    rank_avg_avg_mcare_allowed_amt: number
    rank_avg_avg_mcare_standardized_amt: number
    rank_min_avg_mcare_pay_amt: number
    rank_max_avg_mcare_pay_amt: number
    rank_var_avg_mcare_pay_amt: number
    rank_min_avg_mcare_allowed_amt: number
    rank_max_avg_mcare_allowed_amt: number
    rank_var_avg_mcare_allowed_amt: number
    rank_min_avg_submitted_charge_amt: number
    rank_max_avg_submitted_charge_amt: number
    rank_var_avg_submitted_charge_amt: number
    rank_min_avg_mcare_standardized_amt: number
    rank_max_avg_mcare_standardized_amt: number
    rank_var_avg_mcare_standardized_amt: number
    rank_est_ttl_mcare_pay_amt: number
    rank_est_ttl_submitted_charge_amt: number
    rank_est_ttl_mcare_allowed_amt: number
    rank_est_ttl_mcare_standardized_amt: number
    var_avg_mcare_submitted_charge_pay_amt: number
    rank_var_avg_mcare_submitted_charge_pay_amt: number
    prisma_id: number
}

export interface ServiceProviderPerformance {
    hcpcs_code: string
    npi: number
    entity_type: string
    n_of_svcs: number
    n_of_distinct_mcare_beneficiary_per_day_svcs: number
    n_of_mcare_beneficiaries: number
    avg_mcare_pay_amt: number
    avg_submitted_charge_amt: number
    avg_mcare_allowed_amt: number
    avg_mcare_standardized_amt: number
    est_ttl_mcare_pay_amt: number
    est_ttl_submitted_charge_amt: number
    rank_n_of_svcs: number
    rank_n_of_distinct_mcare_beneficiary_per_day_svcs: number
    rank_n_of_mcare_beneficiaries: number
    rank_avg_mcare_standardized_amt: number
    rank_avg_mcare_allowed_amt: number
    rank_avg_submitted_charge_amt: number
    rank_avg_mcare_pay_amt: number
    rank_est_ttl_mcare_pay_amt: number
    rank_est_ttl_submitted_charge_amt: number
    mcare_participation_indicator: number
    place_of_service: number
    var_avg_mcare_submitted_charge_pay_amt: number
    rank_var_avg_mcare_submitted_charge_pay_amt: number
    prisma_id: number
}

export interface ServiceProviderPerformanceSummary {
    npi: number
    entity_type: string
    ttl_hcpcs_code: number
    ttl_n_of_svcs: number
    est_ttl_submitted_charge_amt: number
    est_ttl_mcare_pay_amt: number
    var_est_ttl_mcare_submitted_charge_pay_amt: number
    est_ttl_mcare_pay_amt_by_ttl_hcpcs_code: number
    est_ttl_mcare_pay_amt_by_ttl_n_of_svcs: number
    rank_ttl_hcpcs_code: number
    rank_ttl_n_of_svcs: number
    rank_est_ttl_submitted_charge_amt: number
    rank_est_ttl_mcare_pay_amt: number
    rank_var_est_ttl_mcare_submitted_charge_pay_amoun: number
    rank_est_ttl_mcare_pay_amt_by_ttl_hcpcs_code: number
    rank_est_ttl_mcare_pay_amt_by_ttl_n_of_servi: number
    summary_type: number
    prisma_id: number
}

export interface ServiceProviderPerformanceSummaryType {
    id: number
    slug: string
    description: string
    group_membership: boolean
}

export interface ServiceProviderTerms {
    npi?: number
    hcpcs_code?: string
}
