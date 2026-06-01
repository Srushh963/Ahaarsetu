"use client";

import { useDonations } from "@/context/DonationContext";
import { Truck, Map as MapIcon, Navigation, CheckCircle2, BellRing } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function VolunteerDashboard() {
  const { donations, acceptDonation, userProfile, userLoading } = useDonations();
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);

  // Auth and Role check
  useEffect(() => {
    if (!userLoading && (!userProfile || userProfile.role !== "volunteer")) {
      router.push("/login");
    }
  }, [userProfile, userLoading, router]);

  // Available tasks are those Pending Pickup
  const availableTasks = donations.filter(d => d.status === "Pending Pickup");

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

  if (userLoading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-stone-500">Loading volunteer profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile || userProfile.role !== "volunteer") {
    return null;
  }

  // Active tasks for this volunteer
  const activeTasks = donations.filter(
    d => d.status === "In Transit" && d.volunteerAssigned === userProfile.name
  );
  
  const tasksCompleted = donations.filter(
    d => d.status === "Delivered" && d.volunteerAssigned === userProfile.name
  ).length;

  const distanceCovered = activeTasks.length * 2.5 + tasksCompleted * 2.5; 
  
  const mealsDelivered = donations.filter(
    d => d.status === "Delivered" && d.volunteerAssigned === userProfile.name
  ).reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAcceptTask = (id: number) => {
    acceptDonation(id);
  };

  // Generate mock map locations for active tasks
  const mapLocations = activeTasks.flatMap((task, i) => {
    // Slight random offset for mock coordinates based on id
    const offset = (task.id % 10) * 0.05;
    return [
      { lat: 22.5726 + offset, lng: 88.3639 - offset, title: `Pickup: ${task.donorName}`, description: task.pickupAddress, type: "pickup" as const },
      { lat: 22.5826 + offset, lng: 88.3739 - offset, title: `Dropoff: ${task.deliveryNGO}`, description: task.ngoAddress, type: "dropoff" as const }
    ];
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">Volunteer Dashboard</h1>
            <p className="text-stone-600 dark:text-stone-400 mt-1">
              Welcome back, <span className="font-bold text-stone-900 dark:text-white">{userProfile.name}</span>. Manage food pickup and delivery operations.
            </p>
          </div>
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
            <div className="w-14 h-14 rounded-2xl bg-blue-105/10 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Deliveries Completed</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{tasksCompleted}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-105/10 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <MapIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Distance (KM)</p>
              <p className="text-3xl font-black text-stone-900 dark:text-white">{distanceCovered.toFixed(1)}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-105/10 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
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
                            <MapIcon className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                            <div>
                              <span className="font-bold text-stone-900 dark:text-white block">Delivery: {task.deliveryNGO}</span>
                              <span>{task.ngoAddress}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start space-y-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
                            {task.status}
                          </span>
                          <span className="font-mono text-xs font-bold bg-stone-100 dark:bg-stone-850 px-2 py-1 rounded tracking-widest text-stone-900 dark:text-white">
                            {task.verificationCode}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleAcceptTask(task.id)}
                          className="inline-flex items-center justify-center rounded-xl bg-white text-stone-900 border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-stone-900 dark:text-white dark:border-stone-700 dark:hover:bg-stone-850 text-xs font-bold px-4 py-2 transition-all duration-300 cursor-pointer"
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
                            <MapIcon className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                            <div>
                              <span className="font-bold text-stone-900 dark:text-white block">Delivery: {task.deliveryNGO}</span>
                              <span>{task.ngoAddress}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start space-y-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
                            In Transit
                          </span>
                          <span className="font-mono text-xs font-bold bg-stone-100 dark:bg-stone-850 px-2 py-1 rounded tracking-widest text-stone-900 dark:text-white">
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
        
        {/* Live Tracking Map Section */}
        {activeTasks.length > 0 && (
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden w-full">
            <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Live Tracking Map</h2>
            </div>
            <div className="p-4">
              <MapComponent locations={mapLocations} />
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}
