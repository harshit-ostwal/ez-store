# E-Commerce

A modern, full-featured e-commerce storefront built with React 19 and Vite. Includes product browsing, category filtering, wishlist management, and client-side authentication — all powered by the [DummyJSON](https://dummyjson.com) API.

## Features

- **Product Catalog** — Browse all products with search and category filtering
- **Product Details** — Detailed product pages with related product suggestions
- **Categories** — Browse and filter products by category
- **Wishlist** — Save and manage favourite products (persisted to localStorage)
- **Authentication** — Sign up / sign in with bcrypt-hashed passwords stored in localStorage
- **User Profile** — View and edit account details
- **Dark / Light Mode** — Theme toggle powered by `next-themes`
- **Responsive Design** — Mobile-first layout built with Tailwind CSS v4

## Tech Stack

| Category | Library |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4, tw-animate-css |
| UI Components | shadcn/ui (Radix UI) |
| Icons | Lucide React, React Icons |
| Forms | React Hook Form + Zod |
| HTTP | Axios (with automatic retry) |
| Carousel | Embla Carousel |
| Notifications | Sonner |
| Auth / Crypto | bcryptjs, uuid |
| Linting / Formatting | Biome |

## Project Structure

```
src/
├── api/            # Axios API calls (products, categories)
├── components/
│   ├── app/        # Page-specific sections (Hero, Slider, ProductSection…)
│   ├── common/     # Shared components (Navbar, Footer, ProductCard…)
│   └── ui/         # shadcn/ui primitive components
├── constants/      # Static data and config constants
├── layouts/        # MainLayout and AuthLayout wrappers
├── lib/            # Axios instance, utility helpers
├── pages/          # Route-level page components
│   └── auth/       # Sign-in and Sign-up pages
├── providers/      # React context providers (Auth, Product)
├── routes/         # Centralised router definition (AppRoutes)
├── schema/         # Zod validation schemas
└── utils/          # localStorage and Zod utility helpers
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/categories` | All Categories |
| `/products` | All Products |
| `/products/:id` | Product Details |
| `/products/category/:category` | Category Products |
| `/my/whishlist` | Wishlist |
| `/my/profile` | Profile |
| `/about` | About |
| `/contact` | Contact |
| `/sign-in` | Sign In |
| `/sign-up` | Sign Up |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+ or [Bun](https://bun.sh)

### Installation

```bash
# Clone the repository
git clone https://github.com/harshit-ostwal/e-commerce.git
cd e-commerce

# Install dependencies
npm install   # or: bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://dummyjson.com
```

### Development

```bash
npm run dev   # or: bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build   # or: bun run build
```

### Preview Production Build

```bash
npm run preview
```

## Code Quality

This project uses [Biome](https://biomejs.dev) for linting and formatting.

```bash
npm run biome:check    # lint + format
npm run biome:format   # format only
npm run biome:lint     # lint only
```
