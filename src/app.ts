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

  app.use(express.json());

  // retornando el server
  await server.start();
  server.applyMiddleware({ app, path: "/gql" });
  return app;
}
