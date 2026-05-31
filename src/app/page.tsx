"use client";

import { useState, useEffect } from "react";
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
    <div>

      {/* 3. HOW IT WORKS SECTION */}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            {activeTab === "donor" && (
              <>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Post Surplus</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Log in and list food item details (cuisine type, quantity, expiration window, packaging type) in under a minute.
                  </p>
                </div>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">System Matching</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    AaharSetu matches the post with verified local NGOs who need this quantity, and alerts nearby volunteers.
                  </p>
                </div>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Hand Over & Verify</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    A volunteer picks up the food. Match their unique 6-digit verification code to verify secure handover. Your impact score increases!
                  </p>
                </div>
              </>
            )}

            {activeTab === "volunteer" && (
              <>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Accept Rescue Alerts</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Get push notifications about excess food listings along your routine commute or nearby radius. Accept to claim the task.
                  </p>
                </div>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Pick Up & Transport</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Arrive at the donor location, inspect food quality standards using the app check-list, and share your verification code to pick up.
                  </p>
                </div>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">3</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Safe Drop-Off</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Deliver food to the assigned NGO shelter and hand it over to the staff to mark the delivery complete.
                  </p>
                </div>
              </>
            )}

            {activeTab === "ngo" && (
              <>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Register Requirements</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Fill out the NGO profile indicating average meal needs, storage capabilities (refrigerated/dry), and active delivery hours.
                  </p>
                </div>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Claim matched donations</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    The smart matcher allocates food resources. Claim matches or request specific items if you have sudden requirement spikes.
                  </p>
                </div>
                <div className="relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-2 pt-2">Verify & Serve</h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    Receive the volunteer courier, manually approve receipt, log food temperature/condition, and distribute immediately to beneficiaries.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
