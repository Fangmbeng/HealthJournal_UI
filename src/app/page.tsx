'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../components/ui/navbar';
import { motion } from "framer-motion";
import Footer from '../components/ui/footer';



export default function LandingPage() {
  const router = useRouter();
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Navbar/>
      {/* Render the Spline 3D scene full-screen */}
      {/* <Spline scene="https://prod.spline.design/voRS5NYrOlzRRdQ3/scene.splinecode" /> */}

      {/* Overlay a welcome message and button */}
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-transparent bg-clip-text"
        >
          Welcome HealthJournal AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-600 text-lg mt-4"
        >
          Your personal AI-powered health monitoring assistant.
        </motion.p>
        <motion.button
          onClick={() => router.push('/dashboard')}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 backdrop-blur-md"
        >
          Get Started
        </motion.button>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[  
            {
              title: "Monitor Health Metrics",
              description:
                "Track vitals like heart rate, blood pressure, medication adherence, and overall wellness using real-time AI insights.",
              gradient: "from-blue-500 to-green-400",
            },
            {
              title: "Personalized Insights",
              description:
                "Get tailored health recommendations based on your unique profile, habits, and medical history—including DNA methylation data.",
              gradient: "from-teal-500 to-blue-400",
            },
            {
              title: "Smart Scheduling & Alerts",
              description:
                "Automatically plan checkups, medications, and health check reminders. Stay one step ahead with proactive alerts.",
              gradient: "from-green-500 to-teal-400",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="bg-white/90 border border-white/30 backdrop-blur-md rounded-2xl p-6 text-left text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3
                className={`text-2xl font-semibold mb-2 bg-gradient-to-r ${card.gradient} text-transparent bg-clip-text`}
              >
                {card.title}
              </h3>
              <p className="text-gray-700 text-sm">{card.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <Footer />
        </div>
      </div>
    </main>
  );
}
