'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  LineChart,
  ArrowLeftRight,
  Brain,
  Newspaper,
  MessageSquare,
  Droplets,
  Menu,
  X,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chat', label: 'AI Chat', icon: MessageSquare },
  { href: '/markets', label: 'Markets', icon: LineChart },
  { href: '/arbitrage', label: 'Arbitrage', icon: ArrowLeftRight },
  { href: '/predictions', label: 'Predictions', icon: Brain },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/about', label: 'About', icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <motion.div
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg text-white group-hover:text-emerald-400 transition-colors">
                CrudeIntel
              </span>
              <span className="text-[9px] sm:text-[10px] text-zinc-500 -mt-1 hidden sm:block">AI Oil Analytics</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 bg-zinc-900/50 rounded-2xl p-1.5 border border-zinc-800/50">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg shadow-emerald-500/25"
                        layoutId="navbar-active"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.label}</span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side: Status + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status - Hidden on very small screens */}
            <motion.div
              className="hidden sm:flex items-center space-x-2 sm:space-x-3 bg-zinc-900/50 rounded-full px-3 sm:px-4 py-2 border border-zinc-800/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-0 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 animate-ping opacity-50" />
              </div>
              <span className="text-xs text-zinc-400 font-medium">Live</span>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'text-white bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-500/25'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Live Status */}
                <div className="sm:hidden flex items-center space-x-3 px-4 py-3 mt-2 border-t border-zinc-800/50">
                  <div className="relative">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping opacity-50" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">Live Market Data</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
