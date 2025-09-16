## Small E-Commerce — Frontend Documentation

### Overview
This is a Next.js (App Router) frontend for a small e-commerce store. It includes:
- Product listing and cart via React Context
- Checkout page with Cash-on Delivery and Chapa payment option
- Tailwind CSS styling and responsive layout
- Global footer and navbar components

### Quick Start
1. Install dependencies:
```
npm install
```
2. Run the dev server:
```
npm run dev
```
3. Open http://localhost:3000

### Key Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server

### Where to Look
- `src/app/page.tsx` — home page, product grid
- `src/components/CheckoutPage.tsx` — checkout UI + payment triggers
- `src/contexts/CartContext.tsx` — cart state and helpers
- `src/components/Footer.tsx` — global footer
- `src/data/products.ts` — sample product data

## Payment Flow (Frontend)

This project currently supports two checkout paths: Cash-on Delivery and Chapa.

### Cash-on Delivery
1. User selects Cash-on Delivery
2. Clicks Place Order
3. Frontend shows success message, clears cart, returns to home

### Chapa (via your backend)
1. User selects Chapa and clicks Place Order
2. Frontend generates a unique `tx_ref` like `order-<timestamp>-<rand>`
3. Frontend sends POST to your backend endpoint (placeholder `/api/payments/initialize`):
```json
{
  "amount": 100.5,
  "currency": "ETB",
  "tx_ref": "order-1703123456789-abc123",
  "provider": "chapa",
  "customer_email": "user@example.com",
  "customer_name": "Jane Doe"
}
```
4. Your backend calls Chapa and responds with `{ checkoutUrl, tx_ref }`
5. Frontend redirects the user to `checkoutUrl`

### Relevant Code
- `src/components/CheckoutPage.tsx`
  - `generateTxRef()` — creates unique `tx_ref`
  - `handleChapaPayment()` — calls backend and redirects to `checkoutUrl`
  - `processPayment()` — routes between cash and chapa






