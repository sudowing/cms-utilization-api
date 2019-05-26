import * as svc from './cms-search.services'

export const resolvers = {
    Query: {
        async searchGeoProviders(obj: any, args: any, context: any, info: any) {
            const { geo, service, entity_type, limit } = args
            const newLimit = limit || 10000
            return await svc.searchGeoProviders(
                geo,
                service,
                entity_type,
                newLimit
            )
        },
        async searchGeoServiceStats(
            obj: any,
            args: any,
            context: any,
            info: any
        ) {
            const { geo, service, entity_type, limit } = args
            const newLimit = limit || 10000
            return await svc.searchGeoServiceStats(
                geo,
                service,
                entity_type,
                newLimit
            )
        },
        async autocompleteServices(
            obj: any,
            args: any,
            context: any,
            info: any
        ) {
            const { search, limit } = args
            return await svc.autocompleteServices(search, limit)
        },
        async suggestProviders(obj: any, args: any, context: any, info: any) {
            const { search, limit } = args
            return await svc.suggestProviders(search, limit)
        },
    },
}
