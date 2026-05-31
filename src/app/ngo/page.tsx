"use client";

import { useDonations } from "@/context/DonationContext";
import { Clock, Users, Utensils, CheckCircle2, ArchiveRestore } from "lucide-react";

export default function NGODashboard() {
  const { donations, claimDonation } = useDonations();

  // Incoming deliveries are those In Transit (picked up by volunteer, on the way)
  const incomingDeliveries = donations.filter(d => d.status === "In Transit");
  
  // Inventory items are those Delivered
  const inventory = donations.filter(d => d.status === "Delivered");

  const pendingDonationsCount = incomingDeliveries.length;
  const mealsDistributed = inventory.reduce((acc, curr) => acc + curr.quantity, 0);
  // Assuming 1 meal = 1 beneficiary for demonstration purposes
  const beneficiariesServed = mealsDistributed;

  const handleClaimDonation = (id: number) => {
    claimDonation(id);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">NGO Dashboard</h1>
          <p className="text-stone-600 dark:text-stone-400 mt-1">Manage incoming donations and inventory</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Incoming Deliveries</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{pendingDonationsCount}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Utensils className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Meals Distributed</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{mealsDistributed}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Beneficiaries Served</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{beneficiariesServed}</p>
            </div>
          </div>
        </div>

        {/* Incoming Deliveries Table */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden w-full">
          <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">Incoming Deliveries (In Transit)</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800">
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Food Item</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Donor Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {incomingDeliveries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                      No incoming deliveries at the moment.
                    </td>
                  </tr>
                ) : (
                  incomingDeliveries.map((donation) => (
                    <tr key={donation.id} className="hover:bg-stone-50 dark:hover:bg-stone-950/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-stone-900 dark:text-white">{donation.foodName}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Qty: {donation.quantity}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-stone-900 dark:text-white">{donation.donorName}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Exp: {donation.expiryDate}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleClaimDonation(donation.id)}
                          className="inline-flex items-center justify-center rounded-xl bg-white text-stone-900 border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-stone-900 dark:text-white dark:border-stone-700 dark:hover:bg-stone-800 text-xs font-bold px-4 py-2 transition-all duration-300"
                        >
                          Confirm Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Status Table */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden w-full">
          <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
            <ArchiveRestore className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">Inventory Status (Received)</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800">
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Food Item</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {inventory.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                      Inventory is empty. Confirm incoming deliveries to add them here.
                    </td>
                  </tr>
                ) : (
                  inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-stone-950/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-stone-900 dark:text-white">{item.foodName}</td>
                      <td className="px-6 py-4 text-sm text-stone-600 dark:text-stone-300">{item.quantity}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          In Stock (Delivered)
                        </span>
                      </td>
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
