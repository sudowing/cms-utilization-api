import * as statusCodes from "http-status-codes";
import { Context } from "koa";
import * as Router from "koa-router";

import * as ts from "./cms-search.interfaces";
import * as service from "./cms-search.services";

const ping = (ctx: Context) => {
  ctx.response.status = statusCodes.OK;
  ctx.response.body = { message: "hi there", timestamp: Date.now() };
};

const providerPerformance = async (ctx: Context) => {
    const { geo, hcpcs, entityType } = ctx.request.body;

    if (
        !geo.latitude ||
        !geo.longitude ||
        !geo.distanceValue
    ) {
        ctx.status = statusCodes.BAD_REQUEST;
        ctx.response.body = {message: "must send geo.latitude, geo.longitude and geo.distanceValue"};
    }

    const geoOptions: ts.Payload2 = {
        latitude: geo.latitude,
        longitude: geo.longitude,
        distanceUnit: geo.distanceUnit || "miles",
        distanceValue: geo.distanceValue,
    };

    const hcpcsOptions: ts.Payload3 = {
        hcpcsCodes: hcpcs.codes || [],
        allServices: hcpcs.all || false,
    };

    const entityTypeOption = entityType || "";

    const results = await service.searchGeoProviders(geoOptions, hcpcsOptions, entityTypeOption);
    ctx.response.body = results;
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

