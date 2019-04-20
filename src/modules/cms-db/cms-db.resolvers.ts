import * as svc from "./cms-db.services";

export const resolvers = {
  Query: {
    async provider(obj: any, args: any, context: any, info: any) {
      return await svc.provider(1003082041);
    },
    async providerIndividual(obj: any, args: any, context: any, info: any) {
      return await svc.providerIndividual(1003082041);
    },
    async providerOrganization(obj: any, args: any, context: any, info: any) {
      return await svc.providerOrganization(1003082041);
    },
    async providerPerformances(obj: any, args: any, context: any, info: any) {
      return await svc.providerPerformances("", 1003082041);
    },

    async service(obj: any, args: any, context: any, info: any) {
      return await svc.service("00120");
    },
    async servicePerformance(obj: any, args: any, context: any, info: any) {
      return await svc.servicePerformance("00120");
    },
    async serviceProviderPerformance(obj: any, args: any, context: any, info: any) {
      return await svc.serviceProviderPerformance("00120");
    },
    async serviceProviderPerformanceSummary(obj: any, args: any, context: any, info: any) {
      return await svc.serviceProviderPerformanceSummary(1003082041);
    },
    async serviceProviderPerformanceSummaryType(obj: any, args: any, context: any, info: any) {
      return await svc.serviceProviderPerformanceSummaryType(0);
    },

  },
};
