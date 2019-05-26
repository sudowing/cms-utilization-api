export const providerPerformanceRecord = (record: any) => {
    record.n_of_svcs = parseInt(record.n_of_svcs, 10)
    record.avg_mcare_pay_amt = parseFloat(record.avg_mcare_pay_amt)
    record.avg_submitted_charge_amt = parseFloat(
        record.avg_submitted_charge_amt
    )
    record.avg_mcare_allowed_amt = parseFloat(record.avg_mcare_allowed_amt)
    record.avg_mcare_standardized_amt = parseFloat(
        record.avg_mcare_standardized_amt
    )
    record.est_ttl_mcare_pay_amt = parseFloat(record.est_ttl_mcare_pay_amt)
    record.est_ttl_submitted_charge_amt = parseFloat(
        record.est_ttl_submitted_charge_amt
    )
    record.var_avg_mcare_submitted_charge_pay_amt = parseFloat(
        record.var_avg_mcare_submitted_charge_pay_amt
    )
    return record
}
