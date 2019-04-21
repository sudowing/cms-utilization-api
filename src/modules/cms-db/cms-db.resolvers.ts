import { genPaginationOrder } from "../../utils";
import * as ts from "./cms-db.interfaces";
import * as svc from "./cms-db.services";

export const resolvers = {
  Query: {
    async provider(obj: any, args: any, context: any, info: any): Promise<ts.Provider[]> {
      const { npis } = args.input;
      return await svc.provider(npis);
    },
    async providerIndividual(obj: any, args: any, context: any, info: any): Promise<ts.ProviderIndividual[]> {
      const { npis } = args.input;
      return await svc.providerIndividual(npis);
    },
    async providerOrganization(obj: any, args: any, context: any, info: any): Promise<ts.ProviderOrganization[]> {
      const { npis } = args.input;
      return await svc.providerOrganization(npis);
    },
    async providerPerformances(obj: any, args: any, context: any, info: any): Promise<ts.ProviderPerformance[]> {
      const { npi, hcpcs_code } = args.input;
      const pagination = genPaginationOrder(args.pagination);
      return await svc.providerPerformances({ npi, hcpcs_code }, pagination);
      // can be called the other way
    },
    async service(obj: any, args: any, context: any, info: any): Promise<ts.Service[]> {
      const { hcpcs_codes } = args.input;
      return await svc.service(hcpcs_codes);
    },
    async servicePerformance(obj: any, args: any, context: any, info: any): Promise<ts.ServicePerformance[]> {
      const { hcpcs_codes } = args.input;
      return await svc.servicePerformance(hcpcs_codes);
    },
    async serviceProviderPerformance(obj: any, args: any, context: any, info: any)
      : Promise<ts.ServiceProviderPerformance[]> {
      const { npi, hcpcs_code } = args.input;
      const pagination = genPaginationOrder(args.pagination);
      return await svc.serviceProviderPerformance({ npi, hcpcs_code }, pagination);
      // can be called the other way
    },
    async serviceProviderPerformanceSummary(obj: any, args: any, context: any, info: any)
      : Promise<ts.ServiceProviderPerformanceSummary[]> {
      const { npis } = args.input;
      return await svc.serviceProviderPerformanceSummary(npis);
    },
    async serviceProviderPerformanceSummaryType(obj: any, args: any, context: any, info: any)
      : Promise<ts.ServiceProviderPerformanceSummaryType[]> {
      const { id } = args;
      return await svc.serviceProviderPerformanceSummaryType(id);
    },

    async countProviderPerformances(obj: any, args: any, context: any, info: any): Promise<any> {
      const { npi, hcpcs_code } = args.input;
      const results = await svc.countProviderPerformances({ npi, hcpcs_code });
      return { ...results[0] };
    },
    async countServiceProviderPerformance(obj: any, args: any, context: any, info: any): Promise<any> {
      const { npi, hcpcs_code } = args.input;
      const results = await svc.countServiceProviderPerformance({ npi, hcpcs_code });
      return { ...results[0] };
    },


  },
};
