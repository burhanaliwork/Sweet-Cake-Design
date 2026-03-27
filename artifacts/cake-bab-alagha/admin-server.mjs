import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import pg from "pg";

const { Pool } = pg;
const app = express();
const ADMIN_API_PORT = 3031;
const JWT_SECRET = process.env.JWT_SECRET || "babalagha_admin_secret_2024";
const ADMIN_EMAIL = "admin@babalagha.iq";
const ADMIN_PASSWORD = "BabAlagha@2024";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 }, storage: multer.memoryStorage() });

app.use(express.json({ limit: "10mb" }));

// ── Auth Middleware ────────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Unauthorized" });
  const token = header.replace("Bearer ", "");
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ── Init DB & Seed Admin ───────────────────────────────────────────────────────
async function initDb() {
  await pool.query(`
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

  const existing = await pool.query("SELECT id FROM admin_users WHERE email=$1", [ADMIN_EMAIL]);
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await pool.query("INSERT INTO admin_users (email, password_hash) VALUES ($1,$2)", [ADMIN_EMAIL, hash]);
    console.log("✅ Admin user created:", ADMIN_EMAIL);
  }
}

// ── Routes ─────────────────────────────────────────────────────────────────────

// Login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM admin_users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: "بيانات خاطئة" });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "بيانات خاطئة" });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Auth check
app.get("/api/admin/auth-check", authMiddleware, (req, res) => {
  res.json({ ok: true, email: req.admin.email });
});

// ── Categories ─────────────────────────────────────────────────────────────────
app.get("/api/admin/categories", authMiddleware, async (req, res) => {
  const result = await pool.query("SELECT * FROM categories ORDER BY sort_order, title");
  res.json(result.rows);
});

app.post("/api/admin/categories", authMiddleware, async (req, res) => {
  const { id, title, emoji, description, sort_order } = req.body;
  await pool.query(
    "INSERT INTO categories (id, title, emoji, description, sort_order) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO UPDATE SET title=$2, emoji=$3, description=$4, sort_order=$5",
    [id, title, emoji, description || "", sort_order || 0]
  );
  res.json({ ok: true });
});

app.put("/api/admin/categories/:id", authMiddleware, async (req, res) => {
  const { title, emoji, description } = req.body;
  await pool.query("UPDATE categories SET title=$1, emoji=$2, description=$3 WHERE id=$4", [title, emoji, description || "", req.params.id]);
  res.json({ ok: true });
});

app.delete("/api/admin/categories/:id", authMiddleware, async (req, res) => {
  await pool.query("DELETE FROM categories WHERE id=$1", [req.params.id]);
  res.json({ ok: true });
});

// ── Products ───────────────────────────────────────────────────────────────────
app.get("/api/admin/products", authMiddleware, async (req, res) => {
  const { category_id } = req.query;
  const q = category_id
    ? "SELECT * FROM products WHERE category_id=$1 ORDER BY sort_order, created_at"
    : "SELECT * FROM products ORDER BY category_id, sort_order, created_at";
  const result = await pool.query(q, category_id ? [category_id] : []);
  const rows = result.rows.map(r => ({ ...r, image_data: r.image_data?.substring(0, 50) ? "[image]" : "" }));
  res.json(rows);
});

// Get single product (with full image)
app.get("/api/admin/products/:id", authMiddleware, async (req, res) => {
  const result = await pool.query("SELECT * FROM products WHERE id=$1", [req.params.id]);
  res.json(result.rows[0] || null);
});

// Create product with optional image
app.post("/api/admin/products", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { id, category_id, name, description, price, note, sort_order } = req.body;
    let image_data = "";
    if (req.file) {
      const b64 = req.file.buffer.toString("base64");
      image_data = `data:${req.file.mimetype};base64,${b64}`;
    }
    await pool.query(
      "INSERT INTO products (id, category_id, name, description, price, note, image_data, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [id || `p_${Date.now()}`, category_id, name, description || "", price || "", note || "", image_data, sort_order || 0]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Update product
app.put("/api/admin/products/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, note, sort_order } = req.body;
    let imageUpdate = "";
    const params = [name, description || "", price || "", note || "", sort_order || 0, req.params.id];
    if (req.file) {
      const b64 = req.file.buffer.toString("base64");
      imageUpdate = ", image_data=$7";
      params.splice(5, 0, `data:${req.file.mimetype};base64,${b64}`);
      params[params.length - 1] = req.params.id;
    }
    await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, note=$4, sort_order=$5${imageUpdate} WHERE id=$${params.length}`,
      params
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Delete product
app.delete("/api/admin/products/:id", authMiddleware, async (req, res) => {
  await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
  res.json({ ok: true });
});

// ── Public product image ───────────────────────────────────────────────────────
app.get("/api/product-image/:id", async (req, res) => {
  const result = await pool.query("SELECT image_data FROM products WHERE id=$1", [req.params.id]);
  const row = result.rows[0];
  if (!row || !row.image_data) return res.status(404).send("Not found");
  const [meta, b64] = row.image_data.split(",");
  const mime = meta.replace("data:", "").replace(";base64", "");
  res.setHeader("Content-Type", mime);
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(Buffer.from(b64, "base64"));
});

// ── Public: all categories + products from DB ─────────────────────────────────
app.get("/api/catalog", async (req, res) => {
  try {
    const cats = await pool.query("SELECT * FROM categories ORDER BY sort_order, title");
    const prods = await pool.query("SELECT id, category_id, name, description, price, note, (CASE WHEN image_data != '' THEN '/api/product-image/' || id ELSE '' END) as image FROM products ORDER BY sort_order, created_at");
    const catalog = cats.rows.map(c => ({
      ...c,
      products: prods.rows.filter(p => p.category_id === c.id)
    }));
    res.json(catalog);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ── Seed categories ────────────────────────────────────────────────────────────
app.post("/api/admin/seed-categories", authMiddleware, async (req, res) => {
  const { categories } = req.body;
  for (const cat of categories) {
    await pool.query(
      "INSERT INTO categories (id, title, emoji, description, sort_order) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING",
      [cat.id, cat.title, cat.emoji, cat.description || "", cat.sort_order || 0]
    );
  }
  res.json({ ok: true });
});

// ── Start ──────────────────────────────────────────────────────────────────────
initDb().then(() => {
  app.listen(ADMIN_API_PORT, () => {
    console.log(`✅ Admin API running on port ${ADMIN_API_PORT}`);
  });
}).catch(err => {
  console.error("DB init error:", err);
  process.exit(1);
});
