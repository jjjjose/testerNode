const fetch = require("node-fetch");
const subquest = require("subquest");
// desactivando certificado TLS SSL para node-fetch
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const API_KEY = process.env.VIRUSTOTAL_API_KEY;
const methods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
  "TRACE",
];
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
  async check(host: string, method: string, protocol: string) {
    let URL: string;

    //convertir a mayusculas method
    method = method.toUpperCase();

    if (protocol === "http") {
      URL = `http://${host}`;
      if (method !== "ALL") {
        let infoHTTP = {
          ["info" + method]: await this.viewStatus(URL, method, protocol),
        };
        return { host, infoHTTP };
      } else {
        // cuando solicita todos los metodos en http
        let infoHTTP = {};
        for (const method of methods) {
          infoHTTP = {
            ...infoHTTP,
            ["info" + method]: await this.viewStatus(URL, method, protocol),
          };
        }
        return { host, infoHTTP };
      }
    } else if (protocol === "https") {
      //cuando solicita todos los metodos en https
      URL = `https://${host}`;
      if (method !== "ALL") {
        let infoHTTPS = {
          ["info" + method]: await this.viewStatus(URL, method, protocol),
        };
        return {
          host,
          infoHTTPS,
        };
      } else {
        let infoHTTPS = {};
        for (const method of methods) {
          infoHTTPS = {
            ...infoHTTPS,
            ["info" + method]: await this.viewStatus(URL, method, protocol),
          };
        }
        return { host, infoHTTPS };
      }
    } else if (protocol === "all") {
      if (method !== "ALL") {
        URL = `http://${host}`;
        let infoHTTP = {
          ["info" + method]: await this.viewStatus(URL, method, "http"),
        };
        URL = `https://${host}`;
        let infoHTTPS = {
          ["info" + method]: await this.viewStatus(URL, method, "https"),
        };
        return {
          host,
          infoHTTP,
          infoHTTPS,
        };
      } else {
        URL = `http://${host}`;
        let infoHTTP = {};
        for (const method of methods) {
          infoHTTP = {
            ...infoHTTP,
            ["info" + method]: await this.viewStatus(URL, method, "http"),
          };
        }
        URL = `https://${host}`;
        let infoHTTPS = {};
        for (const method of methods) {
          infoHTTPS = {
            ...infoHTTPS,
            ["info" + method]: await this.viewStatus(URL, method, "https"),
          };
        }
        return {
          host,
          infoHTTP,
          infoHTTPS,
        };
      }
    }
  }
  async viewStatus(url: string, method: string, protocol: string) {
    //tiempo en milisegundos para la solicitud de la url
    let tiempo: number = 3000;
    // funcion para medir el tiempo de respuesta de un dominio
    function timeout(ms: any, promise: any) {
      return new Promise(function (resolve, reject) {
        const timer = setTimeout(() => {
          reject(new Error("timeout"));
        }, ms);
        promise
          .then((res: any) => {
            clearTimeout(timer);
            resolve(res);
          })
          .catch((err: any) => {
            clearTimeout(timer);
            reject(err);
          });
      });
    }
    let redirect: boolean = false;
    let data: any;
    await timeout(tiempo, fetch(url, { method: method }))
      .then(async (res: any) => {
        let redirectTo = null;
        if (res.redirected) {
          redirect = true;
          redirectTo = res.url;
        }
        data = {
          redirect,
          redirectTo,
          protocol,
          siteUrl: url,
          method,
          status: res.status,
          statusText: res.statusText,
          headers: JSON.stringify(res.headers.raw()),
        };
      })
      .catch(async (error: any) => {
        data = {
          protocol,
          siteUrl: url,
          method,
          status: 404,
          error: `${Error(error)}`,
        };
      });
    return data;
  }
  async scanSubquest(
    host: string,
    dictionaryNumber: number,
    dnsServer?: string
  ) {
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
          resolve(this.convertSQ(results));
        }
      );
    });
  }
  convertSQ(data: any) {
    let domain = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      domain.push({ subdomain: element.hostname });
    }
    return domain;
  }
}
export default new Scan();
