import { GraphQLModule } from "@graphql-modules/core";
import { AppModule } from "./modules/index";

export const RootModule = new GraphQLModule({
  imports: [AppModule],
});
