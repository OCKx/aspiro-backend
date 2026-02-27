import app from "./app";
import getPort from "get-port";

const host = process.env.HOST || "0.0.0.0";
const preferred = Number(process.env.PORT) || 3000;

async function main() {
  const port = await getPort({ port: [preferred, 5111, 5112, 5113, 5114] });

  app.listen(port, host, () => {
    console.log(`Listening to http://${host}:${port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});