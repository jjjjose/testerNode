const express = require("express");
const path = require("path");
const router = express.Router();

// solicitando a libreria FETCH
const fetch = require("node-fetch");
// solicitando libreria subquest para scanear subdominios
const subquest = require("subquest");

// desactivando  certificados SSL TLS
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// respuesta de la ruta de raiz en metodo GET
router.get("/", (req, res) => {
  // mostranto el contenido del frontend echo en quasar
  res.header("Content-Type", "text/html");
  res.sendFile(path.join(__dirname + "/../front/dist/spa/index.html"));
});

// respuesta y analisis por metodo POST
router.post("/", (req, res) => {
  // consultar si el sitio esta disponible

  let TYPE = req.body.type;
  // reciviendo el dominio a consultar
  let SITE = req.body.site;

  // preguntar si quiere scanear subdominios
  if (TYPE === "scan") {
    // escanear dominio
    subquest.getSubDomains(
      {
        host: SITE,
      },
      (err, results) => {
        if (err) {
          console.log("Error:", err);
          return;
        }
        res.json({
          Subdomains: results,
        });

        // console.log("Subdomains:", results);
      }
    );
  } else if (TYPE === "test") {
    // haciendo el test de dominio activo
    // usando fetch
    (async () => {
      await fetch(SITE, {
        method: "GET",
      })
        .then((response) => {
          // respuesta del dominio si esta activo
          res.json({
            url: response.url,
            status: response.status,
            statusText: response.statusText,
            // headers: response.headers.raw(),
          });
        })
        .catch((error) => {
          // en caso de que HOST no exista mandar el log del error
          res.json({
            site: SITE,
            status: 404,
            error,
          });
        });
    })();
  } else {
    res.json({
      mensaje: "error de parametro",
    });
  }
});

module.exports = router;
