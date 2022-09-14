const subquest = require("subquest");

class SubquestClass {
  async scan(host: string, dictionaryNumber: number, dnsServer?: string) {
    let dictionary = "top_" + dictionaryNumber;
    //retornar el resultado del scan de subquest con una promesa
    return new Promise((resolve, reject) => {
      subquest.getSubDomains(
        {
          host, // required
          rateLimit: "4", // four requests at time
          dnsServer, // custom DNS server
          dictionary, // dictionary file to use
        },
        (err: any, results: any) => {
          if (err) {
            console.log("Error:", err);
            return;
          }
          resolve(this.convert(results));
        }
      );
    });
  }
  convert(data: any) {
    let domain = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      domain.push({ subdomain: element.hostname });
    }
    return domain;
  }
}
export default new SubquestClass();
