import { Query, Resolver, Mutation, Arg } from "type-graphql";
// import SubfinderClass from "../class/SubFinderClass";
import Subquest from "../class/Subquest";
import VirusTotal from "../class/VirusTotal";
import hackertargetClass from "../class/hackertarget";
import crtClass from "../class/crt.sh";

import { Domain } from "../types/Domain";

export class scanSubDomainsResolver {
  //escanea con la api de cloudflare
  // @Query(() => [Domain])
  // async scanByCloudflare(@Arg("host", () => String) host: string) {
  //   return await SubfinderClass.scan(host);
  // }

  //escanea con Subquest mediante un diccionario
  @Query(() => [Domain])
  async scanBySubquest(
    @Arg("host", () => String) host: string,
    @Arg("dictionary", () => Number) dictionary: number,
    @Arg("dnsServer", () => String, { nullable: true }) dnsServer?: string
  ) {
    dnsServer === undefined || dnsServer === null ? "1.1.1.1" : dnsServer;
    return await Subquest.scan(host, dictionary, dnsServer);
  }

  //escanea con la API de VirusTotal
  @Query(() => [Domain])
  async scanByVirusTotal(@Arg("host", () => String) host: string) {
    return await VirusTotal.scan(host);
  }

  //escanear con la APi de hackertarget
  @Query(() => [Domain])
  async scanByHackertarget(@Arg("host", () => String) host: string) {
    return await hackertargetClass.scan(host);
  }

  //escanear con crt.sh
  @Query(() => [Domain])
  async scanByCrt(@Arg("host", () => String) host: string) {
    return await crtClass.scan(host);
  }

  // escaner con todas | solo API
  @Query(() => [Domain])
  async scanAllApis(@Arg("host", () => String) host: string) {
    let subdomains = [];
    let subdomains1 = await this.scanByVirusTotal(host);
    let subdomains2 = await this.scanByHackertarget(host);
    let subdomains3 = await this.scanByCrt(host);
    // let subdomains4 = await this.scanByCloudflare(host);
    subdomains = subdomains1.concat(subdomains2, subdomains3);

    // eliminar elentos repetidos del objeto
    let unique = subdomains.filter(
      (thing: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t.subdomain === thing.subdomain)
    );

    //enumerando los elementos
    let subdomainsEnumerated = unique.map((element: any, index: number) => {
      return { id: index + 1, subdomain: element.subdomain };
    });

    //eliminar el objeto que tenga como caracter exceeded
    let finalResult = [];
    for (let i = 0; i < subdomainsEnumerated.length; i++) {
      const element = subdomainsEnumerated[i];
      if (element.subdomain.includes("exceeded")) {
      } else {
        finalResult.push(element);
      }
    }

    return finalResult;
  }
}
