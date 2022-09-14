const fetch = require("node-fetch");

class hackertargetClass {
  async scan(host: string) {
    let urlBase = `https://api.hackertarget.com/hostsearch/?q=${host}`;
    const resp = await fetch(urlBase, {
      method: "GET",
    }).then((res: any) => res.text());

    // separar datos por saltos de linea
    let data = resp.split("\n");

    // mejorar los datos
    let subdomains = await this.convert(data);

    return subdomains;
  }
  async convert(data: any) {
    // dividir cada linea por coma
    let subdomain = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].split(",");
      subdomain.push({ subdomain: element[0] });
    }
    return subdomain;
  }
}
export default new hackertargetClass();
