# CrudeIntel

AI-powered crude oil price tracking, arbitrage detection, and prediction platform.

## Features

- **Real-time Price Tracking**: Monitor WTI, Brent, OPEC Basket, Dubai Crude, and Natural Gas prices
- **AI Predictions**: Get 1-day, 7-day, and 30-day price predictions powered by Google Gemini AI
- **Arbitrage Detection**: Identify profitable spread opportunities between benchmarks
- **News Sentiment Analysis**: AI-analyzed oil market news with bullish/bearish indicators
- **AI Chat Bot**: Interactive chat interface to ask questions about oil prices and predictions

## Tech Stack

### Frontend (`/web`)
- Next.js 14
- TypeScript
- Tailwind CSS (dark mode)
- Framer Motion & GSAP animations
- Recharts for data visualization

### Backend (`/api`)
- NestJS
- PostgreSQL + Prisma ORM
- Google Gemini AI
- WebSocket for real-time updates

## Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL database
- API Keys:
  - [EIA API](https://www.eia.gov/opendata/)
  - [Alpha Vantage](https://www.alphavantage.co/)
  - [NewsAPI](https://newsapi.org/)
  - [Google Gemini](https://ai.google.dev/)

### Installation

```bash
# Install dependencies for both web and api
npm run install:all

# Or install separately
cd web && npm install
cd api && npm install
```

### Environment Setup

Create `api/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/crudeintel"
EIA_API_KEY="your_eia_key"
ALPHA_VANTAGE_KEY="your_alpha_vantage_key"
NEWS_API_KEY="your_newsapi_key"
GEMINI_API_KEY="your_gemini_key"
```

Create `web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Database Setup

```bash
cd api
npx prisma generate
npx prisma db push
```

### Development

```bash
# Run both frontend and backend
npm run dev

# Or run separately
npm run dev:web  # Frontend on http://localhost:3000
npm run dev:api  # Backend on http://localhost:3001
```

### Production Build

```bash
npm run build
npm run start
```

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set root directory to `web`
3. Add environment variable: `NEXT_PUBLIC_API_URL`

### Backend (Railway/Render)
1. Connect your GitHub repo
2. Set root directory to `api`
3. Add all environment variables from `.env`
4. Set start command: `npm run start:prod`

## License

MIT
