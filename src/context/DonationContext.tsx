"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  regId: string;
  capacity: string;
  status: "Pending" | "Approved";
};

// Initial default approved NGOs
const INITIAL_NGOS: NGO[] = [
  { id: 1, name: "Hope Foundation", address: "12 Charity Lane, City Center", email: "contact@hope.org", phone: "1234567890", regId: "REG123", capacity: "200", status: "Approved" },
  { id: 2, name: "Food Savers NGO", address: "89 Green Avenue, North District", email: "hello@foodsavers.org", phone: "0987654321", regId: "REG456", capacity: "500", status: "Approved" },
  { id: 3, name: "Care & Share", address: "45 Compassion Street, East Side", email: "info@careshare.org", phone: "1122334455", regId: "REG789", capacity: "150", status: "Approved" },
];

type DonationContextType = {
  donations: Donation[];
  ngos: NGO[];
  addDonation: (donation: Omit<Donation, "id" | "status" | "volunteerAssigned" | "createdAt" | "ngoAddress" | "verificationCode">) => void;
  acceptDonation: (id: number, volunteerName: string) => void;
  claimDonation: (id: number) => void;
  registerNgo: (ngo: Omit<NGO, "id" | "status">) => void;
  approveNgo: (id: number) => void;
};

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [ngos, setNgos] = useState<NGO[]>(INITIAL_NGOS);

  const addDonation = (data: Omit<Donation, "id" | "status" | "volunteerAssigned" | "createdAt" | "ngoAddress" | "verificationCode">) => {
    // Only look up among approved NGOs
    const targetNgo = ngos.find(n => n.name === data.deliveryNGO && n.status === "Approved");
    const ngoAddress = targetNgo ? targetNgo.address : "Unknown Address";
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newDonation: Donation = {
      ...data,
      id: Date.now(),
      status: "Pending Pickup",
      volunteerAssigned: "Not Assigned",
      createdAt: new Date().toLocaleDateString(),
      ngoAddress: ngoAddress,
      verificationCode: generatedCode
    };
    
    setDonations((prev) => [newDonation, ...prev]);
  };

  const acceptDonation = (id: number, volunteerName: string) => {
    setDonations((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "In Transit", volunteerAssigned: volunteerName } : d
      )
    );
  };

  const claimDonation = (id: number) => {
    setDonations((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Delivered" } : d
      )
    );
  };

  const registerNgo = (data: Omit<NGO, "id" | "status">) => {
    const newNgo: NGO = {
      ...data,
      id: Date.now(),
      status: "Pending"
    };
    setNgos((prev) => [...prev, newNgo]);
  };

  const approveNgo = (id: number) => {
    setNgos((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: "Approved" } : n
      )
    );
  };

  return (
    <DonationContext.Provider value={{ donations, ngos, addDonation, acceptDonation, claimDonation, registerNgo, approveNgo }}>
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
