import Logger from "@logdna/logger";
import http from "http";
import * as pg from "pg";

const connectionString = process.env.CONNECTION_STRING;
const logdnaKey = process.env.LOGDNA_KEY;
var logger = Logger.createLogger(logdnaKey!);

const ping = async () => {
  const start = Date.now();
  const connection = new pg.Client({ connectionString });
  await connection.connect();
  const delta = Date.now() - start;
  console.debug("Pong after:", delta);
  logger.log(`pgpong delta=${delta}`);
  await connection.end();
  setTimeout(async () => {
    ping();
  }, 1000);
};
ping();
http.createServer().listen(11999, "0.0.0.0");
