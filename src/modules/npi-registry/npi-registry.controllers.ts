import * as statusCodes from "http-status-codes";
import { Context } from "koa";
import * as Router from "koa-router";

// import * as ts from "./npi-registry.interfaces";
import * as service from "./npi-registry.services";

export const router = new Router<unknown>();

const ping = (ctx: Context) => {
    ctx.response.status = statusCodes.OK;
    ctx.response.body = { message: "hi there", timestamp: Date.now() };
};

const provider = async (ctx: Context) => {
    const { npi } = ctx.query || null;
    const results = await service.getProvider(npi);
    console.log("results: ", results);
    if (!results) {
        ctx.response.status = statusCodes.BAD_REQUEST;
        ctx.response.body = { message: "record not found", timestamp: Date.now() };
    }
    ctx.response.body = results;
};

router.get("/ping", ping);
router.get("/provider", provider);
