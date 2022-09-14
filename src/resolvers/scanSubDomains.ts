import { Query, Resolver, Mutation, Arg } from "type-graphql";
import SubfinderClass from "../class/SubFinderClass";
import Subquest from "../class/Subquest";
import VirusTotal from "../class/VirusTotal";

import { Domain } from "../types/Domain";

export class scanSubDomainsResolver {
  @Query(() => [Domain])
  async scanByCloudflare(@Arg("host", () => String) host: string) {
    return await SubfinderClass.scan(host);
  }
  @Query(() => [Domain])
  async scanBySubquest(
    @Arg("host", () => String) host: string,
    @Arg("dictionary", () => Number) dictionary: number,
    @Arg("dnsServer", () => String, { nullable: true }) dnsServer?: string
  ) {
    dnsServer === undefined || dnsServer === null ? "1.1.1.1" : dnsServer;
    return await Subquest.scan(host, dictionary, dnsServer);
  }
  @Query(() => [Domain])
  async scanByVirusTotal(@Arg("host", () => String) host: string) {
    return await VirusTotal.scan(host);
  }
}
