import "dotenv/config";
import { startServer } from "./app";

const PORT = process.env.PORT || 3000;

(async function start() {
  const app = await startServer();
  app.listen(Number(PORT), () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
