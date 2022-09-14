const fetch = require("node-fetch");

class crtClass {
  async scan(host: string) {
    let urlBase = `https://crt.sh/?q=${host}&output=json`;
    const resp = await fetch(urlBase, {
      method: "GET",
    }).then((res: any) => res.json());
    return await this.convert(resp);
  }
  //mejorar la data
  async convert(data: any) {
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
}
export default new crtClass();
