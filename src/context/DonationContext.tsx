"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export type DonationStatus = "Pending Pickup" | "In Transit" | "Delivered";

export type Donation = {
  id: number;
  foodName: string;
  quantity: number;
  expiryDate: string;
  donorName: string;
  pickupAddress: string;
  deliveryNGO: string;
  ngoAddress: string;
  status: DonationStatus;
  volunteerAssigned: string;
  createdAt: string;
  verificationCode: string;
};

export type NGO = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  regId: string;
  capacity: string;
  status: "Pending" | "Approved";
};

type DonationContextType = {
  donations: Donation[];
  ngos: NGO[];
  addDonation: (donation: Omit<Donation, "id" | "status" | "volunteerAssigned" | "createdAt" | "ngoAddress" | "verificationCode">) => void;
  acceptDonation: (id: number, volunteerName: string) => void;
  claimDonation: (id: number) => void;
  registerNgo: (ngo: Omit<NGO, "id" | "status">) => void; // This is now mostly handled by the register page directly, keeping here for compatibility
  approveNgo: (id: string) => void;
  loading: boolean;
};

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Fetch NGOs (profiles with role 'ngo')
      const { data: ngoData, error: ngoError } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "ngo");

      if (ngoError) throw ngoError;

      if (ngoData) {
        const mappedNgos: NGO[] = ngoData.map((n: any) => ({
          id: n.id,
          name: n.name,
          address: n.address,
          email: n.email,
          phone: n.phone,
          regId: n.reg_id || "",
          capacity: n.capacity || "",
          status: n.is_verified ? "Approved" : "Pending",
        }));
        setNgos(mappedNgos);
      }

      // 2. Fetch Donations
      // For simplicity in UI without writing complex JOINs, we store some denormalized names or fetch relationships.
      // Assuming donor_id and ngo_id relationships in DB. We will fetch with basic profiles join.
      const { data: donData, error: donError } = await supabase
        .from("donations")
        .select(`
          id, food_name, quantity, expiry_date, pickup_address, ngo_address, status, verification_code, created_at,
          donor:profiles!donations_donor_id_fkey(id, name),
          ngo:profiles!donations_ngo_id_fkey(id, name),
          volunteer:profiles!donations_volunteer_id_fkey(id, name)
        `)
        .order("created_at", { ascending: false });

      if (donError) throw donError;

      if (donData) {
        const mappedDonations: Donation[] = donData.map((d: any) => ({
          id: d.id,
          foodName: d.food_name,
          quantity: d.quantity,
          expiryDate: d.expiry_date,
          donorName: d.donor?.name || "Unknown Donor",
          pickupAddress: d.pickup_address,
          deliveryNGO: d.ngo?.name || "Unknown NGO",
          ngoAddress: d.ngo_address,
          status: d.status,
          volunteerAssigned: d.volunteer?.name || "Not Assigned",
          verificationCode: d.verification_code,
          createdAt: new Date(d.created_at).toLocaleDateString(),
        }));
        setDonations(mappedDonations);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addDonation = async (data: Omit<Donation, "id" | "status" | "volunteerAssigned" | "createdAt" | "ngoAddress" | "verificationCode">) => {
    const targetNgo = ngos.find(n => n.name === data.deliveryNGO && n.status === "Approved");
    if (!targetNgo) return;

    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Get current user id
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in to donate.");
      return;
    }

    try {
      const { error } = await supabase
        .from("donations")
        .insert({
          food_name: data.foodName,
          quantity: data.quantity,
          expiry_date: data.expiryDate,
          pickup_address: data.pickupAddress,
          donor_id: user.id,
          ngo_id: targetNgo.id,
          ngo_address: targetNgo.address,
          status: "Pending Pickup",
          verification_code: generatedCode
        });

      if (error) throw error;
      fetchData(); // Refresh UI
    } catch (err: any) {
      console.error("Error adding donation:", err.message);
    }
  };

  const acceptDonation = async (id: number, volunteerName: string) => {
    // Optimistic update for demo purposes
    setDonations(prev => prev.map(d => d.id === id ? { ...d, status: "In Transit", volunteerAssigned: volunteerName || "Volunteer" } : d));

    // Get current user id
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { error } = await supabase
        .from("donations")
        .update({
          status: "In Transit",
          volunteer_id: user.id
        })
        .eq("id", id);

      if (error) throw error;
      fetchData(); // Refresh UI
    } catch (err: any) {
      console.error("Error accepting donation:", err.message);
    }
  };

  const claimDonation = async (id: number) => {
    // Optimistic update for demo purposes
    setDonations(prev => prev.map(d => d.id === id ? { ...d, status: "Delivered" } : d));

    try {
      const { error } = await supabase
        .from("donations")
        .update({ status: "Delivered" })
        .eq("id", id);

      if (error) throw error;
      fetchData(); // Refresh UI
    } catch (err: any) {
      console.error("Error claiming donation:", err.message);
    }
  };

  // Deprecated since handled in register/page.tsx
  const registerNgo = (data: Omit<NGO, "id" | "status">) => {};

  const approveNgo = async (id: string) => {
    // Optimistic update for demo purposes
    setNgos(prev => prev.map(n => n.id === id ? { ...n, status: "Approved" } : n));

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_verified: true })
        .eq("id", id);

      if (error) throw error;
      fetchData(); // Refresh UI
    } catch (err: any) {
      console.error("Error approving NGO:", err.message);
    }
  };

  return (
    <DonationContext.Provider value={{ donations, ngos, addDonation, acceptDonation, claimDonation, registerNgo, approveNgo, loading }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error("useDonations must be used within a DonationProvider");
  }
  return context;
}
