import * as ts from "./cms-db.interfaces";

export const providerPerformances = ((record: any): ts.ProviderPerformance => {
    record.n_of_svcs = parseInt(record.n_of_svcs, 10);
    record.n_of_mcare_beneficiaries = parseInt(record.n_of_mcare_beneficiaries, 10);
    record.n_of_distinct_mcare_beneficiary_per_day_svcs
        = parseInt(record.n_of_distinct_mcare_beneficiary_per_day_svcs, 10);
    record.avg_mcare_allowed_amt = parseFloat(parseFloat(record.avg_mcare_allowed_amt).toFixed(2));
    record.avg_submitted_charge_amt = parseFloat(parseFloat(record.avg_submitted_charge_amt).toFixed(2));
    record.avg_mcare_pay_amt = parseFloat(parseFloat(record.avg_mcare_pay_amt).toFixed(2));
    record.avg_mcare_standardized_amt = parseFloat(parseFloat(record.avg_mcare_standardized_amt).toFixed(2));
    return record;
});