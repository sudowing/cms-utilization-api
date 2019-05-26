import * as ts from './cms-db.interfaces';

const formatLongFloatString = (longFloatString: string): number => {
    return parseFloat(parseFloat(longFloatString).toFixed(2));
};

export const providerPerformances = (record: any): ts.ProviderPerformance => {
    record.n_of_svcs = parseInt(record.n_of_svcs, 10);
    record.n_of_mcare_beneficiaries = parseInt(
        record.n_of_mcare_beneficiaries,
        10,
    );
    record.n_of_distinct_mcare_beneficiary_per_day_svcs = parseInt(
        record.n_of_distinct_mcare_beneficiary_per_day_svcs,
        10,
    );
    record.avg_mcare_allowed_amt = formatLongFloatString(
        record.avg_mcare_allowed_amt,
    );
    record.avg_submitted_charge_amt = formatLongFloatString(
        record.avg_submitted_charge_amt,
    );
    record.avg_mcare_pay_amt = formatLongFloatString(record.avg_mcare_pay_amt);
    record.avg_mcare_standardized_amt = formatLongFloatString(
        record.avg_mcare_standardized_amt,
    );
    return record;
};

export const servicePerformance = (record: any): ts.ServicePerformance => {
    record.providers = parseInt(record.providers, 10);
    record.n_of_svcs = parseInt(record.n_of_svcs, 10);
    record.n_of_distinct_mcare_beneficiary_per_day_svcs = parseInt(
        record.n_of_distinct_mcare_beneficiary_per_day_svcs,
        10,
    );
    record.n_of_mcare_beneficiaries = formatLongFloatString(
        record.n_of_mcare_beneficiaries,
    );
    record.avg_avg_mcare_pay_amt = formatLongFloatString(
        record.avg_avg_mcare_pay_amt,
    );
    record.avg_avg_submitted_charge_amt = formatLongFloatString(
        record.avg_avg_submitted_charge_amt,
    );
    record.avg_avg_mcare_allowed_amt = formatLongFloatString(
        record.avg_avg_mcare_allowed_amt,
    );
    record.avg_avg_mcare_standardized_amt = formatLongFloatString(
        record.avg_avg_mcare_standardized_amt,
    );
    record.min_avg_mcare_pay_amt = formatLongFloatString(
        record.min_avg_mcare_pay_amt,
    );
    record.max_avg_mcare_pay_amt = formatLongFloatString(
        record.max_avg_mcare_pay_amt,
    );
    record.var_avg_mcare_pay_amt = formatLongFloatString(
        record.var_avg_mcare_pay_amt,
    );
    record.min_avg_mcare_allowed_amt = formatLongFloatString(
        record.min_avg_mcare_allowed_amt,
    );
    record.max_avg_mcare_allowed_amt = formatLongFloatString(
        record.max_avg_mcare_allowed_amt,
    );
    record.var_avg_mcare_allowed_amt = formatLongFloatString(
        record.var_avg_mcare_allowed_amt,
    );
    record.min_avg_submitted_charge_amt = formatLongFloatString(
        record.min_avg_submitted_charge_amt,
    );
    record.max_avg_submitted_charge_amt = formatLongFloatString(
        record.max_avg_submitted_charge_amt,
    );
    record.var_avg_submitted_charge_amt = formatLongFloatString(
        record.var_avg_submitted_charge_amt,
    );
    record.min_avg_mcare_standardized_amt = formatLongFloatString(
        record.min_avg_mcare_standardized_amt,
    );
    record.max_avg_mcare_standardized_amt = formatLongFloatString(
        record.max_avg_mcare_standardized_amt,
    );
    record.var_avg_mcare_standardized_amt = formatLongFloatString(
        record.var_avg_mcare_standardized_amt,
    );
    record.est_ttl_mcare_pay_amt = formatLongFloatString(
        record.est_ttl_mcare_pay_amt,
    );
    record.est_ttl_submitted_charge_amt = formatLongFloatString(
        record.est_ttl_submitted_charge_amt,
    );
    record.est_ttl_mcare_allowed_amt = formatLongFloatString(
        record.est_ttl_mcare_allowed_amt,
    );
    record.est_ttl_mcare_standardized_amt = formatLongFloatString(
        record.est_ttl_mcare_standardized_amt,
    );
    record.var_avg_mcare_submitted_charge_pay_amt = formatLongFloatString(
        record.var_avg_mcare_submitted_charge_pay_amt,
    );
    record.rank_var_avg_mcare_submitted_charge_pay_amt = parseInt(
        record.rank_var_avg_mcare_submitted_charge_pay_amt,
        10,
    );
    record.rank_providers = parseInt(record.rank_providers, 10);
    record.rank_n_of_svcs = parseInt(record.rank_n_of_svcs, 10);
    record.rank_n_of_distinct_mcare_beneficiary_per_day_svcs = parseInt(
        record.rank_n_of_distinct_mcare_beneficiary_per_day_svcs,
        10,
    );
    record.rank_n_of_mcare_beneficiaries = parseInt(
        record.rank_n_of_mcare_beneficiaries,
        10,
    );
    record.rank_avg_avg_mcare_pay_amt = parseInt(
        record.rank_avg_avg_mcare_pay_amt,
        10,
    );
    record.rank_avg_avg_submitted_charge_amt = parseInt(
        record.rank_avg_avg_submitted_charge_amt,
        10,
    );
    record.rank_avg_avg_mcare_allowed_amt = parseInt(
        record.rank_avg_avg_mcare_allowed_amt,
        10,
    );
    record.rank_avg_avg_mcare_standardized_amt = parseInt(
        record.rank_avg_avg_mcare_standardized_amt,
        10,
    );
    record.rank_min_avg_mcare_pay_amt = parseInt(
        record.rank_min_avg_mcare_pay_amt,
        10,
    );
    record.rank_max_avg_mcare_pay_amt = parseInt(
        record.rank_max_avg_mcare_pay_amt,
        10,
    );
    record.rank_var_avg_mcare_pay_amt = parseInt(
        record.rank_var_avg_mcare_pay_amt,
        10,
    );
    record.rank_min_avg_mcare_allowed_amt = parseInt(
        record.rank_min_avg_mcare_allowed_amt,
        10,
    );
    record.rank_max_avg_mcare_allowed_amt = parseInt(
        record.rank_max_avg_mcare_allowed_amt,
        10,
    );
    record.rank_var_avg_mcare_allowed_amt = parseInt(
        record.rank_var_avg_mcare_allowed_amt,
        10,
    );
    record.rank_min_avg_submitted_charge_amt = parseInt(
        record.rank_min_avg_submitted_charge_amt,
        10,
    );
    record.rank_max_avg_submitted_charge_amt = parseInt(
        record.rank_max_avg_submitted_charge_amt,
        10,
    );
    record.rank_var_avg_submitted_charge_amt = parseInt(
        record.rank_var_avg_submitted_charge_amt,
        10,
    );
    record.rank_min_avg_mcare_standardized_amt = parseInt(
        record.rank_min_avg_mcare_standardized_amt,
        10,
    );
    record.rank_max_avg_mcare_standardized_amt = parseInt(
        record.rank_max_avg_mcare_standardized_amt,
        10,
    );
    record.rank_var_avg_mcare_standardized_amt = parseInt(
        record.rank_var_avg_mcare_standardized_amt,
        10,
    );
    record.rank_est_ttl_mcare_pay_amt = parseInt(
        record.rank_est_ttl_mcare_pay_amt,
        10,
    );
    record.rank_est_ttl_submitted_charge_amt = parseInt(
        record.rank_est_ttl_submitted_charge_amt,
        10,
    );
    record.rank_est_ttl_mcare_allowed_amt = parseInt(
        record.rank_est_ttl_mcare_allowed_amt,
        10,
    );
    record.rank_est_ttl_mcare_standardized_amt = parseInt(
        record.rank_est_ttl_mcare_standardized_amt,
        10,
    );
    return record;
};

