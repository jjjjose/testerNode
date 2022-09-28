const fetch = require("node-fetch");
// desactivando certificado TLS SSL para node-fetch
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const API_KEY = process.env.VIRUSTOTAL_API_KEY;
class Scan {
  async scan(host: string) {
    return "todas las apis " + host;
  }
  async byCrt(host: string) {
    let urlBase = `https://crt.sh/?q=${host}&output=json`;
    const resp = await fetch(urlBase, {
      method: "GET",
    }).then((res: any) => res.json());
    return await this.convertCrt(resp);
  }
  //mejorar la data
  async convertCrt(data: any) {
    // sacar elemento common_name
    let subdomain = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].common_name;
      subdomain.push({ subdomain: element });
    }
    // eliminar elentos repetidos del objeto
    let unique = subdomain.filter(
      (thing: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t.subdomain === thing.subdomain)
    );
    return unique;
  }
  async byVirusTotal(host: string) {
    let urlBase = `https://www.virustotal.com/api/v3/domains/${host}/subdomains?relationships=resolutions`;
    const subdomain = await fetch(urlBase, {
      method: "GET",
      headers: {
        "x-apikey": API_KEY,
      },
    }).then((res: any) => res.json());
    const count = subdomain.meta.count;
    let pages;
    let SUBDOMAINS: any = [];
    if (count >= 10) {
      pages = Math.ceil(count / 10);
      for (let i = 0; i < pages; i++) {
        //mostrando resultados de una pagina scaneada
        let onePage = await fetch(urlBase, {
          method: "GET",
          headers: {
            "x-apikey": API_KEY,
          },
        }).then((res: any) => res.json());

        let results = await this.convertVirus(onePage.data);

        if (
          onePage.links.next !== null ||
          onePage.links.next !== undefined ||
          onePage.links.next !== "" ||
          onePage.links.next !== " "
        ) {
          urlBase = onePage.links.next;
        } else {
          urlBase = "";
        }
        // unir los SUBDOMAINS
        SUBDOMAINS = [...SUBDOMAINS, ...results];
      }
    } else {
      SUBDOMAINS = await this.convertVirus(subdomain.data);
    }
    return SUBDOMAINS;
  }
  async convertVirus(data: any) {
    let domain = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].id;
      domain.push({ subdomain: element });
    }
    return domain;
  }
  async byHackerTarget(host: string) {
    let urlBase = `https://api.hackertarget.com/hostsearch/?q=${host}`;
    const resp = await fetch(urlBase, {
      method: "GET",
    }).then((res: any) => res.text());
    // console.log(resp);
    // separar datos por saltos de linea
    let data = resp.split("\n");

    // mejorar los datos
    let subdomains = await this.convertHT(data);

    return subdomains;
  }
  async convertHT(data: any) {
    // dividir cada linea por coma
    let subdomain = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].split(",");
      subdomain.push({ subdomain: element[0] });
    }
    return subdomain;
  }
  async scanAllApis(host: string) {
    let subdomains = [];
    let subdomains1 = await this.byCrt(host);
    let subdomains2 = await this.byVirusTotal(host);
    let subdomains3 = await this.byHackerTarget(host);
    // let subdomains4 = await this.scanByCloudflare(host);
    subdomains = subdomains1.concat(subdomains2, subdomains3);

    // eliminar elementos repetidos del objeto
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
    // eliminar el string *. de los subdominios
    let finalResult2 = [];
    for (let i = 0; i < finalResult.length; i++) {
      const element = finalResult[i];
      if (element.subdomain.includes("*.")) {
        let subdomain = element.subdomain.replace("*.", "");
        finalResult2.push({ id: element.id, subdomain: subdomain });
      } else {
        finalResult2.push(element);
      }
    }

    return finalResult2;
  }
}
export default new Scan();
