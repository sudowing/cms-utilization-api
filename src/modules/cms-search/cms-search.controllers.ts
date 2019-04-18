import * as statusCodes from "http-status-codes";
import { Context } from "koa";
import * as Router from "koa-router";

import * as ts from "./cms-search.interfaces";
import * as service from "./cms-search.services";

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

    const geoOptions: ts.GeoOptions = {
        latitude: geo.latitude || null,
        longitude: geo.longitude || null,
        distanceUnit: geo.distanceUnit || "miles",
        distanceValue: geo.distanceValue,
        top_left: geo.top_left || null,
        bottom_right: geo.bottom_right || null,
    };

    const hcpcsOptions: ts.ServiceOptions = {
        hcpcsCodes: hcpcs && hcpcs.codes ? hcpcs.codes : [],
        allServices: hcpcs && hcpcs.hasOwnProperty("all") ? hcpcs.all : false,
    };

    const entityTypeOption = entityType || "";

    const records = await service.searchGeoProviders(geoOptions, hcpcsOptions, entityTypeOption, offset, limit);
    ctx.response.body = records;

};

const autocompleteServices = async (ctx: Context) => {
    const { qs } = ctx.query;
    if (!qs) {
        ctx.status = statusCodes.BAD_REQUEST;
        ctx.response.body = {message: "must send qs"};
    }

    const records = await service.autocompleteServices(qs);
    ctx.response.body = records;
};

const suggestProviders = async (ctx: Context) => {
    const { qs } = ctx.query;
    if (!qs) {
        ctx.status = statusCodes.BAD_REQUEST;
        ctx.response.body = {message: "must send qs"};
    }

    const records = await service.suggestProviders(qs);
    ctx.response.body = records;
};

export const router = new Router<unknown>();

router.get("/provider_performance", providerPerformance);
router.get("/auto_services", autocompleteServices);
router.get("/suggest_providers", suggestProviders);
