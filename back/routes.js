const express = require("express");
const path = require("path");
const router = express.Router();

// solicitando a libreria FETCH
const fetch = require("node-fetch");
// solicitando libreria subquesta para scanear subdominios
const subquest = require("subquest");

// respuesta de la ruta de raiz en metodo GET
router.get("/", (req, res) => {
  res.header("Content-Type", "text/html");
  res.sendFile(path.join(__dirname + "/../front/dist/spa/index.html"));
});

// respuesta y analisis por metodo POST
router.post("/", (req, res) => {
  res.json(req.body);
  console.log(req.body);
});

module.exports = router;
