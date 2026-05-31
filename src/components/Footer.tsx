"use client";

import { useState } from "react";
import Link from "next/link";
import { Sprout, Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 dark:bg-stone-950 border-t border-stone-800">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand column */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20">
              <Sprout className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Aahar<span className="text-secondary">Setu</span>
            </span>
          </Link>
          <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
            Bridging the gap between surplus food generators and those in need. Empowering NGOs, volunteers, and donors to build a zero-waste, hunger-free community.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Navigation</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-primary-light hover:underline transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary-light hover:underline transition-colors">
                About Our Mission
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary-light hover:underline transition-colors">
                Contact & Support
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-primary-light hover:underline transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-primary-light hover:underline transition-colors">
                Join the Network
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Contact Info</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>abc street,121.</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+91 33 2456 7890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <a href="mailto:support@aaharsetu.org" className="hover:text-white hover:underline transition-colors">
                support@aaharsetu.org
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter column */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Stay Updated</h3>
          <p className="text-sm text-stone-400">
            Subscribe to our newsletter for impact reports, sustainability tips, and community events.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white rounded-lg transition-all duration-300 flex items-center justify-center"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-primary font-medium flex items-center gap-1 animate-pulse">
                ✓ Thank you for subscribing!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Lower Copyright section */}
      <div className="border-t border-stone-800 bg-stone-950/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} AaharSetu. All rights reserved. Fighting food waste and communities hunger.
          </p>
          <div className="flex gap-6 text-xs text-stone-500">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
