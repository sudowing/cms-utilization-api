import * as ts from "./cms-db.interfaces";
import * as map from "./cms-db.mappers";
import * as qry from "./cms-db.queries";

const whereServiceProvider = (searchOptions: any = {
  hcpcs_code: "", npi: 0,
}): ts.ServiceProviderTerms => {
    const where: ts.ServiceProviderTerms = {};
    if ( searchOptions.hcpcs_code ) { where.hcpcs_code = searchOptions.hcpcs_code; }
    if ( searchOptions.npi ) { where.npi = searchOptions.npi; }
    return where;
};

export const provider = async (npi: number = 0): Promise<ts.Provider> => {
  const results = await qry.providers(npi);
  return results.length ? results[0] as ts.Provider : null;
};

export const providerIndividual = async (npi: number = 0): Promise<ts.ProviderIndividual> => {
  const results = await qry.providers_individuals(npi);
  return results.length ? results[0] as ts.ProviderIndividual : null;
};

export const providerOrganization = async (npi: number = 0): Promise<ts.ProviderOrganization> => {
  const results = await qry.providers_organizations(npi);
  return results.length ? results[0] as ts.ProviderOrganization : null;
};

export const providerPerformances = async (
  searchOptions: any = {
    hcpcs_code: "", npi: 0,
  },
  pagination: any,
): Promise<ts.ProviderPerformance[]> => {
  const where = whereServiceProvider(searchOptions);
  const results: any = await qry.provider_performance(where, pagination);
  return results.map(map.providerPerformances) as ts.ProviderPerformance[];
};

export const countProviderPerformances = async (
  searchOptions: any = {
    hcpcs_code: "", npi: 0,
  },
): Promise<any> => {
  const where = whereServiceProvider(searchOptions);
  const count: number = await qry.count_provider_performance(where);
  return count;
};


export const service = async (hcpcs: string = ""): Promise<ts.Service> => {
  const results = await qry.services(hcpcs);
  return results.length ? results[0] as ts.Service : null;
};

export const servicePerformance = async (hcpcs: string = "")
  : Promise<ts.ServicePerformance[]> => {
  const results = await qry.service_performance(hcpcs);
  return results.length ? results.map(map.servicePerformance) : null;
};

export const serviceProviderPerformance = async (
  searchOptions: any = {
    hcpcs_code: "", npi: 0,
  },
  pagination: any,
):
  Promise<ts.ServiceProviderPerformance[]> => {
  const where = whereServiceProvider(searchOptions);
  const results = await qry.service_provider_performance(where, pagination);
  return results.length ? results.map(map.serviceProviderPerformance) : null;
};

export const countServiceProviderPerformance = async (
  searchOptions: any = {
    hcpcs_code: "", npi: 0,
  },
):
  Promise<any> => {
  const where = whereServiceProvider(searchOptions);
  const count: number = await qry.count_service_provider_performance(where);
  return count;
};

export const serviceProviderPerformanceSummary = async (npi: number = 0)
  : Promise<ts.ServiceProviderPerformanceSummary[]> => {
  const results = await qry.service_provider_performance_summary(npi);
  return results.length ? results.map(map.serviceProviderPerformanceSummary) : null;
};

export const serviceProviderPerformanceSummaryType = async (id: number = 0)
  : Promise<ts.ServiceProviderPerformanceSummaryType[]> => {
  const results = await qry.service_provider_performance_summary_type(id);
  return results;
};
