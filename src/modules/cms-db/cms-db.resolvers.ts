import * as svc from "./cms-db.services";

export const resolvers = {
  Query: {
    async provider(obj: any, args: any, context: any, info: any) {
      const result = await svc.provider(1003082041);
      console.log('provider(1003082041);', result);
      return result;
    },
    async providerIndividual(obj: any, args: any, context: any, info: any) {
      const result = await svc.providerIndividual(1003082041);
      console.log('providerIndividual(1003082041);', result);
      return result;
    },
    async providerOrganization(obj: any, args: any, context: any, info: any) {
      const result = await svc.providerOrganization(1003082041);
      console.log('providerOrganization(1003082041);', result);
      return result;
    },
    async providerPerformances(obj: any, args: any, context: any, info: any) {
      const result = await svc.providerPerformances("", 1003082041);
      console.log('providerPerformances("", 1003082041);', result);
      return result;
    },

    async service(obj: any, args: any, context: any, info: any) {
      const result = await svc.service("00120");
      console.log('service("00120");', result);
      return result;
    },
    async servicePerformance(obj: any, args: any, context: any, info: any) {
      const result = await svc.servicePerformance("00120");
      console.log('servicePerformance("00120");', result);
      return result;
    },
    async serviceProviderPerformance(obj: any, args: any, context: any, info: any) {
      const result = await svc.serviceProviderPerformance("00120");
      console.log('serviceProviderPerformance("00120");', result);
      return result;
    },
    async serviceProviderPerformanceSummary(obj: any, args: any, context: any, info: any) {
      const result = await svc.serviceProviderPerformanceSummary(1003082041);
      console.log('serviceProviderPerformanceSummary(1003082041);', result);
      return result;
    },
    async serviceProviderPerformanceSummaryType(obj: any, args: any, context: any, info: any) {
      const result = await svc.serviceProviderPerformanceSummaryType(0);
      console.log('serviceProviderPerformanceSummaryType(1);', result);
      return result;
    },

  },
};
