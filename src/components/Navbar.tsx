"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sprout, Heart, LogOut, LayoutDashboard, User } from "lucide-react";
import { useDonations } from "@/context/DonationContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile, signOutUser } = useDonations();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setIsOpen(false);
    router.push("/");
  };

  // Get matching dashboard link
  const getDashboardLink = () => {
    if (!userProfile) return "/login";
    return `/${userProfile.role}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 dark:border-stone-800/50 glass bg-white/80 dark:bg-stone-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <Sprout className="w-5 h-5 absolute -translate-y-0.5 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
              Aahar<span className="text-secondary">Setu</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isActive(link.href)
                    ? "text-primary after:scale-x-100 font-semibold"
                    : "text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA/Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {userProfile ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 text-stone-700 dark:text-stone-200 text-xs font-bold">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span className="max-w-[120px] truncate">{userProfile.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-primary/10 text-primary dark:bg-primary/20 uppercase tracking-wide">
                    {userProfile.role}
                  </span>
                </div>
                
                <Link
                  href={getDashboardLink()}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-200 text-sm font-semibold px-4 py-2 shadow-sm transition-all duration-200"
                >
                  <LayoutDashboard className="w-4 h-4 text-secondary" />
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold px-4 py-2 shadow-md hover:opacity-90 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-stone-700 dark:text-stone-200 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 py-2 px-3"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white text-sm font-semibold px-4 py-2.5 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Heart className="w-4 h-4 fill-white/20" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out border-b border-stone-200/50 dark:border-stone-800/50 ${
          isOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 pb-4 pt-2 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "bg-primary-light dark:bg-primary-dark/30 text-primary font-semibold"
                  : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-stone-200 dark:border-stone-800 my-3 pt-3 flex flex-col gap-2">
            {userProfile ? (
              <>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm font-bold">
                  <span className="truncate">{userProfile.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary dark:bg-primary/20 uppercase">
                    {userProfile.role}
                  </span>
                </div>
                
                <Link
                  href={getDashboardLink()}
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-800 px-3 py-2 text-base font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-850 hover:text-stone-900 transition-colors duration-200"
                >
                  <LayoutDashboard className="w-4 h-4 text-secondary" />
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-3 py-2.5 text-base font-semibold shadow-md hover:opacity-95 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-base font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary text-white px-3 py-2.5 text-base font-semibold shadow-md hover:bg-primary-hover transition-all duration-200"
                >
                  <Heart className="w-4 h-4 fill-white/20" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
