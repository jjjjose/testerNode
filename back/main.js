const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// rutas
app.use(require("./routes"));

// archivos estaticos o complilado de quasar
let options = {
  dotfiles: "ignore", //allow, deny, ignore
  etag: true,
  extensions: ["htm", "html"],
  index: false, //to disable directory indexing
  maxAge: "7d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    //add this header to all static responses
    res.set("x-timestamp", Date.now());
  },
};

app.use(express.static(path.join(__dirname + "/../front/dist/spa/"), options));

// iniciando el server en el port 3000
app.listen(55, () => {
  console.log("Iniciando SERVER en puerto 55");
});
