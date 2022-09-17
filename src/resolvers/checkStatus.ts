import { Query, Resolver, Mutation, Arg } from "type-graphql";
import CheckStatusClass from "../class/checkStatus";

import { infoStatusSite } from "../types/pageInfo";

export class scanSubDomainsResolver {
  //chequeo de estado de subdominios
  @Query(() => infoStatusSite)
  async checkStatus(
    @Arg("host", () => String) host: string,
    @Arg("method", () => String) method: string,
    @Arg("protocol", () => String) protocol: string
  ) {
    return await CheckStatusClass.check(host, method, protocol);
  }
}
