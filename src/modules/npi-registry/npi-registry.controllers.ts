import * as statusCodes from "http-status-codes";
import { Context } from "koa";
import * as Router from "koa-router";

import * as service from "./npi-registry.services";

export const router = new Router<unknown>();

const provider = async (ctx: Context) => {
    const { npi } = ctx.query || null;
    const results = await service.getProvider(npi);
    if (!results) {
        ctx.response.status = statusCodes.BAD_REQUEST;
        ctx.response.body = { message: "record not found", timestamp: Date.now() };
    } else {
        ctx.response.body = results;
    }
};

router.get("/provider", provider);
