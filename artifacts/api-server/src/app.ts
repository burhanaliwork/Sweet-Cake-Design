import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API routes ─────────────────────────────────────────────────────────────
app.use("/api", router);

// ── Frontend static files ─────────────────────────────────────────────────
// Resolve relative to the compiled file so it works on Render regardless of cwd.
// Compiled output: artifacts/api-server/dist/index.mjs
// Frontend build:  artifacts/cake-bab-alagha/dist/public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticDir = path.resolve(__dirname, "../../cake-bab-alagha/dist/public");

logger.info({ staticDir }, "Serving static files from");

app.use(express.static(staticDir));

// ── SPA fallback ──────────────────────────────────────────────────────────
// For any route not matched above (e.g. /, /admin), serve index.html.
// Express 5 compatible: use app.use instead of app.get("*").
app.use((_req, res) => {
  res.sendFile(path.join(staticDir, "index.html"), (err) => {
    if (err) {
      logger.error({ err, staticDir }, "index.html not found — did you run the frontend build?");
      res.status(404).send("Frontend not built. Run: BASE_PATH=/ pnpm --filter @workspace/cake-bab-alagha run build");
    }
  });
});

export default app;
