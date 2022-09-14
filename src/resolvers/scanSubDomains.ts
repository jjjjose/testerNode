import { Query, Resolver, Mutation, Arg } from "type-graphql";
import SubfinderClass from "../class/SubFinderClass";
import Subquest from "../class/Subquest";

import { Domain } from "../types/Domain";

export class scanSubDomainsResolver {
  @Query(() => [Domain])
  async scanByCloudflare(@Arg("domain", () => String) domain: string) {
    return await SubfinderClass.scan(domain);
  }
  @Query(() => [Domain])
  async scanBySubquest(
    @Arg("domain", () => String) domain: string,
    @Arg("dictionary", () => Number) dictionary: number,
    @Arg("dnsServer", () => String, { nullable: true }) dnsServer?: string
  ) {
    dnsServer === undefined || dnsServer === null ? "1.1.1.1" : dnsServer;
    return await Subquest.scan(domain, dictionary, dnsServer);
  }
}
