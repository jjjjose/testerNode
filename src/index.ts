import "dotenv/config";
import { startServer } from "./app";

const cors = require("cors");
const PORT = process.env.PORT || 3000;

(async function start() {
  const app = await startServer();
  app.use(cors());
  app.listen(Number(PORT), () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
