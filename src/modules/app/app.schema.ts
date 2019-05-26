import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';

import { resolvers } from './app.resolvers';

const typeDefs = gql`
    type Query {
        ping: AppPing
        healthcheck: AppHealthCheck
    }
    type AppPing {
        date: String
        message: String
    }
    type AppHealthCheck {
        date: String
        resources: [AppResourceHealthReport]
    }
    type AppResourceHealthReport {
        resource: String
        up: Boolean
    }
`;

export const AppModule = new GraphQLModule({
    typeDefs,
    resolvers,
});
