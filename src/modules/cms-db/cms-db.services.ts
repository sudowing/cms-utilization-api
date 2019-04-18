import * as map from "./cms-db.mappers";
import * as qry from "./cms-db.queries";

export interface ServiceProviderTerms {
    npi?: number;
    hcpcs_code?: string;
}

const whereServiceProvider = (hcpcs: string = "", npi: number = 0): ServiceProviderTerms => {
    const where: ServiceProviderTerms = {};
    if ( hcpcs ) { where.hcpcs_code = hcpcs; }
    if ( npi ) { where.npi = npi; }
    return where;
};

export const provider = async (npi: number = 0) => {
  const results = await qry.providers(npi);
  return results.length ? results[0] as any : null;
};

export const providerIndividual = async (npi: number = 0) => {
  const results = await qry.providers_individuals(npi);
  return results.length ? results[0] as any : null;
};

export const providerOrganization = async (npi: number = 0) => {
  const results = await qry.providers_organizations(npi);
  return results.length ? results[0] as any : null;
};

export const providerPerformances = async (hcpcs: string = "", npi: number = 0) => {
  const where = whereServiceProvider(hcpcs, npi);
  const results: any = await qry.provider_performance(where);
  return results;
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
