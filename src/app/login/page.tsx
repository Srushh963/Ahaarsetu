"use client";

import { useState } from "react";
import Link from "next/link";
import { Sprout, Heart, Truck, Building, ShieldCheck, LogIn, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState<"donor" | "volunteer" | "ngo" | "admin">("donor");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    if (role === "admin") {
      if (form.email !== "srushtishapure@gmail.com" || form.password !== "1122") {
        setStatus("error");
        setErrorMsg("Invalid Admin Credentials. Access Denied.");
        return;
      }
    }

    setStatus("submitting");

    setTimeout(() => {
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "donor") {
        router.push("/donor");
      } else if (role === "volunteer") {
        router.push("/volunteer");
      } else {
        router.push("/ngo");
      }
    }, 2000);
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-stone-50 dark:bg-stone-900/10 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md space-y-6">

        {/* Logo and Intro */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20">
              <Sprout className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
              Aahar<span className="text-secondary">Setu</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Sign In to your Account
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">
            Access your custom dashboard to track listings, claims, or routes.
          </p>
        </div>

        {/* Role Selector Cards */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block text-center mb-3">
            Select Your Workspace Role
          </label>
          <div className="grid grid-cols-4 gap-2">
            {/* Donor Role button */}
            <button
              type="button"
              onClick={() => setRole("donor")}
              className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border transition-all duration-300 gap-1.5 ${role === "donor"
                ? "bg-primary/10 border-primary text-primary dark:bg-primary/20"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400"
                }`}
            >
              <Heart className="w-4 h-4" />
              <span className="text-[10px] font-bold">Donor</span>
            </button>

            {/* Volunteer Role button */}
            <button
              type="button"
              onClick={() => setRole("volunteer")}
              className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border transition-all duration-300 gap-1.5 ${role === "volunteer"
                ? "bg-secondary/10 border-secondary text-secondary dark:bg-secondary/20"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400"
                }`}
            >
              <Truck className="w-4 h-4" />
              <span className="text-[10px] font-bold">Volunteer</span>
            </button>

            {/* NGO Role button */}
            <button
              type="button"
              onClick={() => setRole("ngo")}
              className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border transition-all duration-300 gap-1.5 ${role === "ngo"
                ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400"
                }`}
            >
              <Building className="w-4 h-4" />
              <span className="text-[10px] font-bold">NGO</span>
            </button>

            {/* Admin Role button */}
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border transition-all duration-300 gap-1.5 ${role === "admin"
                ? "bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 dark:bg-purple-500/20"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400"
                }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold">Admin</span>
            </button>
          </div>
        </div>

        {/* Login Main Form Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 rounded-3xl p-6 sm:p-8 shadow-md">
          {status === "success" || status === "submitting" && !errorMsg ? (
            <div className="text-center py-6 space-y-4">
              <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mx-auto animate-bounce">
                <LogIn className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">Authentication Successful!</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Redirecting you to the secure <span className="font-bold uppercase text-primary">{role}</span> console...
              </p>
              <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-[loading_2s_ease-in-out_infinite]" />
              </div>
              <style jsx>{`
                @keyframes loading {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
              `}</style>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="p-3 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl font-bold text-center">
                  {errorMsg}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={role === "admin" ? "admin@aaharsetu.org" : `your-name@${role === "ngo" ? "ngo-domain" : "email"}.com`}
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-stone-500 hover:text-primary transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-stone-600 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={form.rememberMe}
                  onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-stone-300 text-primary focus:ring-primary focus:ring-offset-0 accent-primary"
                />
                <label htmlFor="rememberMe" className="ml-2 text-xs text-stone-600 dark:text-stone-400 cursor-pointer">
                  Remember this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-stone-900 border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-stone-900 dark:text-white dark:border-stone-700 dark:hover:bg-stone-800 text-sm font-bold py-3.5 px-4 transition-all duration-300"
              >
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In as {role === "donor" ? "Donor" : role === "volunteer" ? "Volunteer" : role === "ngo" ? "NGO" : "Admin"}
                </>
              </button>
            </form>
          )}
        </div>

        {/* Footer link to Register */}
        <div className="text-center">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Don&apos;t have an account in the network?{" "}
            <Link
              href={`/register?role=${role === "admin" ? "donor" : role}`}
              className="font-bold text-primary hover:text-primary-hover hover:underline transition-colors inline-flex items-center gap-0.5"
            >
              Register Now <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
