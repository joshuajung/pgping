import Logger from "@logdna/logger";
import http from "http";
import * as pg from "pg";

const connectionString = process.env.CONNECTION_STRING;
const logdnaKey = process.env.LOGDNA_KEY;
const disabled = process.env.DISABLED;
var logger = Logger.createLogger(logdnaKey!);

const ping = async () => {
  try {
    console.log("⚪️  PING");
    const start = Date.now();
    const connection = new pg.Client({ connectionString });
    await connection.connect();
    await connection.end();
    const delta = Date.now() - start;
    console.log("🟢  PONG after", delta);
    logger.log(`[pgpong] delta=${delta}`);
  } catch {}
  setTimeout(async () => {
    ping();
  }, 1000);
};
if (disabled) {
  console.debug("Disabled");
} else {
  console.debug("Starting…");
  logger.log(`[pgpong] start`);
  ping();
}
http.createServer().listen(parseInt(process.env.PORT ?? "11999"), "0.0.0.0");
