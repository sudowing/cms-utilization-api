import * as svc from "./npi-registry.services";

export const resolvers = {
  Query: {
    async getProvider(obj: any, args: any, context: any, info: any) {
      return await svc.getProvider(1003082041);
    },
  },
};
