This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📦 Database Schema: Asset Management System

### 🧱 Table: `asset_types`

```markdown
| Column      | Type     | Description                |
|-------------|----------|----------------------------|
| `id`        | INT      | Primary key                |
| `name`      | VARCHAR  | Asset type name            |
| `unit`      | VARCHAR  | Unit of measurement        |
| `description` | TEXT   | Asset type description     |
```

---

### 📦 Table: `assets`

```markdown
| Column         | Type     | Description                              |
|----------------|----------|------------------------------------------|
| `id`           | INT      | Primary key                              |
| `name`         | VARCHAR  | Asset name                               |
| `asset_type_id`| INT      | Foreign key → `asset_types(id)`          |
| `quantity`     | INT      | Current quantity                         |
| `code`         | VARCHAR  | Unique asset code                        |
| `description`  | TEXT     | Description of the asset                 |
| `create_date`  | DATE     | Date when the asset was created/added    |
```

---

### 💸 Table: `transactions`

```markdown
| Column            | Type     | Description                                 |
|-------------------|----------|---------------------------------------------|
| `id`              | INT      | Primary key                                 |
| `asset_id`        | INT      | Foreign key → `assets(id)`                  |
| `transaction_type`| ENUM     | Type of transaction (`IN`, `OUT`, `ADJUSTMENT`) |
| `quantity`        | INT      | Quantity involved in the transaction        |
| `price`           | DOUBLE   | Unit price at the time of transaction       |
| `transaction_date`| DATE     | Date of the transaction                     |
| `description`     | TEXT     | Additional notes or description             |
```

---

### 📈 Table: `price_history`

```markdown
| Column       | Type     | Description                                |
|--------------|----------|--------------------------------------------|
| `id`         | INT      | Primary key                                |
| `asset_id`   | INT      | Foreign key → `assets(id)`                 |
| `date`       | DATE     | Date the price was recorded (NOT NULL)     |
| `close_price`| DOUBLE   | Closing price of the asset on that date    |
| `create_date`| DATE     | Date the price entry was recorded          |
```

---

### 🔗 Relationships

```markdown
- `assets.asset_type_id` → `asset_types.id`
- `transactions.asset_id` → `assets.id`
- `price_history.asset_id` → `assets.id`
```
