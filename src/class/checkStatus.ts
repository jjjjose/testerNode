const fetch = require("node-fetch");

// (async () => {
//   await fetch(SITE, {
//     method: "GET",
//   })
//     .then((response) => {
//       // respuesta del dominio si esta activo
//       res.json({
//         url: response.url,
//         status: response.status,
//         statusText: response.statusText,
//         // headers: response.headers.raw(),
//       });
//     })
//     .catch((error) => {
//       // en caso de que HOST no exista mandar el log del error
//       res.json({
//         site: SITE,
//         status: 404,
//         error,
//       });
//     });
// })();

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

// desactivando certificado TLS SSL para node-fetch
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class CheckStatusClass {
  async check(host: string, method: string, protocol: string) {
    let URL: string;

    //convertir a mayusculas method
    method = method.toUpperCase();

    let PROTOCOLS = ["http", "https"];

    if (protocol === "http") {
      URL = `http://${host}`;
      if (method !== "ALL") {
        return await this.viewStatus(URL, method, protocol);
      }
    } else if (protocol === "https") {
      URL = `https://${host}`;
    } else if (protocol === "all") {
    }
  }
  async viewStatus(url: string, method: string, protocol: string) {
    let redirect: boolean = false;
    let pageInfo = await fetch(url, {
      method,
    })
      .then((res: any) => {
        if (res.redirected) {
          redirect = true;
        }
        // console.log(JSON.stringify(res));
        // devolver los enabezados de la respuesta
        return {
          redirect,
          protocol,
          site: url,
          method,
          status: res.status,
          statusText: res.statusText,
          headers: JSON.stringify(res.headers.raw()),
        };
      })
      .catch((error: any) => {
        //mostrar error de manera elegante
        return {
          redirect,
          protocol,
          site: url,
          method,
          status: 404,
          error: `${Error(error)}`,
        };
      });
    return await pageInfo;
  }
}
export default new CheckStatusClass();
