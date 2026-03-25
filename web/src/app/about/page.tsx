'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Droplets,
  Brain,
  LineChart,
  ArrowLeftRight,
  Newspaper,
  MessageSquare,
  Mail,
  Globe,
  Zap,
  TrendingUp,
  TrendingDown,
  Database,
  Server,
  Code2,
  Sparkles,
  Fuel,
  Plane,
  Home,
  ShoppingCart,
  Briefcase,
  BarChart3,
  Users,
  GraduationCap,
  HelpCircle,
  Clock,
  RefreshCw,
  Wifi,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const oilImpacts = [
  { icon: Fuel, area: 'Gas Prices', description: 'A $10 increase in oil prices can add $0.25-0.30 per gallon to gasoline prices.' },
  { icon: ShoppingCart, area: 'Food Costs', description: 'Farmers use diesel for tractors, trucks transport food using fuel. Higher oil = higher food prices.' },
  { icon: Plane, area: 'Airline Tickets', description: 'Jet fuel is derived from oil. Airlines often raise ticket prices when oil costs increase.' },
  { icon: Home, area: 'Heating Bills', description: 'Many homes use heating oil. Winter heating costs directly correlate with oil prices.' },
  { icon: ShoppingCart, area: 'Product Prices', description: 'Plastics, cosmetics, medicines, and thousands of products are made from petroleum.' },
  { icon: Briefcase, area: 'Job Market', description: 'Oil industry employs millions globally. Price changes affect employment in energy sectors.' },
];

const benchmarks = [
  { name: 'WTI', fullName: 'West Texas Intermediate', region: 'North America', description: 'The primary US oil benchmark. Light, sweet crude ideal for gasoline production.' },
  { name: 'Brent', fullName: 'Brent Crude', region: 'Europe/Global', description: 'The international benchmark used to price ~80% of global oil. Extracted from the North Sea.' },
  { name: 'OPEC', fullName: 'OPEC Reference Basket', region: 'Middle East', description: 'Average price of oils from OPEC member countries (Saudi Arabia, UAE, etc.).' },
  { name: 'Dubai', fullName: 'Dubai/Oman Crude', region: 'Asia', description: 'Primary benchmark for Middle Eastern oil exports to Asia.' },
  { name: 'NATGAS', fullName: 'Henry Hub Natural Gas', region: 'Global', description: 'While not oil, natural gas prices often correlate with oil and affect energy markets.' },
];

