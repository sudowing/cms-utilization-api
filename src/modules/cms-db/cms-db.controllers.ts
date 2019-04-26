import * as statusCodes from "http-status-codes";
import { Context } from "koa";
import * as Router from "koa-router";

import { genPaginationOrder } from "../../utils";
import * as svc from "./cms-db.services";

const noRecord = "record not found";

const provider = async (ctx: Context) => {
  const { npi } = ctx.query || null;
  const record = await svc.provider(npi);

  if (!record) {
    ctx.response.status = statusCodes.BAD_REQUEST;
    ctx.response.body = { message: noRecord, timestamp: Date.now() };
  } else {
    ctx.response.body = record;
  }
};

const providerIndividual = async (ctx: Context) => {
  const { npi } = ctx.query || null;
  const record = await svc.providerIndividual(npi);
  if (!record) {
    ctx.response.status = statusCodes.BAD_REQUEST;
    ctx.response.body = { message: noRecord, timestamp: Date.now() };
  } else {
    ctx.response.body = record;
  }
};

const providerOrganization = async (ctx: Context) => {
  const { npi } = ctx.query || null;
  const record = await svc.providerOrganization(npi);
  if (!record) {
    ctx.response.status = statusCodes.BAD_REQUEST;
    ctx.response.body = { message: noRecord, timestamp: Date.now() };
  } else {
    ctx.response.body = record;
  }
};

const providerPerformance = async (ctx: Context) => {
  const { hcpcs, npi } = ctx.query;
  const pagination = genPaginationOrder(ctx.query);

  const results = await svc.providerPerformances({hcpcs, npi}, pagination);
  ctx.response.body = results;
};

const service = async (ctx: Context) => {
  const { hcpcs } = ctx.query || null;
  const record = await svc.service(hcpcs);
  if (!record) {
    ctx.response.status = statusCodes.BAD_REQUEST;
    ctx.response.body = { message: noRecord, timestamp: Date.now() };
  } else {
    ctx.response.body = record;
  }
};

const service_performance = async (ctx: Context) => {
  const { hcpcs } = ctx.query || null;
  const record = await svc.servicePerformance(hcpcs);
  if (!record) {
    ctx.response.status = statusCodes.BAD_REQUEST;
    ctx.response.body = { message: noRecord, timestamp: Date.now() };
  } else {
    ctx.response.body = record;
  }
};

const service_provider_performance = async (ctx: Context) => {
  const { hcpcs, npi } = ctx.query;
  const pagination = genPaginationOrder(ctx.query);
  if (!hcpcs && !npi) {
    ctx.response.status = statusCodes.BAD_REQUEST;
    ctx.response.body = { message: "hcpcs or npi required", timestamp: Date.now() };
  } else {
    const results = await svc.serviceProviderPerformance({hcpcs, npi}, pagination);
    ctx.response.body = results;
  }
};

const service_provider_performance_summary = async (ctx: Context) => {
  const { npi } = ctx.query || null;
  if (!npi) {
    ctx.response.status = statusCodes.BAD_REQUEST;
    ctx.response.body = { message: "npi required", timestamp: Date.now() };
  } else {
    const results = await svc.serviceProviderPerformanceSummary(npi);
    ctx.response.body = results;
  }
};

const service_provider_performance_summary_type = async (ctx: Context) => {
  const { id } = ctx.query || null;
  const results = await svc.serviceProviderPerformanceSummaryType(id);
  ctx.response.body = results;
};

export const router = new Router<unknown>();

router.get("/provider", provider);
router.get("/providers_individual", providerIndividual);
router.get("/providers_organization", providerOrganization);
router.get("/provider_performance", providerPerformance);

router.get("/service", service);
router.get("/service_performance", service_performance);

router.get("/service_provider_performance", service_provider_performance);
router.get("/service_provider_performance_summary", service_provider_performance_summary);
router.get("/service_provider_performance_summary_type", service_provider_performance_summary_type);
