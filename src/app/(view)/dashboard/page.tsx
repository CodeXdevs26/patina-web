"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HeartIcon,
  ShoppingBagIcon,
  TrendUpIcon,
  GearIcon as CogIcon,
  SignOutIcon,
} from "@phosphor-icons/react/dist/ssr";

const mockStats = [
  { label: "Portfolio Value", value: "₹45,50,000", change: "+8.2%" },
  { label: "Monthly Gains", value: "₹1,20,000", change: "+12.5%" },
  { label: "Watchlist Items", value: "24", change: "3 new" },
  { label: "Active Listings", value: "3", change: "1 pending" },
];

const mockWatches = [
  {
    id: 1,
    brand: "Rolex",
    model: "Submariner Date 126610LN",
    year: "2020",
    price: "₹9,50,000",
    trend: "+4%",
    status: "Owned",
  },
  {
    id: 2,
    brand: "Omega",
    model: "Speedmaster Professional",
    year: "2018",
    price: "₹6,75,000",
    trend: "+2%",
    status: "Owned",
  },
  {
    id: 3,
    brand: "Tudor",
    model: "Black Bay 58",
    year: "2021",
    price: "₹4,25,000",
    trend: "+6%",
    status: "Listed",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pt-12">
      <div className="px-12 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6"></div>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
              Quick Actions
            </p>
            <h3 className="text-2xl font-display mb-4">Get Started</h3>
          </div>

          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/browse">
                <ShoppingBagIcon size={16} className="mr-2" />
                Browse Watches
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/history">
                <TrendUpIcon size={16} className="mr-2" />
                Purchase History
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/profile">
                <CogIcon size={16} className="mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
