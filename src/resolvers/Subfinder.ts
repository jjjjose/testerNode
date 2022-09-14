import { Query, Resolver, Mutation, Arg } from "type-graphql";
import SubfinderClass from "../class/SubFinderClass";

import { Domain } from "../types/Domain";

export class SubFinderResolver {
  @Query(() => [Domain])
  async scanByCloudflare(@Arg("domain", () => String) domain: string) {
    return await SubfinderClass.scan(domain);
  }
}
