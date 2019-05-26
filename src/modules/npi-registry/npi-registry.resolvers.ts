import * as svc from './npi-registry.services';

export const resolvers = {
    Query: {
        async getProvider(obj: any, args: any, context: any, info: any) {
            const { npi } = args;
            return await svc.getProvider(npi);
        },
    },
};
