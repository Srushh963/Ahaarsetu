"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sprout, Heart, Truck, Building, UserPlus, CheckCircle2, Mail, Phone, Lock, Eye, EyeOff, MapPin } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

function RegisterFormContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") as "donor" | "volunteer" | "ngo" | null;
  
  const supabase = createClient();

  const [role, setRole] = useState<"donor" | "volunteer" | "ngo">(() => {
    if (initialRole && ["donor", "volunteer", "ngo"].includes(initialRole)) {
      return initialRole;
    }
    return "donor";
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Form States
  const [commonFields, setCommonFields] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // Role-Specific States
  const [donorType, setDonorType] = useState("Restaurant");
  const [vehicleType, setVehicleType] = useState("Bicycle");
  const [availability, setAvailability] = useState("Weekends");
  const [ngoRegId, setNgoRegId] = useState("");
  const [ngoCapacity, setNgoCapacity] = useState("50");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      // 1. Sign up the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: commonFields.email,
        password: commonFields.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Could not create user account. Please try again.");

      // 2. Call the secure RPC function to insert the profile
      // This works even before email is confirmed because the function uses SECURITY DEFINER
      const { error: profileError } = await supabase.rpc("create_user_profile", {
        user_id: authData.user.id,
        user_role: role,
        user_name: commonFields.name,
        user_email: commonFields.email,
        user_phone: commonFields.phone,
        user_address: commonFields.address,
        p_donor_type: role === "donor" ? donorType : null,
        p_vehicle_type: role === "volunteer" ? vehicleType : null,
        p_availability: role === "volunteer" ? availability : null,
        p_reg_id: role === "ngo" ? ngoRegId : null,
        p_capacity: role === "ngo" ? ngoCapacity : null,
      });

      if (profileError) throw profileError;

      setStatus("success");
    } catch (err: any) {
      console.error("Registration Error:", err.message);
      setErrorMsg(err.message || "An error occurred during registration.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      {/* Header */}
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
          Join AaharSetu Network
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">
          Register to reduce food waste and nourish your community.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block text-center mb-3">
          Choose Registration Workspace
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* Donor Tab */}
          <button
            type="button"
            onClick={() => setRole("donor")}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 gap-1.5 ${
              role === "donor"
                ? "bg-primary/10 border-primary text-primary dark:bg-primary/20"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="text-[11px] font-bold">Food Donor</span>
          </button>

          {/* Volunteer Tab */}
          <button
            type="button"
            onClick={() => setRole("volunteer")}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 gap-1.5 ${
              role === "volunteer"
                ? "bg-secondary/10 border-secondary text-secondary dark:bg-secondary/20"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span className="text-[11px] font-bold">Volunteer</span>
          </button>

          {/* NGO Tab */}
          <button
            type="button"
            onClick={() => setRole("ngo")}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 gap-1.5 ${
              role === "ngo"
                ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400"
            }`}
          >
            <Building className="w-4 h-4" />
            <span className="text-[11px] font-bold">NGO Partner</span>
          </button>
        </div>
      </div>

      {/* Registration Form Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 rounded-3xl p-6 sm:p-8 shadow-md">
        {status === "success" ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Check Your Email!</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
              We have sent a verification link to your email address. Please click it to verify your account and complete registration.
            </p>
            {role === "ngo" && (
              <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 p-3 rounded-xl mt-4">
                Note: NGO partners require admin verification. Please wait until your account is approved before making requests.
              </p>
            )}
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white text-stone-900 border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-stone-900 dark:text-white dark:border-stone-700 dark:hover:bg-stone-800 text-xs sm:text-sm font-bold px-6 py-3 transition-colors"
              >
                Go to Sign In Page
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === "error" && (
              <div className="p-3 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl font-bold text-center">
                {errorMsg}
              </div>
            )}

            {/* Common Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                {role === "ngo" ? "NGO / Organization Name" : "Full Name"}
              </label>
              <input
                type="text"
                id="name"
                required
                value={commonFields.name}
                onChange={(e) => setCommonFields({ ...commonFields, name: e.target.value })}
                placeholder={role === "ngo" ? "E.g., Care & Share Foundation" : "E.g., Rajesh Sharma"}
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-2.5 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    required
                    value={commonFields.email}
                    onChange={(e) => setCommonFields({ ...commonFields, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={commonFields.phone}
                    onChange={(e) => setCommonFields({ ...commonFields, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Role-Specific Fields */}
            {role === "donor" && (
              <div className="space-y-1.5">
                <label htmlFor="donorType" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Donor Organization Type
                </label>
                <select
                  id="donorType"
                  value={donorType}
                  onChange={(e) => setDonorType(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-2.5 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                >
                  <option value="Restaurant">Restaurant / Cafe</option>
                  <option value="Hotel">Hotel / Banquet Hall</option>
                  <option value="Caterer">Event Caterer</option>
                  <option value="Supermarket">Supermarket / Retailer</option>
                  <option value="Individual">Individual Donor / Household</option>
                </select>
              </div>
            )}

            {role === "volunteer" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="vehicleType" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-2.5 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  >
                    <option value="Bicycle">Bicycle / Cycle</option>
                    <option value="Two Wheeler">Two-Wheeler (Motorcycle/Scooty)</option>
                    <option value="Four Wheeler">Four-Wheeler (Car/Van)</option>
                    <option value="Walking">None (Walking/Public Transport)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="availability" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    General Availability
                  </label>
                  <select
                    id="availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-2.5 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  >
                    <option value="Weekends">Weekends only</option>
                    <option value="Weekdays">Weekdays only</option>
                    <option value="Evenings">Evenings (Post 6 PM)</option>
                    <option value="Flexible">Anytime / Flexible</option>
                  </select>
                </div>
              </div>
            )}

            {role === "ngo" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="ngoRegId" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Govt Registration ID
                  </label>
                  <input
                    type="text"
                    id="ngoRegId"
                    required
                    value={ngoRegId}
                    onChange={(e) => setNgoRegId(e.target.value)}
                    placeholder="E.g., Darpan ID / URN"
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-2.5 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ngoCapacity" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Meal Capacity / Day
                  </label>
                  <input
                    type="number"
                    id="ngoCapacity"
                    required
                    value={ngoCapacity}
                    onChange={(e) => setNgoCapacity(e.target.value)}
                    placeholder="E.g., 100"
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-2.5 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Address */}
            <div className="space-y-1.5">
              <label htmlFor="address" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                {role === "volunteer" ? "Service Operations City / Area" : "Operational Address"}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="address"
                  required
                  value={commonFields.address}
                  onChange={(e) => setCommonFields({ ...commonFields, address: e.target.value })}
                  placeholder={role === "volunteer" ? "E.g., Salt Lake, Kolkata" : "Full pickup/drop address"}
                  className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={commonFields.password}
                  onChange={(e) => setCommonFields({ ...commonFields, password: e.target.value })}
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-stone-900 border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-stone-900 dark:text-white dark:border-stone-700 dark:hover:bg-stone-800 text-sm font-bold py-3.5 px-4 transition-all duration-300"
            >
              {status === "submitting" ? (
                <>
                  <div className="w-5 h-5 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Sign Up as {role === "donor" ? "Donor" : role === "volunteer" ? "Volunteer" : "NGO"}
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Footer Link to Login */}
      <div className="text-center">
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Already registered in the network?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:text-primary-hover hover:underline transition-colors"
          >
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center bg-stone-50 dark:bg-stone-900/10 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <Suspense fallback={
        <div className="w-full max-w-md bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-250/20 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-stone-500">Loading registration forms...</p>
        </div>
      }>
        <RegisterFormContent />
      </Suspense>
    </div>
  );
}
