// components/Navbar.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo or Brand */}
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-transparent bg-clip-text">
          HealthJournal AI
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600 transition">Dashboard</a>
          <a href="#" className="hover:text-blue-600 transition">Calendar</a>
          <a href="#" className="hover:text-blue-600 transition">Reports</a>
          <a href="#" className="hover:text-blue-600 transition">Settings</a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="md:hidden bg-white/90 px-6 pb-4"
        >
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">Calendar</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">Reports</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">Settings</a>
        </motion.div>
      )}
    </motion.nav>
  );
}
