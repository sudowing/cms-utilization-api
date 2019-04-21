import { genPaginationOrder } from "../../utils";
import * as svc from "./cms-db.services";

export const resolvers = {
  Query: {
    async provider(obj: any, args: any, context: any, info: any) {
      const { npi } = args.input;
      return await svc.provider(npi);
    },
    async providerIndividual(obj: any, args: any, context: any, info: any) {
      const { npi } = args.input;
      return await svc.providerIndividual(npi);
    },
    async providerOrganization(obj: any, args: any, context: any, info: any) {
      const { npi } = args.input;
      return await svc.providerOrganization(npi);
    },
    async providerPerformances(obj: any, args: any, context: any, info: any) {
      const { npi, hcpcs_code } = args.input;
      const pagination = genPaginationOrder(args.pagination);
      return await svc.providerPerformances({ npi, hcpcs_code }, pagination);
      // can be called the other way
    },
    async service(obj: any, args: any, context: any, info: any) {
      const { hcpcs_code } = args.input;
      return await svc.service(hcpcs_code);
    },
    async servicePerformance(obj: any, args: any, context: any, info: any) {
      const { hcpcs_code } = args.input;
      return await svc.servicePerformance(hcpcs_code);
    },
    async serviceProviderPerformance(obj: any, args: any, context: any, info: any) {
      const { npi, hcpcs_code } = args.input;
      const pagination = genPaginationOrder(args.pagination);
      return await svc.serviceProviderPerformance({ npi, hcpcs_code }, pagination);
      // can be called the other way
    },
    async serviceProviderPerformanceSummary(obj: any, args: any, context: any, info: any) {
      const { npi } = args.input;
      return await svc.serviceProviderPerformanceSummary(npi);
    },
    async serviceProviderPerformanceSummaryType(obj: any, args: any, context: any, info: any) {
      const { id } = args;
      return await svc.serviceProviderPerformanceSummaryType(id);
    },

    async countProviderPerformances(obj: any, args: any, context: any, info: any) {
      const { npi, hcpcs_code } = args.input;
      const results = await svc.countProviderPerformances({ npi, hcpcs_code });
      return { ...results[0] };
    },
    async countServiceProviderPerformance(obj: any, args: any, context: any, info: any) {
      const { npi, hcpcs_code } = args.input;
      const results = await svc.countServiceProviderPerformance({ npi, hcpcs_code });
      return { ...results[0] };
    },


  },
};
