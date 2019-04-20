import * as svc from "./cms-search.services";

export const resolvers = {
  Query: {
    async searchGeoProviders(obj: any, args: any, context: any, info: any) {
      const geoOptions = {
        latitude: 39.8707347,
        longitude: -74.8982277,
        distanceUnit: "miles",
        distanceValue: 2,
      };
      const serviceOptions: any = {};
      return await svc.searchGeoProviders(geoOptions, serviceOptions);
    },
    async autocompleteServices(obj: any, args: any, context: any, info: any) {
      return await svc.autocompleteServices("dent");
    },
    async suggestProviders(obj: any, args: any, context: any, info: any) {
      return await svc.suggestProviders("willi");
    },
  },
};
