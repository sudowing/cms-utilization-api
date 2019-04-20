import { GraphQLModule } from "@graphql-modules/core";
import { apiModule, AppModule, dbModule } from "./modules/index";

export const RootModule = new GraphQLModule({
  imports: [AppModule, dbModule, apiModule],
});
