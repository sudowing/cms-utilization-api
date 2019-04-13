import * as statusCodes from "http-status-codes";
import { Context } from "koa";
import * as Router from "koa-router";

import * as qry from "./cms-db.queries";

const ping = (ctx: Context) => {
  ctx.response.status = statusCodes.OK;
  ctx.response.body = { message: "hi there", timestamp: Date.now() };
};

const provider_performance = async (ctx: Context) => {
  const { hcpcs, npi } = ctx.query;
  const where: any = {};
  if ( hcpcs ) { where.hcpcs_code = hcpcs; }
  if ( npi ) { where.npi = npi; }

  const results = await qry.provider_performance(where);
  ctx.response.body = results;
};

const providers = async (ctx: Context) => {
  const { npi } = ctx.query || null;
  const results = await qry.providers(npi);
  ctx.response.body = results;
};

const providers_individuals = async (ctx: Context) => {
  const { npi } = ctx.query || null;
  const results = await qry.providers_individuals(npi);
  ctx.response.body = results;
};

const providers_organizations = async (ctx: Context) => {
  const { npi } = ctx.query || null;
  const results = await qry.providers_organizations(npi);
  ctx.response.body = results;
};

const service_performance = async (ctx: Context) => {
  const { hcpcs } = ctx.query || null;
  const results = await qry.service_performance(hcpcs);
  ctx.response.body = results;
};

const whereServiceProvider = (ctx: Context) => {
  const { hcpcs, npi } = ctx.query;
  const where: any = {};
  if ( hcpcs ) { where.hcpcs_code = hcpcs; }
  if ( npi ) { where.npi = npi; }

  if (!where.hcpcs_code && !where.npi) {
    ctx.status = statusCodes.BAD_REQUEST;
    ctx.response.body = {message: "must send hcpcs or npi"};
  }
  return where;
}

const service_provider_performance = async (ctx: Context) => {
  const where = whereServiceProvider(ctx);
  const results = await qry.service_provider_performance(where);
  ctx.response.body = results;
};

const service_provider_performance_summary = async (ctx: Context) => {
  const { npi } = ctx.query || null;
  const results = await qry.service_provider_performance_summary(npi);
  ctx.response.body = results;
};

const service_provider_performance_summary_type = async (ctx: Context) => {
  const { id } = ctx.query || null;
  const results = await qry.service_provider_performance_summary_type(id);
  ctx.response.body = results;
};

const services = async (ctx: Context) => {
  const { hcpcs } = ctx.query || null;
  const results = await qry.services(hcpcs);
  ctx.response.body = results;
};


export const router = new Router<unknown>();

router.get("/ping", ping);

router.get("/providers", providers);
router.get("/providers_individuals", providers_individuals);
router.get("/providers_organizations", providers_organizations);
router.get("/provider_performance", provider_performance);

router.get("/services", services);
router.get("/service_performance", service_performance);

router.get("/service_provider_performance", service_provider_performance);
router.get("/service_provider_performance_summary", service_provider_performance_summary);
router.get("/service_provider_performance_summary_type", service_provider_performance_summary_type);
