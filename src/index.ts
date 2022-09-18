import "dotenv/config";
import { startServer } from "./app";

const cors = require("cors");
// const SITE = process.env.IP_PUBLIC || "localhost";
// const PORT = process.env.PORT_PUBLIC || 3030;
let PORT_PUBLIC = process.env.PORT_PUBLIC || 3030;
let IP_PUBLIC = process.env.IP_PUBLIC || "localhost";
let URL: any;
let REMOVE_PORT = process.env.REMOVE_PORT || "false";
let HTTPS = process.env.HTTPS || "false";

if (HTTPS === "true") {
  URL = `https://${IP_PUBLIC}:${PORT_PUBLIC}/gql`;
  if (REMOVE_PORT === "true") {
    URL = `https://${IP_PUBLIC}/gql`;
  }
} else {
  URL = `http://${IP_PUBLIC}:${PORT_PUBLIC}/gql`;
  if (REMOVE_PORT === "true") {
    URL = `http://${IP_PUBLIC}/gql`;
  }
}

(async function start() {
  const app = await startServer();
  app.use(cors());
  app.listen(Number(PORT_PUBLIC), () => {
    console.log(`Server started on port ${URL}`);
  });
})();
