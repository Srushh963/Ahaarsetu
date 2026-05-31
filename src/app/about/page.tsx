import { Shield, Sparkles, Heart, Users, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: "Sustainability First",
      description: "Reducing food waste is one of the most effective ways to lower greenhouse gas emissions. We prioritize eco-conscious logistics and zero landfill policies."
    },
    {
      icon: <Heart className="w-5 h-5 text-secondary" />,
      title: "Dignity & Compassion",
      description: "Every individual deserves access to fresh, healthy, and hygienic meals. We treat food donation not as charity, but as a basic human right."
    },
    {
      icon: <Shield className="w-5 h-5 text-amber-500" />,
      title: "Radical Transparency",
      description: "From point of listing to delivery, every step is logged and verifiable. Donors can track exactly where their food goes, building high community trust."
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      title: "Collaborative Synergy",
      description: "No single entity can solve hunger. By stitching together businesses, volunteers, and NGOs, we amplify impact and build social safety nets."
    }
  ];

  const safetyGuidelines = [
    "Food must be fresh, clean, and stored within safe temperature zones.",
    "No pre-served or half-eaten plates are accepted. Only secure surplus containers.",
    "Donors must list accurate allergens and packaging timestamps.",
    "All logistics volunteers must complete hygiene and food handling training.",
    "Destination NGOs must inspect and log food status before final distribution."
  ];

  return (
    <div className="w-full bg-white dark:bg-stone-950 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* About Intro Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold uppercase tracking-wider">
            Our Story & Vision
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            About AaharSetu
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            Started in 2026, AaharSetu emerged from a simple observation: massive food waste at marriages and corporate events coexisting with severe hunger blocks in local neighborhoods. We set out to bridge this gap using real-time logistics and smart matching.
          </p>
        </div>

        {/* Narrative Section - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              Bridging the gap with technology & local action
            </h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
              AaharSetu acts as a digital coordinator. Our platform automates the routing process, matching large-scale food listings from hotels, caterers, and supermarkets with local shelter homes and communities that require immediate food resources.
            </p>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
              Through the support of local citizens who register as on-the-go courier volunteers, we guarantee delivery of surplus food within an average of 45 minutes of pickup, preserving food safety and nutrition.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-3xl p-8 border border-stone-200/50 dark:border-stone-800/50 space-y-6">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Safety & Hygiene Protocols
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Food safety is our highest priority. We enforce strict compliance standards across the network:
            </p>
            <ul className="space-y-3">
              {safetyGuidelines.map((guideline, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">Our Core Pillars</h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              The fundamental principles that guide our everyday decisions and long-term milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {coreValues.map((val, idx) => (
              <div key={idx} className="rounded-2xl border border-stone-200/60 dark:border-stone-850 p-6 space-y-4 hover:shadow-md transition-shadow bg-stone-50/50 dark:bg-stone-900/30">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center shadow-sm">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">{val.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-hover p-8 sm:p-12 text-white text-center space-y-6 shadow-xl shadow-primary/20">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Be a Part of the Solution</h2>
          <p className="text-sm text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            No act of kindness is too small.
          </p>
          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-primary font-bold px-6 py-3 shadow-md hover:bg-stone-50 hover:scale-[1.02] transition-all"
            >
              Join Us Today
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-transparent text-white font-semibold px-6 py-3 hover:bg-white/10 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
