"use client";

import { useDonations } from "@/context/DonationContext";
import { ShieldCheck, Building, CheckCircle2, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { ngos, approveNgo } = useDonations();

  const pendingNgos = ngos.filter(n => n.status === "Pending");
  const approvedNgos = ngos.filter(n => n.status === "Approved");

  const handleApprove = (id: number) => {
    approveNgo(id);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">Admin Portal</h1>
            <p className="text-stone-600 dark:text-stone-400 mt-1">Manage network verifications and audits</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Pending NGO Audits</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{pendingNgos.length}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Verified Network Partners</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{approvedNgos.length}</p>
            </div>
          </div>
        </div>

        {/* Pending NGOs Table */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden w-full">
          <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">Action Required: Pending Approvals</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800">
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">NGO Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Govt Reg ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {pendingNgos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                      No pending NGO registrations. The network is fully audited.
                    </td>
                  </tr>
                ) : (
                  pendingNgos.map((ngo) => (
                    <tr key={ngo.id} className="hover:bg-stone-50 dark:hover:bg-stone-950/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-stone-400" />
                          {ngo.name}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{ngo.address}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-bold bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">
                          {ngo.regId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-stone-600 dark:text-stone-300">{ngo.email}</p>
                        <p className="text-xs text-stone-600 dark:text-stone-300">{ngo.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          Pending Audit
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleApprove(ngo.id)}
                          className="inline-flex items-center justify-center rounded-xl bg-white text-stone-900 border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-stone-900 dark:text-white dark:border-stone-700 dark:hover:bg-stone-800 text-xs font-bold px-4 py-2 transition-all duration-300"
                        >
                          Approve & Verify
                        </button>
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
