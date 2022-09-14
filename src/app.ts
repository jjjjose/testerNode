import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import express, { Application, Request, Response, NextFunction } from "express";

const serveStatic = require("serve-static");

const app: Application = express();

//exportando la funcion de inicializacion de graphql
export async function startServer() {
  //añadiendo los tipos y resolvers de graphql
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*{.ts,.js}"],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  //render del build de quasar y mostrar en la ruta /
  app.use("/", serveStatic(__dirname + "/../frontend/dist/spa"));
  //ver quien entra a la ruta

  // app.use(express.json());
  //habilitar los cors para todo el servidor

  // app.use("/gql", cors(), (req: Request, res: Response, next: NextFunction) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "*");
  //   res.header("Access-Control-Allow-Methods", "*");
  //   next();
  // });

  // retornando el server
  await server.start();
  server.applyMiddleware({ app, path: "/gql" });
  return app;
}
