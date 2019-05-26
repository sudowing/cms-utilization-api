import { GraphQLModule } from "@graphql-modules/core";
import { apiModule, AppModule, dbModule, searchModule } from "./modules/index";

export const RootModule = new GraphQLModule({
    imports: [AppModule, dbModule, apiModule, searchModule],
});
