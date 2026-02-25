import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === "production";

  app.use(express.json());

  app.get("/api/stocks", (req, res) => {
    res.json([
      { symbol: "HAL", name: "Hindustan Aeronautics", price: 3245.50, change: 2.4, rsRating: 94, stage: 2, vcpPattern: true, canslimScore: 85, volumeGrowth: 1.5 },
      { symbol: "BEL", name: "Bharat Electronics", price: 188.20, change: 1.2, rsRating: 91, stage: 2, vcpPattern: false, canslimScore: 80, volumeGrowth: 1.2 },
      { symbol: "ZOMATO", name: "Zomato Ltd", price: 165.40, change: 3.2, rsRating: 89, stage: 2, vcpPattern: true, canslimScore: 78, volumeGrowth: 1.8 },
      { symbol: "MAZDOCK", name: "Mazagon Dock", price: 2150.00, change: 4.8, rsRating: 98, stage: 2, vcpPattern: true, canslimScore: 92, volumeGrowth: 2.1 },
    ]);
  });

  if (!isProd) {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => res.sendFile(path.resolve(distPath, "index.html")));
    }
  }

  app.listen(PORT, "0.0.0.0");
  return app;
}

export default startServer();