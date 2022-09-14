// import "reflect-metadata";
import { Resolver, Query } from "type-graphql";
// import { User } from "../types/user";
// import { prisma } from "../class/db";

@Resolver()
export class PingResolver {
  @Query(() => String)
  async ping() {
    return "pong";
  }
}
