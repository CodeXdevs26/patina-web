"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

const initialWishlist = [
  {
    id: 1,
    brand: "Rolex",
    model: "Submariner Date 126610LN",
    year: "2020",
    price: "₹9,50,000",
    trend: "+4%",
    condition: "Mint",
    location: "Delhi NCR",
  },
  {
    id: 2,
    brand: "Omega",
    model: "Seamaster 300M",
    year: "2019",
    price: "₹7,20,000",
    trend: "+2%",
    condition: "Excellent",
    location: "Mumbai",
  },
  {
    id: 3,
    brand: "Tudor",
    model: "Black Bay Chronograph",
    year: "2021",
    price: "₹5,45,000",
    trend: "+5%",
    condition: "Good",
    location: "Bangalore",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

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
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
              Saved Items
            </p>
            <h1 className="text-4xl font-display">Wishlist</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {wishlist.length} watches in your wishlist
            </p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <Card className="p-12 text-center border border-border">
            <HeartIcon
              size={48}
              className="mx-auto mb-4 text-muted-foreground/50"
            />
            <h3 className="font-display text-2xl mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Start exploring watches and add them to your wishlist
            </p>
            <Button asChild>
              <Link href="/browse">Browse Watches</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wishlist.map((watch) => (
              <Card
                key={watch.id}
                className="p-6 border border-border hover:bg-muted/50 transition-colors flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase text-primary/50 mb-1">
                      {watch.brand}
                    </p>
                    <h3 className="font-display text-lg">{watch.model}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(watch.id)}
                  >
                    <HeartIcon size={18} className="text-destructive" />
                  </Button>
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-[10px]">
                      {watch.year}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {watch.condition}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {watch.location}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl">{watch.price}</h4>
                    <p className="text-sm text-green-600">{watch.trend}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button asChild className="flex-1">
                    <Link href={`/watch/${watch.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Make Offer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
