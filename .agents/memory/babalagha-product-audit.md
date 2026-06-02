---
name: Bab Alagha product image audit
description: How to audit product image/name mismatches for the babalghamosul.com store
---
# Auditing product image vs name mismatches

Product images have the Arabic name + price baked into the photo as overlay text. A
"mismatch" = baked-in image text (or the photo) doesn't match the stored `name`.

**Workflow that works:**
1. List products per category: `GET /api/admin/products?category_id=X` (Bearer token).
2. Download each image: `GET /api/product-image/:id` → save as `NN_<id>.jpg` in sort order.
3. Build a labeled contact sheet with ImageMagick `montage`, labeling tiles by the
   numeric index (`NN`). **Arabic in montage `-label` fails / renders blank** — use
   ASCII index numbers only and a real font path:
   `-font /usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf`.
4. View the montage, read each tile's baked-in Arabic name, cross-reference against the
   printed index→stored-name list. Split big categories (>~20) into hi-res montages.

**Fixing a mismatch:** `PUT /api/admin/products/:id` (multipart). **Caution:** the PUT
resets description/price/note/sort_order to defaults if omitted — always resend the
current price/note/sort_order. Omitting the image file keeps the existing image_data.

**Why:** the create endpoint compresses images to JPEG via sharp; there's no bulk edit.