export const serviceProviderPerformance = (
    record: any,
): ts.ServiceProviderPerformance => {
    record.avg_mcare_pay_amt = formatLongFloatString(record.avg_mcare_pay_amt);
    record.avg_submitted_charge_amt = formatLongFloatString(
        record.avg_submitted_charge_amt,
    );
    record.avg_mcare_allowed_amt = formatLongFloatString(
        record.avg_mcare_allowed_amt,
    );
    record.avg_mcare_standardized_amt = formatLongFloatString(
        record.avg_mcare_standardized_amt,
    );
    record.est_ttl_mcare_pay_amt = formatLongFloatString(
        record.est_ttl_mcare_pay_amt,
    );
    record.est_ttl_submitted_charge_amt = formatLongFloatString(
        record.est_ttl_submitted_charge_amt,
    );
    record.var_avg_mcare_submitted_charge_pay_amt = formatLongFloatString(
        record.var_avg_mcare_submitted_charge_pay_amt,
    );
    record.n_of_svcs = parseInt(record.n_of_svcs, 10);
    record.rank_n_of_svcs = parseInt(record.rank_n_of_svcs, 10);
    record.rank_n_of_distinct_mcare_beneficiary_per_day_svcs = parseInt(
        record.rank_n_of_distinct_mcare_beneficiary_per_day_svcs,
        10,
    );
    record.rank_n_of_mcare_beneficiaries = parseInt(
        record.rank_n_of_mcare_beneficiaries,
        10,
    );
    record.rank_avg_mcare_standardized_amt = parseInt(
        record.rank_avg_mcare_standardized_amt,
        10,
    );
    record.rank_avg_mcare_allowed_amt = parseInt(
        record.rank_avg_mcare_allowed_amt,
        10,
    );
    record.rank_avg_submitted_charge_amt = parseInt(
        record.rank_avg_submitted_charge_amt,
        10,
    );
    record.rank_avg_mcare_pay_amt = parseInt(record.rank_avg_mcare_pay_amt, 10);
    record.rank_est_ttl_mcare_pay_amt = parseInt(
        record.rank_est_ttl_mcare_pay_amt,
        10,
    );
    record.rank_est_ttl_submitted_charge_amt = parseInt(
        record.rank_est_ttl_submitted_charge_amt,
        10,
    );
    record.rank_var_avg_mcare_submitted_charge_pay_amt = parseInt(
        record.rank_var_avg_mcare_submitted_charge_pay_amt,
        10,
    );
    return record;
};

