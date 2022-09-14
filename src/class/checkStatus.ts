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

// desactivando certificado TLS SSL para node-fetch
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class CheckStatusClass {
  async check(host: string, method: string, type: string) {
    let HOST: string;
    if (type === "http") {
      HOST = `http://${host}`;
    } else if (type === "https") {
      HOST = `https://${host}`;
    } else {
      HOST = `http://${host}`;
    }

    let pageInfo = await fetch(HOST, {
      method,
    })
      .then((res: any) => {
        // devolver los enabezados de la respuesta
        return {
          type,
          site: res.url,
          status: res.status,
          statusText: res.statusText,
          headers: JSON.stringify(res.headers.raw()),
        };
      })
      .catch((error: any) => {
        //mostrar error de manera elegante
        return {
          type,
          site: HOST,
          status: 404,
          error: `${Error(error)}`,
        };
      });
    return await pageInfo;
  }
}
export default new CheckStatusClass();
