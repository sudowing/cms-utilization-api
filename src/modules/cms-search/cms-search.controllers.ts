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
    // const { hcpcs, npi } = ctx.query;
    // const where: any = {};
    // if ( hcpcs ) { where.hcpcs_code = hcpcs; }
    // if ( npi ) { where.npi = npi; }

    const geo: ts.Payload2 = {
        latitude: 39.8707347,
        longitude: -74.8982277,
        distanceUnit: "miles",
        distanceValue: 3,
    };

    const hcpcs: ts.Payload3 = {
        hcpcsCodes: ["99203", "99213", "99204"],
        allServices: false,
    };

    const results = await service.searchGeoProviders(geo, hcpcs);
    ctx.response.body = results;
};

export const router = new Router<unknown>();

router.get("/ping", ping);

router.get("/provider_performance", providerPerformance);
