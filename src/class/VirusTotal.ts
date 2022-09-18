const fetch = require("node-fetch");
//apikey env
const API_KEY = process.env.VIRUSTOTAL_API_KEY;

class VirusTotalClass {
  async scan(host: string) {
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

        let results = await this.convert(onePage.data);

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
      SUBDOMAINS = await this.convert(subdomain.data);
    }
    return SUBDOMAINS;
  }
  async convert(data: any) {
    let domain = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].id;
      domain.push({ subdomain: element });
    }
    return domain;
  }
}
export default new VirusTotalClass();
