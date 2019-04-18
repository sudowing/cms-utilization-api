import * as ts from "./cms-db.interfaces";
import * as map from "./cms-db.mappers";
import * as qry from "./cms-db.queries";

const whereServiceProvider = (hcpcs: string = "", npi: number = 0): ts.ServiceProviderTerms => {
    const where: ts.ServiceProviderTerms = {};
    if ( hcpcs ) { where.hcpcs_code = hcpcs; }
    if ( npi ) { where.npi = npi; }
    return where;
};

export const provider = async (npi: number = 0) => {
  const results = await qry.providers(npi);
  return results.length ? results[0] as ts.Provider : null;
};

export const providerIndividual = async (npi: number = 0) => {
  const results = await qry.providers_individuals(npi);
  return results.length ? results[0] as ts.ProviderIndividual : null;
};

export const providerOrganization = async (npi: number = 0) => {
  const results = await qry.providers_organizations(npi);
  return results.length ? results[0] as ts.ProviderOrganization : null;
};

export const providerPerformances = async (hcpcs: string = "", npi: number = 0) => {
  const where = whereServiceProvider(hcpcs, npi);
  const results: any = await qry.provider_performance(where);
  return results.map(map.providerPerformances);
};

export const service = async (hcpcs: string = "") => {
  const results = await qry.services(hcpcs);
  return results.length ? results[0] as any : null;
};

export const servicePerformance = async (hcpcs: string = "") => {
  const results = await qry.service_performance(hcpcs);
  return results.length ? results[0] as any : null;
};

export const serviceProviderPerformance = async (hcpcs: string = "", npi: number = 0) => {
  const where = whereServiceProvider(hcpcs, npi);
  const results = await qry.service_provider_performance(where);
  return results;
};

export const serviceProviderPerformanceSummary = async (npi: number = 0) => {
  const results = await qry.service_provider_performance_summary(npi);
  return results;
};

export const serviceProviderPerformanceSummaryType = async (id: number = 0) => {
  const results = await qry.service_provider_performance_summary_type(id);
  return results;
};
