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
  //checkeo de estado de un dominio
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
    // let pageInfo = await fetch(url, {
    //   method,
    // })
    //   .then((res: any) => {
    //     let redirectTo = null;
    //     if (res.redirected) {
    //       redirect = true;
    //       redirectTo = res.url;
    //     }
    //     // console.log(`ok method ${method} ${url}`);
    //     // devolver los enabezados de la respuesta
    //     return {
    //       redirect,
    //       redirectTo,
    //       protocol,
    //       siteUrl: url,
    //       method,
    //       status: res.status,
    //       statusText: res.statusText,
    //       headers: JSON.stringify(res.headers.raw()),
    //     };
    //   })
    //   .catch((error: any) => {
    //     // console.log(`error method ${method} ${url}`);
    //     //mostrar error de manera elegante
    //     return {
    //       protocol,
    //       siteUrl: url,
    //       method,
    //       status: 404,
    //       error: `${Error(error)}`,
    //     };
    //   });
    // return await pageInfo;
  }
}
export default new CheckStatusClass();
