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

export type UserProfile = {
  id: string;
  role: "donor" | "volunteer" | "ngo" | "admin";
  name: string;
  email: string;
  phone: string;
  address: string;
  donor_type?: string;
  vehicle_type?: string;
  availability?: string;
  reg_id?: string;
  capacity?: string;
  is_verified?: boolean;
};

type DonationContextType = {
  donations: Donation[];
  ngos: NGO[];
  addDonation: (donation: Omit<Donation, "id" | "status" | "volunteerAssigned" | "createdAt" | "ngoAddress" | "verificationCode">) => void;
  acceptDonation: (id: number) => void;
  claimDonation: (id: number) => void;
  registerNgo: (ngo: Omit<NGO, "id" | "status">) => void; // Keeping for compatibility
  approveNgo: (id: string) => void;
  loading: boolean;
  userProfile: UserProfile | null;
  userLoading: boolean;
  signOutUser: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const supabase = createClient();

  // Fetch user profile details
  const fetchUserProfile = async () => {
    try {
      setUserLoading(true);
      
      // Check if there is an active hardcoded admin session cookie
      const isAdminAuth = typeof window !== 'undefined' && document.cookie.includes('admin_auth=true');
      if (isAdminAuth) {
        setUserProfile({
          id: 'admin-id',
          name: 'System Admin',
          email: 'srushtishapure@gmail.com',
          role: 'admin',
          phone: '',
          address: ''
        });
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setUserProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
        // Fallback profile if row is not in db yet
        setUserProfile({
          id: user.id,
          name: user.email?.split("@")[0] || "User",
          email: user.email || "",
          role: "donor",
          phone: "",
          address: ""
        });
      } else {
        setUserProfile(data);
      }
    } catch (err) {
      console.error("fetchUserProfile exception:", err);
      setUserProfile(null);
    } finally {
      setUserLoading(false);
    }
  };

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Fetch NGOs (profiles with role 'ngo')
      const { data: ngoData, error: ngoError } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "ngo");

      if (ngoError) {
        console.error("NGO Fetch Error (Possible RLS):", ngoError);
      }

      if (ngoData && ngoData.length > 0) {
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
      } else {
        // Fallback for Admin demonstration if RLS blocks unauthenticated fetch or no NGOs exist
        const isAdminAuth = typeof window !== 'undefined' && document.cookie.includes('admin_auth=true');
        if (isAdminAuth) {
          setNgos([
            { id: "mock-1", name: "Care & Share Foundation", address: "123 Hope Lane, City Center", email: "contact@careshare.org", phone: "9876543210", regId: "NGO-DL-2023-01", capacity: "200", status: "Pending" },
            { id: "mock-2", name: "Helping Hands Org", address: "45 Compassion Street, North Zone", email: "hello@helpinghands.in", phone: "8765432109", regId: "NGO-MH-2022-09", capacity: "150", status: "Approved" },
            { id: "mock-3", name: "Food For All Trust", address: "89 Harmony Road, East District", email: "info@foodforall.org", phone: "7654321098", regId: "NGO-UP-2024-05", capacity: "500", status: "Pending" }
          ]);
        } else {
          setNgos([]);
        }
      }

      // 2. Fetch Donations
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
    fetchUserProfile();

    // Listen to Auth Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        await fetchUserProfile();
        fetchData();
      } else if (event === "SIGNED_OUT") {
        setUserProfile(null);
        // Clear admin cookie
        if (typeof window !== "undefined") {
          document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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

  const acceptDonation = async (id: number) => {
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

  // Deprecated NGO Registration
  const registerNgo = (data: Omit<NGO, "id" | "status">) => {};

  const approveNgo = async (id: string) => {
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

  const signOutUser = async () => {
    await supabase.auth.signOut();
    // Clear admin cookie
    if (typeof window !== "undefined") {
      document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    setUserProfile(null);
  };

  return (
    <DonationContext.Provider value={{
      donations,
      ngos,
      addDonation,
      acceptDonation,
      claimDonation,
      registerNgo,
      approveNgo,
      loading,
      userProfile,
      userLoading,
      signOutUser,
      refetchUser: fetchUserProfile
    }}>
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
