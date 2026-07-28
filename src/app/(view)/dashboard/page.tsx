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
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 z-40 bg-background">
        <div className="h-16 flex justify-between items-center px-12">
          <h1 className="text-2xl font-display tracking-[0.3rem] text-muted-foreground">
            PATINA
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </Button>
            <Button variant="outline" size="sm">
              <SignOutIcon size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-12">
        {mockStats.map((stat, i) => (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            className="p-6 border border-border bg-card hover:bg-muted/50 transition-colors"
          >
            <p className="text-[10px] uppercase text-muted-foreground tracking-wider">
              {stat.label}
            </p>
            <h3 className="text-3xl font-display my-2">{stat.value}</h3>
            <p className="text-xs text-green-600">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="px-12 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
                Your Collection
              </p>
              <h2 className="text-3xl font-display">My Watches</h2>
            </div>
            <Button asChild>
              <Link href="/dashboard/listings">Manage Listings</Link>
            </Button>
          </div>

          <div className="space-y-3">
            {mockWatches.map((watch) => (
              <Card
                key={watch.id}
                className="p-6 border border-border flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-[10px] uppercase text-primary/50">
                      {watch.brand}
                    </p>
                    <Badge variant="secondary" className="text-[10px]">
                      {watch.year}
                    </Badge>
                    {watch.status === "Listed" && (
                      <Badge className="text-[10px] bg-green-900/20 border-green-800 text-green-800">
                        Listed
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display text-lg">{watch.model}</h3>
                </div>
                <div className="text-right">
                  <h4 className="font-display text-2xl">{watch.price}</h4>
                  <p className="text-sm text-green-600">{watch.trend}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
              Quick Actions
            </p>
            <h3 className="text-2xl font-display mb-4">Get Started</h3>
          </div>

          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/wishlist">
                <HeartIcon size={16} className="mr-2" />
                Wishlist
              </Link>
            </Button>
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
