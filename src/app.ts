import * as cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import * as config from "config";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as compress from "koa-compress";
import { router as appRouter } from "./modules/app/index";
import { router as dbRouter } from "./modules/cms-db/index";
import { router as searchRouter } from "./modules/cms-search/index";
import { router as npiRegistryRouter } from "./modules/npi-registry/index";

import { logger } from "./loggers";
import { RootModule } from "./schema";

const port = config.get("port");
const urlRoot = config.get("urlRoot") || "/graphql";
const debug: boolean = config.get("debug") || false;

appRouter.prefix(``);
dbRouter.prefix(`/db`);
searchRouter.prefix(`/search`);
npiRegistryRouter.prefix(`/npi-registry`);

const App = new Koa();

App.use(cors());

App.use(bodyParser())
  .use(appRouter.routes())
  .use(appRouter.allowedMethods())
  .use(dbRouter.routes())
  .use(dbRouter.allowedMethods())
  .use(searchRouter.routes())
  .use(searchRouter.allowedMethods())
  .use(npiRegistryRouter.routes())
  .use(npiRegistryRouter.allowedMethods());

App.use(compress());

const { schema, context } = RootModule;
const server = new ApolloServer({ schema, context, debug });
server.applyMiddleware({ app: App, path: `${urlRoot}/` });

App.listen({ port }, () => {
  logger.info("App Started.", { port });
  logger.info(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
