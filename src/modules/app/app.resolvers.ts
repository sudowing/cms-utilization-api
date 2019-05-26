export const resolvers = {
    Query: {
        ping(obj: any, args: any, context: any, info: any) {
            return {
                date: new Date().toISOString(),
                message: 'Ok.',
            }
        },
        healthcheck(obj: any, args: any, context: any, info: any) {
            return {
                date: new Date().toISOString(),
                resources: [
                    { resource: 'database', up: true },
                    { resource: 'cache', up: true },
                    { resource: 'elasticsearch', up: true },
                    { resource: 'npi-api', up: true },
                ],
            }
        },
    },
    AppPing: {
        date(obj: any, args: any, context: any, info: any) {
            return obj.date
        },
        message(obj: any, args: any, context: any, info: any) {
            return obj.message
        },
    },
    AppHealthCheck: {
        date(obj: any, args: any, context: any, info: any) {
            return obj.date
        },
        resources(obj: any, args: any, context: any, info: any) {
            return obj.resources
        },
    },
    AppResourceHealthReport: {
        resource(obj: any, args: any, context: any, info: any) {
            return obj.resource
        },
        up(obj: any, args: any, context: any, info: any) {
            return obj.up
        },
    },
}
