import * as statusCodes from "http-status-codes";
import { Context } from "koa";
import * as Router from "koa-router";

const ping = (ctx: Context) => {
    ctx.response.status = statusCodes.OK;
    ctx.response.body = { message: "hi there", timestamp: Date.now() };
};

export const router = new Router<unknown>();

router.get("/ping", ping);
