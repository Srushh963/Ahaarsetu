"use client";

import { useDonations } from "@/context/DonationContext";
import { Truck, Map, Navigation, CheckCircle2, BellRing } from "lucide-react";
import { useState, useEffect } from "react";

export default function VolunteerDashboard() {
  const { donations, acceptDonation } = useDonations();
  const [showNotification, setShowNotification] = useState(false);

  // Available tasks are those Pending Pickup
  const availableTasks = donations.filter(d => d.status === "Pending Pickup");
  // Active tasks are those In Transit
  const activeTasks = donations.filter(d => d.status === "In Transit");
  
  const tasksCompleted = donations.filter(d => d.status === "Delivered").length;
  // Let's assume each active task covers some mock distance
  const distanceCovered = activeTasks.length * 2.5 + tasksCompleted * 2.5; 
  const mealsDelivered = donations.filter(d => d.status === "Delivered").reduce((acc, curr) => acc + curr.quantity, 0);

  // Trigger notification when availableTasks length increases
  const [prevAvailableCount, setPrevAvailableCount] = useState(availableTasks.length);
  useEffect(() => {
    if (availableTasks.length > prevAvailableCount) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
    setPrevAvailableCount(availableTasks.length);
  }, [availableTasks.length, prevAvailableCount]);

  const handleAcceptTask = (id: number) => {
    acceptDonation(id, "Alex (Volunteer)");
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">Volunteer Dashboard</h1>
          <p className="text-stone-600 dark:text-stone-400 mt-1">Manage food pickup and delivery operations</p>
        </div>

        {/* Notification Alert */}
        {showNotification && (
          <div className="bg-blue-600 text-white rounded-2xl p-4 flex items-center shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
            <BellRing className="w-6 h-6 mr-3 animate-bounce" />
            <div>
              <p className="font-bold">New Task Available!</p>
              <p className="text-sm text-blue-100">A new food donation has been added and is waiting for pickup.</p>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Deliveries Completed</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{tasksCompleted}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Map className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Distance (KM)</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{distanceCovered.toFixed(1)}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Meals Delivered</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{mealsDelivered}</p>
            </div>
          </div>
        </div>

        {/* Table Section: Available Tasks */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden w-full">
          <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">Available Tasks</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800">
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Route Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Status & Verification</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {availableTasks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                      No tasks available right now. Waiting for donors...
                    </td>
                  </tr>
                ) : (
                  availableTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-stone-50 dark:hover:bg-stone-950/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-stone-900 dark:text-white">{task.foodName}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Qty: {task.quantity} units</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-3">
                          <div className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                            <Navigation className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                            <div>
                              <span className="font-bold text-stone-900 dark:text-white block">Pickup: {task.donorName}</span>
                              <span>{task.pickupAddress}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                            <Map className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                            <div>
                              <span className="font-bold text-stone-900 dark:text-white block">Delivery: {task.deliveryNGO}</span>
                              <span>{task.ngoAddress}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start space-y-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                            {task.status}
                          </span>
                          <span className="font-mono text-xs font-bold bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded tracking-widest text-stone-900 dark:text-white">
                            {task.verificationCode}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleAcceptTask(task.id)}
                          className="inline-flex items-center justify-center rounded-xl bg-white text-stone-900 border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-stone-900 dark:text-white dark:border-stone-700 dark:hover:bg-stone-800 text-xs font-bold px-4 py-2 transition-all duration-300"
                        >
                          Accept Pickup
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Section: Active Tasks */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden w-full">
          <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">My Active Deliveries</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800">
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Route Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Status & Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {activeTasks.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                      No active deliveries. Accept a task above to start.
                    </td>
                  </tr>
                ) : (
                  activeTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-stone-50 dark:hover:bg-stone-950/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-stone-900 dark:text-white">{task.foodName}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Qty: {task.quantity} units</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-3">
                          <div className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                            <Navigation className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                            <div>
                              <span className="font-bold text-stone-900 dark:text-white block">Pickup: {task.donorName}</span>
                              <span>{task.pickupAddress}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                            <Map className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                            <div>
                              <span className="font-bold text-stone-900 dark:text-white block">Delivery: {task.deliveryNGO}</span>
                              <span>{task.ngoAddress}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start space-y-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            In Transit
                          </span>
                          <span className="font-mono text-xs font-bold bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded tracking-widest text-stone-900 dark:text-white">
                            {task.verificationCode}
                          </span>
                        </div>
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
