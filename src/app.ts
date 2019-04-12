import * as cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import * as config from "config";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as compress from "koa-compress";
import { router as appRouter } from "./modules/app/index";

import { RootModule } from "./schema";
import { logger } from "./loggers";

const port = config.get("port");
const urlRoot = config.get("urlRoot");
const debug: boolean = config.get("debug");

appRouter.prefix(`${urlRoot}`);

const App = new Koa();

App.use(cors());

App.use(bodyParser())
  .use(appRouter.routes())
  .use(appRouter.allowedMethods());

App.use(compress());

const { schema, context } = RootModule;
const server = new ApolloServer({ schema, context, debug });
server.applyMiddleware({ app: App, path: `${urlRoot}/` });

App.listen({ port }, () => {
  logger.info("App Started.", { port });
  logger.info(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