export const serviceProviderPerformanceSummary = (
    record: any,
): ts.ServiceProviderPerformanceSummary => {
    record.ttl_hcpcs_code = formatLongFloatString(record.ttl_hcpcs_code);
    record.ttl_n_of_svcs = formatLongFloatString(record.ttl_n_of_svcs);
    record.est_ttl_submitted_charge_amt = formatLongFloatString(
        record.est_ttl_submitted_charge_amt,
    );
    record.est_ttl_mcare_pay_amt = formatLongFloatString(
        record.est_ttl_mcare_pay_amt,
    );
    record.var_est_ttl_mcare_submitted_charge_pay_amt = formatLongFloatString(
        record.var_est_ttl_mcare_submitted_charge_pay_amt,
    );
    record.est_ttl_mcare_pay_amt_by_ttl_hcpcs_code = formatLongFloatString(
        record.est_ttl_mcare_pay_amt_by_ttl_hcpcs_code,
    );
    record.est_ttl_mcare_pay_amt_by_ttl_n_of_svcs = formatLongFloatString(
        record.est_ttl_mcare_pay_amt_by_ttl_n_of_svcs,
    );
    record.rank_ttl_hcpcs_code = parseInt(record.rank_ttl_hcpcs_code, 10);
    record.rank_ttl_n_of_svcs = parseInt(record.rank_ttl_n_of_svcs, 10);
    record.rank_est_ttl_submitted_charge_amt = parseInt(
        record.rank_est_ttl_submitted_charge_amt,
        10,
    );
    record.rank_est_ttl_mcare_pay_amt = parseInt(
        record.rank_est_ttl_mcare_pay_amt,
        10,
    );
    record.rank_var_est_ttl_mcare_submitted_charge_pay_amoun = parseInt(
        record.rank_var_est_ttl_mcare_submitted_charge_pay_amoun,
        10,
    );
    record.rank_est_ttl_mcare_pay_amt_by_ttl_hcpcs_code = parseInt(
        record.rank_est_ttl_mcare_pay_amt_by_ttl_hcpcs_code,
        10,
    );
    record.rank_est_ttl_mcare_pay_amt_by_ttl_n_of_servi = parseInt(
        record.rank_est_ttl_mcare_pay_amt_by_ttl_n_of_servi,
        10,
    );
    return record;
};
