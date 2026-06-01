"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Sprout,
  Trash2,
  Users,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowRight,
  Truck,
  Utensils,
  TrendingUp,
  Building
} from "lucide-react";

export default function Home() {
  // Tabs state for "How It Works"
  const [activeTab, setActiveTab] = useState<"donor" | "volunteer" | "ngo">("donor");
  return (
    <div className="overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative w-full py-20 lg:py-32 bg-white dark:bg-stone-950 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-secondary/10 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-stone-600 dark:text-stone-300 tracking-wider uppercase">Live in your city</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-stone-900 dark:text-white tracking-tight mb-6 leading-tight"
          >
            Bridge the Gap Between <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Surplus & Scarcity
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AaharSetu is an intelligent food rescue platform connecting local donors with verified NGOs through a network of dedicated volunteers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold hover:scale-105 transition-transform duration-300 shadow-xl shadow-stone-900/20 dark:shadow-white/20">
              Join the Network
            </Link>
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-stone-900 text-stone-900 dark:text-white font-bold border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors duration-300">
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="w-full py-20 bg-stone-50 dark:bg-stone-900/30 border-y border-stone-200/50 dark:border-stone-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <p className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
              Connecting the Chain of Care
            </p>
            <p className="text-stone-600 dark:text-stone-400">
              Click a role below to see how our platform makes donating, delivering, and distributing surplus food seamless and easy.
            </p>
          </div>

          {/* Interactive Role Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-2xl bg-stone-200/60 p-1.5 dark:bg-stone-800/60">
              <button
                onClick={() => setActiveTab("donor")}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === "donor"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
                  }`}
              >
                <Sprout className="w-4 h-4" />
                For Donors
              </button>
              <button
                onClick={() => setActiveTab("volunteer")}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === "volunteer"
                  ? "bg-secondary text-white shadow-md shadow-secondary/20"
                  : "text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
                  }`}
              >
                <Truck className="w-4 h-4" />
                For Volunteers
              </button>
              <button
                onClick={() => setActiveTab("ngo")}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === "ngo"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  : "text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
                  }`}
              >
                <Building className="w-4 h-4" />
                For NGOs
              </button>
            </div>
          </div>

          {/* Tab content layouts */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4"
          >
            {activeTab === "donor" && (
              <>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Post Surplus</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Log in and list food item details (cuisine type, quantity, expiration window, packaging type) in under a minute.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">System Matching</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    AaharSetu matches the post with verified local NGOs who need this quantity, and alerts nearby volunteers.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Hand Over & Verify</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    A volunteer picks up the food. Match their unique 6-digit verification code to verify secure handover. Your impact score increases!
                  </p>
                </motion.div>
              </>
            )}

            {activeTab === "volunteer" && (
              <>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Accept Rescue Alerts</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Get push notifications about excess food listings along your routine commute or nearby radius. Accept to claim the task.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Pick Up & Transport</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Arrive at the donor location, inspect food quality standards using the app check-list, and share your verification code to pick up.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">3</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Safe Drop-Off</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Deliver food to the assigned NGO shelter and hand it over to the staff to mark the delivery complete.
                  </p>
                </motion.div>
              </>
            )}

            {activeTab === "ngo" && (
              <>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Register Requirements</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Fill out the NGO profile indicating average meal needs, storage capabilities (refrigerated/dry), and active delivery hours.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Claim matched donations</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    The smart matcher allocates food resources. Claim matches or request specific items if you have sudden requirement spikes.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Verify & Serve</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Receive the volunteer courier, manually approve receipt, log food temperature/condition, and distribute immediately to beneficiaries.
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
