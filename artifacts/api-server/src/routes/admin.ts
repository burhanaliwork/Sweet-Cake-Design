import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { query } from "../lib/db";
import type { Request, Response, NextFunction } from "express";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "babalagha_admin_secret_2024";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@babalagha.iq";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "paris@babalagha";

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.memoryStorage(),
});

// ── Init DB ──────────────────────────────────────────────────────────────────
export async function initAdminDb() {
  await query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      emoji TEXT NOT NULL,
      description TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      price TEXT DEFAULT '',
      note TEXT DEFAULT '',
      image_data TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  const existing = await query("SELECT id FROM admin_users WHERE email=$1", [ADMIN_EMAIL]);
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await query("INSERT INTO admin_users (email, password_hash) VALUES ($1,$2)", [ADMIN_EMAIL, hash]);
    console.log("✅ Admin user created:", ADMIN_EMAIL);
  }
}

// ── Auth Middleware ───────────────────────────────────────────────────────────
interface AdminRequest extends Request {
  admin?: { id: number; email: string };
}

function authMiddleware(req: AdminRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) { res.status(401).json({ error: "Unauthorized" }); return; }
  const token = header.replace("Bearer ", "");
  try {
    req.admin = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ── Login ─────────────────────────────────────────────────────────────────────
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await query("SELECT * FROM admin_users WHERE email=$1", [email]);
    if (result.rows.length === 0) { res.status(401).json({ error: "بيانات خاطئة" }); return; }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) { res.status(401).json({ error: "بيانات خاطئة" }); return; }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Auth check
router.get("/admin/auth-check", authMiddleware, (req: AdminRequest, res) => {
  res.json({ ok: true, email: req.admin?.email });
});

// ── Categories ────────────────────────────────────────────────────────────────
router.get("/admin/categories", authMiddleware, async (_req, res) => {
  const result = await query("SELECT * FROM categories ORDER BY sort_order, title");
  res.json(result.rows);
});

router.post("/admin/categories", authMiddleware, async (req, res) => {
  const { id, title, emoji, description, sort_order } = req.body;
  await query(
    "INSERT INTO categories (id, title, emoji, description, sort_order) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO UPDATE SET title=$2, emoji=$3, description=$4, sort_order=$5",
    [id, title, emoji, description || "", sort_order || 0]
  );
  res.json({ ok: true });
});

router.put("/admin/categories/:id", authMiddleware, async (req, res) => {
  const { title, emoji, description } = req.body;
  await query("UPDATE categories SET title=$1, emoji=$2, description=$3 WHERE id=$4", [title, emoji, description || "", req.params.id]);
  res.json({ ok: true });
});

router.delete("/admin/categories/:id", authMiddleware, async (req, res) => {
  await query("DELETE FROM categories WHERE id=$1", [req.params.id]);
  res.json({ ok: true });
});

// ── Products ──────────────────────────────────────────────────────────────────
router.get("/admin/products", authMiddleware, async (req, res) => {
  const { category_id } = req.query;
  const sql = category_id
    ? "SELECT id, category_id, name, description, price, note, sort_order, created_at, (CASE WHEN image_data LIKE 'https://%' THEN image_data WHEN image_data != '' AND image_data IS NOT NULL THEN '[image]' ELSE '' END) as image_data FROM products WHERE category_id=$1 ORDER BY sort_order, created_at"
    : "SELECT id, category_id, name, description, price, note, sort_order, created_at, (CASE WHEN image_data LIKE 'https://%' THEN image_data WHEN image_data != '' AND image_data IS NOT NULL THEN '[image]' ELSE '' END) as image_data FROM products ORDER BY category_id, sort_order, created_at";
  const result = await query(sql, category_id ? [category_id] : []);
  res.json(result.rows);
});

router.post("/admin/products", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { id, category_id, name, description, price, note, sort_order } = req.body;
    let image_data = "";
    if (req.file) {
      image_data = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }
    const newId = id || `p_${Date.now()}`;
    await query(
      "INSERT INTO products (id, category_id, name, description, price, note, image_data, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [newId, category_id, name, description || "", price || "", note || "", image_data, sort_order || 0]
    );
    res.json({ ok: true, id: newId });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.put("/admin/products/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, note, sort_order } = req.body;
    if (req.file) {
      const image_data = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      await query(
        "UPDATE products SET name=$1, description=$2, price=$3, note=$4, sort_order=$5, image_data=$6 WHERE id=$7",
        [name, description || "", price || "", note || "", sort_order || 0, image_data, req.params.id]
      );
    } else {
      await query(
        "UPDATE products SET name=$1, description=$2, price=$3, note=$4, sort_order=$5 WHERE id=$6",
        [name, description || "", price || "", note || "", sort_order || 0, req.params.id]
      );
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.delete("/admin/products/:id", authMiddleware, async (req, res) => {
  await query("DELETE FROM products WHERE id=$1", [req.params.id]);
  res.json({ ok: true });
});

// ── Public: product image ─────────────────────────────────────────────────────
router.get("/product-image/:id", async (req, res) => {
  try {
    const result = await query("SELECT image_data FROM products WHERE id=$1", [req.params.id]);
    const row = result.rows[0];
    if (!row || !row.image_data) { res.status(404).send("Not found"); return; }
    const [meta, b64] = row.image_data.split(",");
    const mime = meta.replace("data:", "").replace(";base64", "");
    res.setHeader("Content-Type", mime);
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(Buffer.from(b64, "base64"));
  } catch {
    res.status(500).send("Error");
  }
});

// ── Public: full catalog from DB ──────────────────────────────────────────────
router.get("/catalog", async (_req, res) => {
  try {
    const cats = await query("SELECT * FROM categories ORDER BY sort_order, title");
    const prods = await query(
      "SELECT id, category_id, name, description, price, note, (CASE WHEN image_data LIKE 'https://%' THEN image_data WHEN image_data != '' AND image_data IS NOT NULL THEN '/api/product-image/' || id ELSE '' END) as image FROM products ORDER BY sort_order, created_at"
    );
    const catalog = cats.rows.map((c: Record<string, unknown>) => ({
      ...c,
      products: prods.rows.filter((p: Record<string, unknown>) => p.category_id === c.id),
    }));
    res.json(catalog);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── Seed categories ───────────────────────────────────────────────────────────
router.post("/admin/seed-categories", authMiddleware, async (req, res) => {
  const { categories } = req.body;
  for (const cat of categories) {
    await query(
      "INSERT INTO categories (id, title, emoji, description, sort_order) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING",
      [cat.id, cat.title, cat.emoji, cat.description || "", cat.sort_order || 0]
    );
  }
  res.json({ ok: true });
});

export default router;
