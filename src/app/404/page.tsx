'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '../../components/ui/navbar';
import { useRouter } from 'next/navigation';

// Dynamically load Spline only on client side
const Spline = dynamic(() => import('../../components/ui/SplineClient'), {
  ssr: false,
});

export default function ComingSoon() {
  const router = useRouter();

  return (
    <main className="relative w-full h-screen overflow-hidden bg-white text-white font-sans">
      <Navbar />    
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/m1Zv3nBz6hdPWh5E/scene.splinecode" />
      </div>

      {/* Fade watermark with gradient (optional) */}
      <div className="absolute bottom-0 left-0 w-full h-24 z-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-sm" />

      {/* Foreground Content */}
      <section className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-500 via-pink-500 to-rose-400 text-transparent bg-clip-text"
        >
          Coming Soon...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="mt-4 text-lg md:text-2xl text-black/70"
        >
          This page is under construction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6 }}
          className="mt-8 px-6 py-2 border border-black/20 rounded-full text-black/60 backdrop-blur-md bg-white/60"
        >
          HealthJournal AI | Launching Soon
        </motion.div>
        <motion.button
          onClick={() => router.push('/')}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-rose-400 via-pink-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 backdrop-blur-md"
        >
          Home Page
        </motion.button>
      </section>
    </main>
  );
}
