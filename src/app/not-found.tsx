"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Car, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center relative">
        {/* Animated car */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-red-500"
        >
          <Car className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 relative z-10"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-white">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Looks like we&rsquo;ve hit a roadblock!
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              The page you&rsquo;re looking for seems to have taken a wrong
              turn. Let&rsquo;s get you back on track.
            </p>
          </div>

          {/* Location indicator */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-red-500"
          >
            <MapPin className="animate-bounce" />
            <span className="text-gray-400">Page not found</span>
          </motion.div>

          {/* Back to home button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
