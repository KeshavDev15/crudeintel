# CrudeIntel - AI-Powered Crude Oil Intelligence Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/NestJS-red?style=for-the-badge&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Google%20Gemini-AI-orange?style=for-the-badge&logo=google" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

<br />

<div align="center">
  <strong>Real-time crude oil price tracking, AI-powered predictions, arbitrage detection, and market intelligence - all in one platform.</strong>
</div>

<br />

<div align="center">
  <a href="#-live-demo">Live Demo</a> |
  <a href="#-features">Features</a> |
  <a href="#-why-crude-oil-matters">Why It Matters</a> |
  <a href="#-getting-started">Getting Started</a> |
  <a href="#-api-documentation">API Docs</a>
</div>

---

## Table of Contents

- [Live Demo](#-live-demo)
- [Why Crude Oil Matters](#-why-crude-oil-matters-understanding-the-basics)
- [Who Is This For?](#-who-is-this-for)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## Live Demo

- **Frontend**: [https://crudeintel-one.vercel.app](https://crudeintel-one.vercel.app)
- **Backend API**: [https://crudeintel-jfs9.onrender.com](https://crudeintel-jfs9.onrender.com)

---

## Why Crude Oil Matters: Understanding the Basics

### What is Crude Oil?

Crude oil is a naturally occurring, unrefined petroleum product composed of hydrocarbon deposits and other organic materials. It's often called "black gold" because of its immense value to the global economy.

### Why Should You Care About Oil Prices?

Even if you're not a trader or investor, crude oil prices affect your daily life in many ways:

| Impact Area | How Oil Prices Affect You |
|-------------|---------------------------|
| **Gas Prices** | When crude oil prices rise, you pay more at the pump. A $10 increase in oil prices can add $0.25-0.30 per gallon to gasoline prices. |
| **Food Costs** | Farmers use diesel for tractors, trucks transport food using fuel. Higher oil = higher food prices. |
| **Airline Tickets** | Jet fuel is derived from oil. Airlines often raise ticket prices when oil costs increase. |
| **Heating Bills** | Many homes use heating oil. Winter heating costs directly correlate with oil prices. |
| **Product Prices** | Plastics, cosmetics, medicines, and thousands of products are made from petroleum. |
| **Job Market** | Oil industry employs millions globally. Price changes affect employment in energy sectors. |
| **Stock Market** | Energy stocks make up a significant portion of market indices. Oil prices influence overall market performance. |

### Key Oil Benchmarks Explained

CrudeIntel tracks these major global benchmarks:

| Benchmark | Full Name | Region | Why It Matters |
|-----------|-----------|--------|----------------|
| **WTI** | West Texas Intermediate | North America | The primary US oil benchmark. Light, sweet crude ideal for gasoline production. |
| **Brent** | Brent Crude | Europe/Global | The international benchmark used to price ~80% of global oil. Extracted from the North Sea. |
| **OPEC Basket** | OPEC Reference Basket | Middle East | Average price of oils from OPEC member countries (Saudi Arabia, UAE, etc.). |
| **Dubai Crude** | Dubai/Oman | Asia | Primary benchmark for Middle Eastern oil exports to Asia. |
| **Natural Gas** | Henry Hub | Global | While not oil, natural gas prices often correlate with oil and affect energy markets. |

### What is Arbitrage?

Arbitrage is the practice of taking advantage of price differences between markets. In oil trading:

- **Example**: If WTI is $90/barrel and Brent is $95/barrel, a trader could theoretically buy WTI and sell Brent, profiting from the $5 spread (minus transaction costs).
- **Why It Matters**: These price differences indicate market inefficiencies and can signal upcoming price movements.
- **CrudeIntel's Role**: We automatically detect these opportunities and calculate potential profits, saving hours of manual analysis.

---

## Who Is This For?

### For Traders & Investors
- Real-time price monitoring across multiple benchmarks
- AI-powered predictions for 1-day, 7-day, and 30-day horizons
- Arbitrage opportunity detection with profit calculations
- News sentiment analysis to gauge market mood

### For Business Owners
- Track fuel costs that affect your supply chain
- Plan purchases based on price predictions
- Understand market trends affecting your industry

### For Students & Researchers
- Learn how oil markets work
- Analyze historical price patterns
- Understand AI applications in financial markets

### For Curious Individuals
- Understand why gas prices change
- Learn about global energy markets
- See AI in action with real market data

---

## Features

### 1. Real-Time Price Tracking

Monitor live prices for 5 major crude oil benchmarks with automatic updates every 2 minutes.

**What you see:**
- Current price per barrel in USD
- 24-hour price change (absolute and percentage)
- 24-hour high and low prices
- Data source attribution
- Visual trend indicators (up/down arrows)

**Data Sources:**
- EIA (U.S. Energy Information Administration)
- Alpha Vantage Financial API
- Yahoo Finance

### 2. AI-Powered Price Predictions

Our AI analyzes multiple data points to predict future oil prices:

**Prediction Horizons:**
- **1-Day Forecast**: Short-term prediction for day traders
- **7-Day Forecast**: Weekly outlook for swing traders
- **30-Day Forecast**: Monthly trend for investors and businesses

**AI Analysis Includes:**
- Historical price patterns
- Current market momentum
- News sentiment analysis
- Cross-benchmark correlations
- Seasonal trends

**Confidence Scoring:**
- Each prediction includes a confidence percentage (0-100%)
- Higher confidence = more reliable prediction
- Factors affecting confidence are explained

### 3. Arbitrage Detection

Automatically identifies profitable trading opportunities between benchmarks.

**Features:**
- Real-time spread calculations
- Net profit estimates (after transaction costs)
- High-spread alerts (>2% spread)
- Historical spread analysis
- Visual spread matrix

**How to Read:**
- **Spread**: Price difference between two benchmarks
- **Spread %**: Spread as a percentage of the lower price
- **Net Profit**: Estimated profit after $0.50/barrel transaction cost
- **High Spread Badge**: Indicates potentially profitable opportunity

### 4. AI Chat Assistant

Interactive chatbot powered by Google Gemini AI for oil market questions.

**You Can Ask:**
- "What will WTI price be next week?"
- "Is now a good time to buy oil stocks?"
- "Why is Brent more expensive than WTI?"
- "What factors are affecting oil prices today?"
- "Explain the OPEC+ production cuts"

**The AI Knows:**
- Current real-time prices
- Latest news headlines
- Historical context
- Market fundamentals

### 5. News Sentiment Analysis

AI-analyzed news articles with market sentiment indicators.

**Sentiment Categories:**
- **Bullish**: News likely to push prices UP (green)
- **Bearish**: News likely to push prices DOWN (red)
- **Neutral**: Minimal price impact expected (gray)

**Impact Levels:**
- **High**: Major market-moving news
- **Medium**: Notable but limited impact
- **Low**: Minor market relevance

### 6. Real-Time WebSocket Updates

Live updates without page refresh using WebSocket technology.

**What Updates Live:**
- Price changes
- New arbitrage opportunities
- Breaking news alerts
- Prediction updates

---

## Screenshots

### Dashboard
The main dashboard provides an at-a-glance view of the entire oil market:
- Price cards for all 5 benchmarks
- Interactive price chart
- Top arbitrage opportunities
- Latest news feed

### AI Chat
Conversational interface for market questions:
- Natural language processing
- Context-aware responses
- Real-time market data integration

### Predictions Page
Detailed AI forecasts for each benchmark:
- Visual confidence meters
- Price change projections
- Key factors analysis
- Sentiment indicators

### Arbitrage Page
Complete arbitrage analysis:
- All trading opportunities ranked by profitability
- Spread visualization
- Historical spread trends
- Real-time alerts

---

## How It Works

### Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Data Sources  │────>│  NestJS Backend │────>│  Next.js Frontend│
│  (EIA, Yahoo,   │     │  (Processing &  │     │  (Visualization  │
│   Alpha Vantage)│     │   AI Analysis)  │     │   & Interaction) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               v
                        ┌─────────────────┐
                        │   PostgreSQL    │
                        │   (Storage &    │
                        │    History)     │
                        └─────────────────┘
```

### Update Cycle

1. **Every 2 Minutes**: Prices fetched from data sources
2. **Every 5 Minutes**: AI predictions regenerated
3. **Every 30 Minutes**: News articles refreshed and analyzed
4. **Real-time**: Arbitrage calculations on every price update

### AI Processing

```
┌──────────────────────────────────────────────────────────┐
│                    Google Gemini AI                       │
├──────────────────────────────────────────────────────────┤
│  Inputs:                                                  │
│  • Current prices for all benchmarks                     │
│  • 30-day price history                                  │
│  • Recent news headlines with sentiment                  │
│  • Cross-benchmark correlations                          │
│                                                          │
│  Outputs:                                                │
│  • Price predictions (1d, 7d, 30d)                      │
│  • Confidence scores                                     │
│  • Reasoning explanations                                │
│  • Key factors analysis                                  │
│  • Sentiment classification                              │
└──────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend (`/web`)

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router for server-side rendering |
| **TypeScript** | Type-safe JavaScript for better code quality |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Framer Motion** | Smooth animations and transitions |
| **GSAP** | Advanced animations for complex interactions |
| **Recharts** | Data visualization for price charts |
| **TanStack Query** | Data fetching and caching |
| **Socket.io Client** | Real-time WebSocket communication |

### Backend (`/api`)

| Technology | Purpose |
|------------|---------|
| **NestJS** | Enterprise-grade Node.js framework |
| **TypeScript** | Type-safe backend development |
| **Prisma ORM** | Database toolkit and query builder |
| **PostgreSQL** | Relational database for data persistence |
| **Google Gemini AI** | AI/ML for predictions and chat |
| **Socket.io** | Real-time bidirectional communication |
| **Axios** | HTTP client for external API calls |
| **node-cron** | Scheduled tasks for data fetching |

### External APIs

| API | Purpose | Free Tier |
|-----|---------|-----------|
| **EIA API** | Official US government energy data | Unlimited |
| **Alpha Vantage** | Financial market data | 25 requests/day |
| **Yahoo Finance** | Real-time stock/commodity data | Unlimited |
| **NewsAPI** | News article aggregation | 100 requests/day |
| **Google Gemini** | AI predictions and chat | 60 requests/minute |

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Vercel)                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     Next.js 14 App                          ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       ││
│  │  │Dashboard │ │   Chat   │ │Arbitrage │ │Predictions│       ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       ││
│  │                         │                                    ││
│  │  ┌─────────────────────────────────────────────────────┐   ││
│  │  │              TanStack Query + Socket.io              │   ││
│  │  └─────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTPS / WebSocket
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND (Render)                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                      NestJS Application                      ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       ││
│  │  │  Prices  │ │Arbitrage │ │Prediction│ │   Chat   │       ││
│  │  │ Service  │ │ Service  │ │ Service  │ │ Service  │       ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       ││
│  │       │            │            │            │              ││
│  │  ┌─────────────────────────────────────────────────────┐   ││
│  │  │                  Prisma ORM                          │   ││
│  │  └─────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
         │                                        │
         ▼                                        ▼
┌─────────────────┐                    ┌─────────────────────────┐
│   PostgreSQL    │                    │     External APIs       │
│   (Render)      │                    │  • EIA                  │
│                 │                    │  • Alpha Vantage        │
│  • PriceSnapshot│                    │  • Yahoo Finance        │
│  • Predictions  │                    │  • NewsAPI              │
│  • Arbitrage    │                    │  • Google Gemini        │
│  • NewsArticles │                    └─────────────────────────┘
└─────────────────┘
```

### Database Schema

```prisma
model PriceSnapshot {
  id          String   @id @default(uuid())
  benchmark   String   // WTI, BRENT, OPEC, DUBAI, NATGAS
  price       Float
  change      Float
  changePercent Float
  high24h     Float
  low24h      Float
  volume      Float?
  source      String
  timestamp   DateTime @default(now())
  createdAt   DateTime @default(now())
}

model PricePrediction {
  id          String   @id @default(uuid())
  benchmark   String
  currentPrice Float
  predicted1d Float
  predicted7d Float
  predicted30d Float
  confidence  Int
  sentiment   String   // bullish, bearish, neutral
  reasoning   String
  keyFactors  String[]
  createdAt   DateTime @default(now())
}

model ArbitrageOpportunity {
  id            String   @id @default(uuid())
  buyBenchmark  String
  sellBenchmark String
  buyPrice      Float
  sellPrice     Float
  spread        Float
  spreadPercent Float
  detectedAt    DateTime @default(now())
}

model NewsArticle {
  id          String   @id @default(uuid())
  title       String
  description String
  url         String   @unique
  source      String
  publishedAt DateTime
  sentiment   String
  impact      String
  createdAt   DateTime @default(now())
}
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/KeshavDev15/crudeintel.git
cd crudeintel
```

#### 2. Install Dependencies

```bash
# Install root dependencies (concurrently for running both apps)
npm install

# Install all dependencies for both frontend and backend
npm run install:all
```

#### 3. Set Up Environment Variables

Create the required environment files:

**Backend (`api/.env`):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/crudeintel"
EIA_API_KEY="your_eia_api_key"
ALPHA_VANTAGE_KEY="your_alpha_vantage_key"
NEWS_API_KEY="your_newsapi_key"
GEMINI_API_KEY="your_gemini_api_key"
```

**Frontend (`web/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### 4. Set Up the Database

```bash
cd api

# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

cd ..
```

#### 5. Run the Application

```bash
# Run both frontend and backend concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
npm run dev:api

# Terminal 2 - Frontend
npm run dev:web
```

#### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api

---

## Environment Variables

### Backend Environment Variables

| Variable | Description | Required | How to Get |
|----------|-------------|----------|------------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | Your database provider |
| `EIA_API_KEY` | U.S. Energy Information Administration API key | Yes | [EIA Registration](https://www.eia.gov/opendata/register.php) |
| `ALPHA_VANTAGE_KEY` | Alpha Vantage financial data API key | Yes | [Alpha Vantage](https://www.alphavantage.co/support/#api-key) |
| `NEWS_API_KEY` | NewsAPI.org API key | Yes | [NewsAPI](https://newsapi.org/register) |
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `PORT` | Backend server port | No | Default: 3001 |
| `FRONTEND_URL` | Frontend URL for CORS | No | Default: http://localhost:3000 |

### Frontend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

### Getting API Keys

#### EIA API Key (Free)
1. Go to [EIA Open Data](https://www.eia.gov/opendata/register.php)
2. Fill out the registration form
3. Receive your API key via email

#### Alpha Vantage Key (Free)
1. Go to [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Enter your email
3. Get instant API key

#### NewsAPI Key (Free)
1. Go to [NewsAPI](https://newsapi.org/register)
2. Create an account
3. Get your API key from the dashboard

#### Google Gemini API Key (Free)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"

---

## API Documentation

### Base URL
- **Local**: `http://localhost:3001/api`
- **Production**: `https://crudeintel-jfs9.onrender.com/api`

### Endpoints

#### Prices

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/prices` | Get all benchmark prices |
| GET | `/prices/:benchmark` | Get specific benchmark price |
| GET | `/prices/:benchmark/history` | Get price history |
| GET | `/prices/refresh/all` | Force refresh all prices |

**Example Response - GET /prices:**
```json
[
  {
    "benchmark": "WTI",
    "price": 93.39,
    "currency": "USD",
    "unit": "barrel",
    "change": 1.25,
    "changePercent": 1.36,
    "high24h": 94.50,
    "low24h": 92.10,
    "timestamp": "2026-03-25T08:00:00Z",
    "source": "EIA"
  }
]
```

#### Arbitrage

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/arbitrage` | Get all arbitrage opportunities |
| GET | `/arbitrage/best?limit=5` | Get top N opportunities |
| GET | `/arbitrage/history` | Get historical opportunities |
| GET | `/arbitrage/spread` | Get spread matrix |

**Example Response - GET /arbitrage/best:**
```json
[
  {
    "id": "WTI-BRENT-1234567890",
    "buyBenchmark": "WTI",
    "sellBenchmark": "BRENT",
    "buyPrice": 93.39,
    "sellPrice": 95.62,
    "spread": 2.23,
    "spreadPercent": 2.39,
    "netProfit": 1.73,
    "isViable": true,
    "detectedAt": "2026-03-25T08:00:00Z"
  }
]
```

#### Predictions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/predictions` | Get all predictions |
| GET | `/predictions/:benchmark` | Get specific prediction |
| GET | `/predictions/:benchmark/history` | Get prediction history |

**Example Response - GET /predictions/WTI:**
```json
{
  "benchmark": "WTI",
  "currentPrice": 93.39,
  "predicted1d": 93.85,
  "predicted7d": 95.20,
  "predicted30d": 98.50,
  "confidence": 72,
  "sentiment": "bullish",
  "reasoning": "Strong demand signals and OPEC+ production discipline support prices.",
  "keyFactors": ["OPEC+ cuts", "Summer driving season", "US inventory draws"],
  "generatedAt": "2026-03-25T08:00:00Z"
}
```

#### Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | Send message to AI assistant |
| GET | `/chat/health` | Check chat service health |

**Request - POST /chat:**
```json
{
  "message": "What will oil prices do next week?"
}
```

**Response:**
```json
{
  "response": "Based on current market conditions, WTI crude is expected to..."
}
```

#### News

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/news` | Get latest news articles |
| GET | `/news/refresh` | Force refresh news |

---

## Deployment

### Deploy to Vercel (Frontend)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Root Directory: `web`
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Add Environment Variable**
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Deploy to Render (Backend)

1. **Create PostgreSQL Database**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "PostgreSQL"
   - Note the External Database URL

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `crudeintel-api`
     - Root Directory: `api`
     - Build Command: `npm install && npx prisma generate && npx prisma db push && npm run build`
     - Start Command: `npm run start:prod`

3. **Add Environment Variables**
   ```
   DATABASE_URL = [Your Render PostgreSQL URL]
   EIA_API_KEY = [Your EIA Key]
   ALPHA_VANTAGE_KEY = [Your Alpha Vantage Key]
   NEWS_API_KEY = [Your NewsAPI Key]
   GEMINI_API_KEY = [Your Gemini Key]
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build and deployment

### Post-Deployment

1. Update Vercel's `NEXT_PUBLIC_API_URL` with your Render backend URL
2. Redeploy frontend on Vercel
3. Test all features

---

## Project Structure

```
crudeintel/
├── api/                          # Backend (NestJS)
│   ├── src/
│   │   ├── arbitrage/           # Arbitrage detection module
│   │   │   ├── arbitrage.controller.ts
│   │   │   ├── arbitrage.module.ts
│   │   │   └── arbitrage.service.ts
│   │   ├── chat/                # AI Chat module
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.module.ts
│   │   │   └── chat.service.ts
│   │   ├── common/              # Shared types and constants
│   │   │   ├── constants.ts
│   │   │   └── types.ts
│   │   ├── news/                # News aggregation module
│   │   │   ├── news.controller.ts
│   │   │   ├── news.module.ts
│   │   │   └── news.service.ts
│   │   ├── prediction/          # AI Predictions module
│   │   │   ├── prediction.controller.ts
│   │   │   ├── prediction.module.ts
│   │   │   └── prediction.service.ts
│   │   ├── prices/              # Price tracking module
│   │   │   ├── prices.controller.ts
│   │   │   ├── prices.module.ts
│   │   │   └── prices.service.ts
│   │   ├── prisma/              # Database module
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── realtime/            # WebSocket module
│   │   │   ├── realtime.gateway.ts
│   │   │   └── realtime.module.ts
│   │   ├── scheduler/           # Cron jobs module
│   │   │   ├── scheduler.module.ts
│   │   │   └── scheduler.service.ts
│   │   ├── sources/             # External API integrations
│   │   │   ├── alphavantage.service.ts
│   │   │   ├── eia.service.ts
│   │   │   ├── sources.module.ts
│   │   │   └── yahoo.service.ts
│   │   ├── app.module.ts        # Root module
│   │   └── main.ts              # Application entry point
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── web/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   │   ├── arbitrage/
│   │   │   │   └── page.tsx
│   │   │   ├── chat/
│   │   │   │   └── page.tsx
│   │   │   ├── markets/
│   │   │   │   └── page.tsx
│   │   │   ├── news/
│   │   │   │   └── page.tsx
│   │   │   ├── predictions/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx         # Dashboard
│   │   ├── components/
│   │   │   ├── dashboard/       # Dashboard components
│   │   │   │   ├── ArbitrageCard.tsx
│   │   │   │   ├── BenchmarkCard.tsx
│   │   │   │   ├── NewsCard.tsx
│   │   │   │   ├── PredictionCard.tsx
│   │   │   │   ├── PriceChart.tsx
│   │   │   │   └── SpreadMatrix.tsx
│   │   │   ├── ui/              # Reusable UI components
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── tabs.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Providers.tsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useArbitrage.ts
│   │   │   ├── useNews.ts
│   │   │   ├── usePredictions.ts
│   │   │   └── usePrices.ts
│   │   └── lib/                 # Utilities
│   │       ├── api.ts           # API client
│   │       ├── socket.ts        # WebSocket client
│   │       └── utils.ts         # Helper functions
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
├── package.json                  # Root package.json
├── README.md                     # This file
└── .gitignore
```

---

## Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs

1. Check existing [Issues](https://github.com/KeshavDev15/crudeintel/issues)
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. Open a new [Issue](https://github.com/KeshavDev15/crudeintel/issues)
2. Use the "Feature Request" template
3. Describe the feature and its benefits

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## Troubleshooting

### Common Issues

#### "CORS Error" in Browser Console
**Solution**: Ensure your backend's CORS configuration includes your frontend URL.

```typescript
// api/src/main.ts
app.enableCors({
  origin: ['http://localhost:3000', 'https://your-vercel-url.vercel.app'],
  credentials: true,
});
```

#### "Database Table Does Not Exist"
**Solution**: Run Prisma migrations:
```bash
cd api
npx prisma db push
```

#### "Gemini API Error: Model Not Found"
**Solution**: Update to the latest model name:
```typescript
this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
```

#### "Rate Limit Exceeded" for APIs
**Solutions**:
- Wait for the rate limit to reset
- Upgrade to a paid API plan
- Implement caching to reduce API calls

#### WebSocket Connection Failed
**Solution**: Update socket URL in production:
```typescript
// web/src/lib/socket.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const WS_URL = API_URL.replace('/api', '');
```

### Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/KeshavDev15/crudeintel/issues)
- **Discussions**: [Ask questions](https://github.com/KeshavDev15/crudeintel/discussions)

---

## Roadmap

### Upcoming Features

- [ ] User authentication and portfolios
- [ ] Email/SMS price alerts
- [ ] Historical data visualization
- [ ] Mobile app (React Native)
- [ ] More benchmarks (Urals, WCS, etc.)
- [ ] Technical analysis indicators
- [ ] API rate for developers

---

## Acknowledgments

- **Data Providers**: EIA, Alpha Vantage, Yahoo Finance, NewsAPI
- **AI**: Google Gemini
- **Frameworks**: NestJS, Next.js, Tailwind CSS
- **Hosting**: Vercel, Render

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ for the energy markets community</p>
  <p>
    <a href="https://github.com/KeshavDev15/crudeintel">GitHub</a> •
    <a href="https://crudeintel-one.vercel.app">Live Demo</a>
  </p>
</div>
