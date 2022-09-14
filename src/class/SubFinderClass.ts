// const Subfinder = require("@sooluh/subfinder");
import Subfinder from "@sooluh/subfinder";
const subfinder = new Subfinder();

class SubFinderClass {
  async scan(domain: string) {
    try {
      const subdomains = await subfinder.lookup(domain);
      return this.convert(subdomains);
    } catch (error) {
      console.error(error);
    }
  }
  convert(data: any) {
    let domain = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      domain.push({ subdomain: element.subdomain });
    }
    return domain;
  }
}
export default new SubFinderClass();
