"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, DownloadIcon } from "@phosphor-icons/react/dist/ssr";

const mockPurchases = [
  {
    id: 1,
    brand: "Rolex",
    model: "Submariner Date 126610LN",
    purchaseDate: "15 Jun 2024",
    price: "₹9,50,000",
    seller: "Mumbai Vintage Watches",
    status: "Delivered",
  },
  {
    id: 2,
    brand: "Omega",
    model: "Speedmaster Professional",
    purchaseDate: "22 May 2024",
    price: "₹6,75,000",
    seller: "Delhi Chronographs",
    status: "Delivered",
  },
  {
    id: 3,
    brand: "Tudor",
    model: "Black Bay 58",
    purchaseDate: "10 Apr 2024",
    price: "₹4,25,000",
    seller: "Bangalore Time Pieces",
    status: "Delivered",
  },
  {
    id: 4,
    brand: "Seiko",
    model: "Prospex Diver",
    purchaseDate: "28 Mar 2024",
    price: "₹1,85,000",
    seller: "Chennai Watch Co.",
    status: "Delivered",
  },
];

export default function PurchaseHistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 z-40 bg-background">
        <div className="h-16 flex items-center px-12">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeftIcon size={16} className="mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-12 space-y-8">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Your Orders
          </p>
          <h1 className="text-4xl font-display">Purchase History</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {mockPurchases.length} purchases
          </p>
        </div>

        <div className="space-y-4">
          {mockPurchases.map((purchase) => (
            <Card
              key={purchase.id}
              className="p-6 border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                <div>
                  <p className="text-[10px] uppercase text-primary/50 mb-1">
                    {purchase.brand}
                  </p>
                  <h3 className="font-display">{purchase.model}</h3>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-muted-foreground mb-1">
                    Purchase Date
                  </p>
                  <p className="text-sm">{purchase.purchaseDate}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-muted-foreground mb-1">
                    Amount
                  </p>
                  <h4 className="font-display text-lg">{purchase.price}</h4>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-muted-foreground mb-1">
                    Seller
                  </p>
                  <p className="text-sm">{purchase.seller}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Badge className="bg-green-900/20 border-green-800 text-green-800 justify-center text-[10px]">
                    {purchase.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="w-full">
                    <DownloadIcon size={14} className="mr-2" />
                    Invoice
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="border-t pt-8">
          <h3 className="font-display text-xl mb-4">Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-6 border border-border">
              <p className="text-[10px] uppercase text-muted-foreground mb-2">
                Total Purchases
              </p>
              <h4 className="font-display text-3xl">4</h4>
            </Card>
            <Card className="p-6 border border-border">
              <p className="text-[10px] uppercase text-muted-foreground mb-2">
                Total Spent
              </p>
              <h4 className="font-display text-3xl">₹22,35,000</h4>
            </Card>
            <Card className="p-6 border border-border">
              <p className="text-[10px] uppercase text-muted-foreground mb-2">
                Average Price
              </p>
              <h4 className="font-display text-3xl">₹5,58,750</h4>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
