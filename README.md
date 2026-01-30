# AISOM Web Portal

SvelteKit + Vite + Bun + Paraglide (inlang)
รองรับ Multi-language (i18n) แบบ production-grade

---

## 🚀 Tech Stack

* **SvelteKit**
* **Vite**
* **Bun**
* **Paraglide (inlang) – i18n**
* **TypeScript**

---

## 📦 Prerequisites

ต้องมี:

* **Bun** ≥ 1.1
  👉 [https://bun.sh](https://bun.sh)

ตรวจสอบ:

```bash
bun --version
```

---

## 📥 Installation

### 1. Clone repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

---

### 2. Install dependencies

```bash
bun install
```

---

## 🌐 i18n (Paraglide / inlang)

### ▶️ Init ครั้งแรก (จำเป็น)

```bash
bunx @inlang/paraglide-js@latest init
```

จะสร้าง:

* `project.inlang/`
* config พื้นฐานสำหรับ multi-language

---

### 📝 Messages

ไฟล์ข้อความอยู่ที่:

```
messages/
├─ en.json
├─ th.json
```

แก้ข้อความที่นี่เท่านั้น
**ห้ามแก้ไฟล์ที่ generate แล้ว**

---

### 🔧 Compile i18n (manual)

```bash
bunx @inlang/paraglide-js@latest compile
```

> output จะอยู่ที่:

```
src/paraglide/
```

> ❗ directory นี้เป็น **source artifact**
> ห้าม import ตรง

---

### ⚡ Dev mode (auto sync)

ตอน `bun dev`:

* `paraglideVitePlugin`
* จะ copy + sync ไฟล์ไปที่:

```
src/lib/i18n/
```

ดังนั้นใน code ให้ import แบบนี้เสมอ:

```ts
import { m } from '$lib/i18n/messages'
```

---

## ▶️ Run (Development)

```bash
bun dev
```

* URL: [http://localhost:5173](http://localhost:5173)
* รองรับ HMR
* i18n sync อัตโนมัติ

---

## 🏗 Build (Production)

### 1. Compile i18n

```bash
bunx @inlang/paraglide-js@latest compile
```

### 2. Build app

```bash
bun run build
```

---

## ▶️ Preview (Production-like)

```bash
bun run preview
```

หรือ

```bash
bun run start
```

---

## 🌍 Language Strategy

ตั้งค่าใน `vite.config.ts`:

```ts
paraglideVitePlugin({
  project: './project.inlang',
  outdir: './src/lib/i18n',
  strategy: ['url', 'cookie', 'baseLocale']
})
```

รองรับ:

* URL (`/th`, `/en`)
* Cookie
* Base locale fallback

---

## 🔠 Font & Thai Language Note

ภาษาไทยควรใช้ font เฉพาะ
แนะนำ:

* **Noto Sans Thai**
* **Sarabun**

และเพิ่ม `line-height` ให้เหมาะสม
เพื่อให้การอ่านสบายตา

---

## 📁 Project Structure (สำคัญ)

```
src/
├─ lib/
│  └─ i18n/        # ← ใช้ import จากตรงนี้เท่านั้น
├─ paraglide/     # ← auto generated (DO NOT EDIT)
├─ routes/
```

---

## ⚠️ Important Notes

* ❌ ห้ามแก้ไฟล์ใน `src/paraglide`
* ✅ แก้เฉพาะ `messages/*.json`
* ✅ import i18n ผ่าน `$lib/i18n/*` เท่านั้น
* ✅ run `compile` ก่อน build เสมอ

---

## 📌 Next Steps (Optional)

* Locale switcher (dropdown)
* Bind locale กับ user profile / Keycloak
* SEO-aware `/th /en` routing
* Theme per language (TH / EN)

---

## 📄 License

Private / Internal use
