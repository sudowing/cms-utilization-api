import * as statusCodes from "http-status-codes";
import { Context } from "koa";
import * as Router from "koa-router";

import * as ts from "./cms-search.interfaces";
import * as service from "./cms-search.services";

const mapProviderPerformanceRecord = ((record: any) => {
    record.n_of_svcs = parseInt(record.n_of_svcs, 10);
    record.avg_mcare_pay_amt = parseFloat(record.avg_mcare_pay_amt);
    record.avg_submitted_charge_amt = parseFloat(record.avg_submitted_charge_amt);
    record.avg_mcare_allowed_amt = parseFloat(record.avg_mcare_allowed_amt);
    record.avg_mcare_standardized_amt = parseFloat(record.avg_mcare_standardized_amt);
    record.est_ttl_mcare_pay_amt = parseFloat(record.est_ttl_mcare_pay_amt);
    record.est_ttl_submitted_charge_amt = parseFloat(record.est_ttl_submitted_charge_amt);
    record.var_avg_mcare_submitted_charge_pay_amt = parseFloat(record.var_avg_mcare_submitted_charge_pay_amt);
    return record;
});

const ping = (ctx: Context) => {
  ctx.response.status = statusCodes.OK;
  ctx.response.body = { message: "hi there", timestamp: Date.now() };
};

const providerPerformance = async (ctx: Context) => {
    const { geo, hcpcs, entityType, from, size } = ctx.request.body;

    const offset = from || 0;
    const limit = size || 10000;

    if (
        (
            !geo.latitude ||
            !geo.longitude ||
            !geo.distanceValue
        )
        &&
        (
            !geo.top_left ||
            !geo.bottom_right
        )

    ) {
        ctx.status = statusCodes.BAD_REQUEST;
        ctx.response.body = {
            message: "must send geo.latitude, geo.longitude and geo.distanceValue or geo.top_left and geo.bottom_right",
        };
    }

    const geoOptions: ts.Payload2 = {
        latitude: geo.latitude || null,
        longitude: geo.longitude || null,
        distanceUnit: geo.distanceUnit || "miles",
        distanceValue: geo.distanceValue,
        top_left: geo.top_left || null,
        bottom_right: geo.bottom_right || null,
    };

    const hcpcsOptions: ts.Payload3 = {
        hcpcsCodes: hcpcs && hcpcs.codes ? hcpcs.codes : [],
        allServices: hcpcs && hcpcs.hasOwnProperty("all") ? hcpcs.all : false,
    };

    const entityTypeOption = entityType || "";

    const results = await service.searchGeoProviders(geoOptions, hcpcsOptions, entityTypeOption, offset, limit);
    const records = results.hits.hits.map((record: any) => {
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
            return mapProviderPerformanceRecord(remaining);
        });
        return source;
    });
    ctx.response.body = records;

};

const autocompleteServices = async (ctx: Context) => {
    const { qs } = ctx.query;
    if (!qs) {
        ctx.status = statusCodes.BAD_REQUEST;
        ctx.response.body = {message: "must send qs"};
    }

    const results = await service.autocompleteServices(qs);
    const records = results.hits.hits.map((record: any) => {
        const { hcpcs_code, hcpcs_description} = record._source;
        return { hcpcs_code, hcpcs_description };
    });
    ctx.response.body = records;
};

const suggestProviders = async (ctx: Context) => {
    const { qs } = ctx.query;
    if (!qs) {
        ctx.status = statusCodes.BAD_REQUEST;
        ctx.response.body = {message: "must send qs"};
    }

    const results: any = await service.suggestProviders(qs);
    const records = results.suggest.hcpcs_suggest[0].options.map((record: any) => {
        const { suggest, ...rest} = record._source;
        return rest;
    });
    ctx.response.body = records;
};

export const router = new Router<unknown>();

router.get("/ping", ping);

router.get("/provider_performance", providerPerformance);
router.get("/auto_services", autocompleteServices);
router.get("/suggest_providers", suggestProviders);