const userTypes = [
  {
    icon: TrendingUp,
    title: 'Traders & Investors',
    points: [
      'Real-time price monitoring across multiple benchmarks',
      'AI-powered predictions for 1-day, 7-day, and 30-day horizons',
      'Arbitrage opportunity detection with profit calculations',
      'News sentiment analysis to gauge market mood',
    ],
  },
  {
    icon: Briefcase,
    title: 'Business Owners',
    points: [
      'Track fuel costs that affect your supply chain',
      'Plan purchases based on price predictions',
      'Understand market trends affecting your industry',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Students & Researchers',
    points: [
      'Learn how oil markets work',
      'Analyze historical price patterns',
      'Understand AI applications in financial markets',
    ],
  },
  {
    icon: HelpCircle,
    title: 'Curious Individuals',
    points: [
      'Understand why gas prices change',
      'Learn about global energy markets',
      'See AI in action with real market data',
    ],
  },
];

const features = [
  {
    icon: LineChart,
    title: 'Real-Time Price Tracking',
    description: 'Monitor live prices for 5 major crude oil benchmarks with automatic updates every 2 minutes.',
    details: ['Current price per barrel in USD', '24-hour price change', '24-hour high and low', 'Visual trend indicators'],
    color: 'emerald',
  },
  {
    icon: Brain,
    title: 'AI-Powered Predictions',
    description: 'Google Gemini AI analyzes market data for 1-day, 7-day, and 30-day price forecasts.',
    details: ['Historical price patterns', 'News sentiment analysis', 'Cross-benchmark correlations', 'Confidence scoring (0-100%)'],
    color: 'blue',
  },
  {
    icon: ArrowLeftRight,
    title: 'Arbitrage Detection',
    description: 'Automatically identifies profitable trading opportunities between benchmarks.',
    details: ['Real-time spread calculations', 'Net profit estimates', 'High-spread alerts (>2%)', 'Visual spread matrix'],
    color: 'amber',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Interactive chatbot for oil market questions powered by Google Gemini AI.',
    details: ['Natural language processing', 'Real-time market data', 'Context-aware responses', 'Prediction requests'],
    color: 'purple',
  },
  {
    icon: Newspaper,
    title: 'News Sentiment Analysis',
    description: 'AI-analyzed news articles with bullish, bearish, or neutral sentiment indicators.',
    details: ['Real-time news aggregation', 'Sentiment classification', 'Impact level scoring', 'Market relevance filtering'],
    color: 'pink',
  },
  {
    icon: Wifi,
    title: 'Real-Time WebSocket Updates',
    description: 'Live updates without page refresh using WebSocket technology.',
    details: ['Instant price changes', 'New arbitrage alerts', 'Breaking news updates', 'Prediction refreshes'],
    color: 'cyan',
  },
];

const updateCycles = [
  { interval: 'Every 2 min', action: 'Prices fetched from data sources', icon: RefreshCw },
  { interval: 'Every 5 min', action: 'AI predictions regenerated', icon: Brain },
  { interval: 'Every 30 min', action: 'News articles refreshed and analyzed', icon: Newspaper },
  { interval: 'Real-time', action: 'Arbitrage calculations on price update', icon: Zap },
];

const techStack = {
  frontend: [
    { name: 'Next.js 14', purpose: 'React framework with App Router' },
    { name: 'TypeScript', purpose: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', purpose: 'Utility-first styling' },
    { name: 'Framer Motion', purpose: 'Smooth animations' },
    { name: 'Recharts', purpose: 'Data visualization' },
    { name: 'TanStack Query', purpose: 'Data fetching & caching' },
  ],
  backend: [
    { name: 'NestJS', purpose: 'Enterprise Node.js framework' },
    { name: 'PostgreSQL', purpose: 'Relational database' },
    { name: 'Prisma ORM', purpose: 'Database toolkit' },
    { name: 'Socket.io', purpose: 'Real-time communication' },
    { name: 'Google Gemini', purpose: 'AI predictions & chat' },
    { name: 'node-cron', purpose: 'Scheduled tasks' },
  ],
};

export default function AboutPage() {
  return (
    <motion.div
      className="space-y-6 sm:space-y-8 pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div
        className="text-center py-8 sm:py-12"
        variants={itemVariants}
      >
        <motion.div
          className="inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 mb-4 sm:mb-6 shadow-2xl shadow-emerald-500/30"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Droplets className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          CrudeIntel
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
          AI-Powered Crude Oil Price Intelligence Platform
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-6">
          <Badge variant="bullish" className="text-xs sm:text-sm">Real-Time Data</Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs sm:text-sm">AI Predictions</Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs sm:text-sm">Sentiment Analysis</Badge>
        </div>
      </motion.div>

      {/* Why Crude Oil Matters */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Droplets className="h-5 w-5 text-emerald-500" />
              Why Crude Oil Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* What is Crude Oil */}
            <div>
              <h3 className="font-semibold text-white mb-2">What is Crude Oil?</h3>
              <p className="text-sm sm:text-base text-zinc-400">
                Crude oil is a naturally occurring, unrefined petroleum product composed of hydrocarbon deposits and other organic materials.
                It&apos;s often called &quot;black gold&quot; because of its immense value to the global economy.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white">$85-95</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Typical barrel price (USD)</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white">100M+</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Barrels consumed daily</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white">4%</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Of global GDP</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-white">160+</p>
                <p className="text-[10px] sm:text-xs text-zinc-500">Countries affected</p>
              </div>
            </div>

            {/* How it affects you */}
            <div>
              <h3 className="font-semibold text-white mb-3">How Oil Prices Affect Your Daily Life</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {oilImpacts.map((impact, idx) => {
                  const Icon = impact.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                      <div className="p-2 rounded-lg bg-emerald-500/10 flex-shrink-0">
                        <Icon className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{impact.area}</p>
                        <p className="text-xs text-zinc-500">{impact.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Benchmarks */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              Key Oil Benchmarks Explained
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {benchmarks.map((benchmark, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-sm font-bold min-w-[60px] text-center">
                      {benchmark.name}
                    </span>
                    <div className="sm:hidden">
                      <Badge className="bg-zinc-700/50 text-zinc-400 text-[10px]">{benchmark.region}</Badge>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-white">{benchmark.fullName}</p>
                      <Badge className="hidden sm:inline-flex bg-zinc-700/50 text-zinc-400 text-[10px]">{benchmark.region}</Badge>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{benchmark.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* What is Arbitrage */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-amber-950/20 to-zinc-950 border-amber-800/30">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-amber-500" />
              What is Arbitrage?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm sm:text-base text-zinc-400">
              Arbitrage is the practice of taking advantage of price differences between markets. In oil trading:
            </p>
            <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <p className="text-sm text-zinc-300 mb-2"><span className="text-amber-400 font-semibold">Example:</span></p>
              <p className="text-sm text-zinc-400">
                If WTI is <span className="text-emerald-400">$90/barrel</span> and Brent is <span className="text-emerald-400">$95/barrel</span>,
                a trader could theoretically buy WTI and sell Brent, profiting from the <span className="text-amber-400 font-semibold">$5 spread</span> (minus transaction costs).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                <p className="text-xs font-medium text-amber-400 mb-1">Why It Matters</p>
                <p className="text-xs text-zinc-500">Price differences indicate market inefficiencies and can signal upcoming price movements.</p>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                <p className="text-xs font-medium text-emerald-400 mb-1">CrudeIntel&apos;s Role</p>
                <p className="text-xs text-zinc-500">We automatically detect these opportunities and calculate potential profits, saving hours of manual analysis.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Who Is This For */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
          <Users className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
          Who Is This For?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {userTypes.map((user, idx) => {
            const Icon = user.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-500/10">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-white">{user.title}</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {user.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
          Platform Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="h-full bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50 hover:border-emerald-600/50 transition-colors">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="inline-flex p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 mb-3 sm:mb-4">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-white mb-1.5 sm:mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mb-3">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-500">
                          <ArrowRight className="h-2.5 w-2.5 text-emerald-500/50" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Data Flow */}
            <div>
              <h3 className="font-semibold text-white mb-3">Data Flow</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
                <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Database className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-blue-400 font-medium">Data Sources</p>
                  <p className="text-[10px] text-zinc-500">EIA, Yahoo, Alpha Vantage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-600 rotate-90 sm:rotate-0" />
                <div className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Server className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs text-emerald-400 font-medium">NestJS Backend</p>
                  <p className="text-[10px] text-zinc-500">Processing & AI Analysis</p>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-600 rotate-90 sm:rotate-0" />
                <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Globe className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <p className="text-xs text-purple-400 font-medium">Next.js Frontend</p>
                  <p className="text-[10px] text-zinc-500">Visualization & Interaction</p>
                </div>
              </div>
            </div>

            {/* Update Cycle */}
            <div>
              <h3 className="font-semibold text-white mb-3">Update Cycle</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {updateCycles.map((cycle, idx) => {
                  const Icon = cycle.icon;
                  return (
                    <div key={idx} className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                      <Icon className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-emerald-400">{cycle.interval}</p>
                      <p className="text-[10px] text-zinc-500 mt-1">{cycle.action}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Processing */}
            <div>
              <h3 className="font-semibold text-white mb-3">AI Processing (Google Gemini)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <p className="text-xs font-semibold text-blue-400 mb-2">Inputs</p>
                  <ul className="space-y-1 text-xs text-zinc-400">
                    <li>• Current prices for all benchmarks</li>
                    <li>• 30-day price history</li>
                    <li>• Recent news headlines with sentiment</li>
                    <li>• Cross-benchmark correlations</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-xs font-semibold text-emerald-400 mb-2">Outputs</p>
                  <ul className="space-y-1 text-xs text-zinc-400">
                    <li>• Price predictions (1d, 7d, 30d)</li>
                    <li>• Confidence scores</li>
                    <li>• Reasoning explanations</li>
                    <li>• Sentiment classification</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-500" />
              Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Frontend
                </h3>
                <div className="space-y-2">
                  {techStack.frontend.map((tech, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/30">
                      <span className="text-sm text-white">{tech.name}</span>
                      <span className="text-xs text-zinc-500">{tech.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <Server className="h-4 w-4" /> Backend
                </h3>
                <div className="space-y-2">
                  {techStack.backend.map((tech, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/30">
                      <span className="text-sm text-white">{tech.name}</span>
                      <span className="text-xs text-zinc-500">{tech.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* About the Developer */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-emerald-950/30 to-zinc-950 border-emerald-800/30">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              About the Developer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <motion.div
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-xl shadow-emerald-500/20 flex-shrink-0"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                K
              </motion.div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Keshav Agarwal</h3>
                <p className="text-sm sm:text-base text-zinc-400 mb-4 max-w-xl">
                  A passionate full-stack developer with expertise in building modern web applications.
                  Specializing in React, Next.js, Node.js, and AI integration. CrudeIntel was built to demonstrate
                  how AI can transform financial data analysis, making sophisticated market insights accessible to everyone.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  <Link
                    href="https://github.com/KeshavDev15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-xs sm:text-sm text-zinc-300"
                  >
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Link>
                  <Link
                    href="https://linkedin.com/in/keshavagarwal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-colors text-xs sm:text-sm text-blue-400"
                  >
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </Link>
                  <Link
                    href="mailto:keshavagarwal.dev@gmail.com"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 transition-colors text-xs sm:text-sm text-emerald-400"
                  >
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Email
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Links */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800/50">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-500" />
              Project Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <Link
                href="https://github.com/KeshavDev15/crudeintel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 transition-colors group"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <div>
                  <p className="font-medium text-sm sm:text-base text-white">Source Code</p>
                  <p className="text-xs sm:text-sm text-zinc-500">View on GitHub</p>
                </div>
              </Link>
              <Link
                href="https://crudeintel-one.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 transition-colors group"
              >
                <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                <div>
                  <p className="font-medium text-sm sm:text-base text-white">Live Demo</p>
                  <p className="text-xs sm:text-sm text-zinc-500">crudeintel-one.vercel.app</p>
                </div>
              </Link>
              <Link
                href="https://crudeintel-jfs9.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 transition-colors group"
              >
                <Server className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                <div>
                  <p className="font-medium text-sm sm:text-base text-white">API Server</p>
                  <p className="text-xs sm:text-sm text-zinc-500">Hosted on Render</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="text-center py-6 sm:py-8 border-t border-zinc-800/50"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
          <span className="font-bold text-sm sm:text-base text-white">CrudeIntel</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500">
          Built with Next.js, NestJS, and Google Gemini AI
        </p>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1">
          &copy; {new Date().getFullYear()} Keshav Agarwal. All rights reserved.
        </p>
      </motion.div>
    </motion.div>
  );
}
