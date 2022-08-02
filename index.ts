import axios from "axios";
import http from "http";

const host = process.env.HOST;
const logdnaKey = process.env.LOGDNA_KEY ?? "asd";
const disabled = process.env.DISABLED;
// var logger = Logger.createLogger(logdnaKey!);
const url = `https://${host}/api/dev/health`;

const ping = async () => {
  try {
    console.log("⚪️  PING");
    const start = Date.now();
    await axios.get(url);
    const delta = Date.now() - start;
    const indicator = delta < 1000 ? "🟢" : "🔴";
    console.log(indicator, "  PONG after", delta);
    // logger.log(`[pgpong] delta=${delta}`);
  } catch (e) {
    console.error(e);
  }
  setTimeout(async () => {
    ping();
  }, 1000);
};
if (disabled) {
  console.debug("Disabled");
} else {
  console.debug("Starting…");
  // logger.log(`[pgpong] start`);
  ping();
}
http.createServer().listen(parseInt(process.env.PORT ?? "11999"), "0.0.0.0");
