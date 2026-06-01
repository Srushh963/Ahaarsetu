"use client";

import { useState, useEffect } from "react";
import { useDonations } from "@/context/DonationContext";
import { useRouter } from "next/navigation";
import { Package, MapPin, Calendar, CheckCircle2, Building, Heart, ArrowRight } from "lucide-react";

export default function DonorDashboard() {
  const { donations, ngos, addDonation, userProfile, userLoading } = useDonations();
  const router = useRouter();
  const approvedNgos = ngos.filter(n => n.status === "Approved");
  
  const [form, setForm] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    pickupAddress: "",
    deliveryNGO: ""
  });

  // Prefill pickup address once donor profile is loaded
  useEffect(() => {
    if (userProfile && userProfile.address) {
      setForm(prev => ({
        ...prev,
        pickupAddress: userProfile.address
      }));
    }
  }, [userProfile]);

  // Auth and Role check
  useEffect(() => {
    if (!userLoading && (!userProfile || userProfile.role !== "donor")) {
      router.push("/login");
    }
  }, [userProfile, userLoading, router]);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-stone-500">Loading donor profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile || userProfile.role !== "donor") {
    return null;
  }

  // Filter donations created by this specific donor
  const myDonations = donations.filter(d => d.donorName === userProfile.name);
  const totalDonations = myDonations.length;
  const mealsSaved = myDonations.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.foodName || !form.quantity || !form.expiryDate || !form.pickupAddress || !form.deliveryNGO) return;

    addDonation({
      foodName: form.foodName,
      quantity: parseInt(form.quantity, 10),
      expiryDate: form.expiryDate,
      pickupAddress: form.pickupAddress,
      donorName: userProfile.name,
      deliveryNGO: form.deliveryNGO,
    });

    setForm({
      foodName: "",
      quantity: "",
      expiryDate: "",
      pickupAddress: userProfile.address || "",
      deliveryNGO: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-955 py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
            <Heart className="w-6 h-6 fill-primary/10" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">Donor Dashboard</h1>
            <p className="text-stone-600 dark:text-stone-400 mt-1">
              Welcome back, <span className="font-bold text-stone-900 dark:text-white">{userProfile.name}</span>. Manage food donations and track impact.
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-850 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Total Donations</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{totalDonations}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-850 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Meals Saved</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{mealsSaved}</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-850 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-6">New Food Donation</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Food Name</label>
              <input
                type="text"
                name="foodName"
                value={form.foodName}
                onChange={handleChange}
                required
                placeholder="e.g. 5 Boxes of Bread"
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-2.5 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Quantity (Meals/Units)</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                required
                placeholder="e.g. 50"
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-2.5 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-2.5 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Pickup Address</label>
              <input
                type="text"
                name="pickupAddress"
                value={form.pickupAddress}
                onChange={handleChange}
                required
                placeholder="123 Bakery St"
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-2.5 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Select Delivery NGO</label>
              <select
                name="deliveryNGO"
                value={form.deliveryNGO}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-2.5 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              >
                <option value="" disabled>Select an NGO...</option>
                {approvedNgos.map((ngo) => (
                  <option key={ngo.id} value={ngo.name}>{ngo.name} - {ngo.address}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-stone-900 border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-stone-900 dark:text-white dark:border-stone-700 dark:hover:bg-stone-800 text-sm font-bold py-3.5 px-4 transition-all duration-300 cursor-pointer"
              >
                Submit Donation
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-850 shadow-sm overflow-hidden w-full">
          <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">Active Donations Tracker</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800">
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Food Item</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Target NGO</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {myDonations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                      No active donations yet. Create one to get started!
                    </td>
                  </tr>
                ) : (
                  myDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-stone-50 dark:hover:bg-stone-950/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-stone-900 dark:text-white">{donation.foodName}</td>
                      <td className="px-6 py-4 text-sm text-stone-600 dark:text-stone-300">{donation.quantity}</td>
                      <td className="px-6 py-4 text-sm text-stone-600 dark:text-stone-300">
                        {donation.deliveryNGO}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          donation.status === "Delivered" 
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : donation.status === "In Transit"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400"
                        }`}>
                          {donation.status}
                        </span>
                        {donation.volunteerAssigned !== "Not Assigned" && (
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">Volunteer: {donation.volunteerAssigned}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-bold bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded tracking-widest text-stone-900 dark:text-white">
                          {donation.verificationCode}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registered NGOs List Section */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-850 shadow-sm overflow-hidden w-full">
          <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
            <Building className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">Registered NGOs Directory</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800">
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">NGO Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {approvedNgos.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                      No approved NGOs available right now.
                    </td>
                  </tr>
                ) : (
                  approvedNgos.map((ngo) => (
                    <tr key={ngo.id} className="hover:bg-stone-50 dark:hover:bg-stone-950/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-stone-900 dark:text-white">{ngo.name}</td>
                      <td className="px-6 py-4 text-sm text-stone-600 dark:text-stone-300">{ngo.address}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}