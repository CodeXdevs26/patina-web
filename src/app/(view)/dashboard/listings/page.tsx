"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  EyeIcon,
  TrashIcon,
  PencilIcon,
} from "@phosphor-icons/react/dist/ssr";

const initialListings = [
  {
    id: 1,
    brand: "Tudor",
    model: "Black Bay 58",
    year: "2021",
    price: "₹4,25,000",
    views: 342,
    offers: 8,
    status: "Active",
    listedDate: "15 Jul 2024",
  },
  {
    id: 2,
    brand: "Seiko",
    model: "Prospex Diver",
    year: "2020",
    price: "₹1,85,000",
    views: 156,
    offers: 2,
    status: "Active",
    listedDate: "10 Jul 2024",
  },
  {
    id: 3,
    brand: "Citizen",
    model: "Eco-Drive",
    year: "2019",
    price: "₹95,000",
    views: 0,
    offers: 0,
    status: "Draft",
    listedDate: "05 Jul 2024",
  },
];

export default function ListingsPage() {
  const [listings, setListings] = useState(initialListings);

  const deleteListing = (id: number) => {
    setListings(listings.filter((item) => item.id !== id));
  };

  const activeListings = listings.filter((l) => l.status === "Active");
  const draftListings = listings.filter((l) => l.status === "Draft");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 z-40 bg-background">
        <div className="h-16 flex items-center justify-between px-12">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeftIcon size={16} className="mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="#create-listing">Create New Listing</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-12 space-y-8">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Manage Sales
          </p>
          <h1 className="text-4xl font-display">My Listings</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {activeListings.length} active listings
          </p>
        </div>

        {activeListings.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl">Active Listings</h3>
            <div className="space-y-4">
              {activeListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="p-6 border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <p className="text-[10px] uppercase text-primary/50 mb-1">
                        {listing.brand}
                      </p>
                      <h3 className="font-display">{listing.model}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Listed {listing.listedDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground mb-1">
                        Asking Price
                      </p>
                      <h4 className="font-display text-lg">{listing.price}</h4>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground mb-1">
                        Views
                      </p>
                      <div className="flex items-center gap-1">
                        <EyeIcon size={14} />
                        <p className="text-sm">{listing.views}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground mb-1">
                        Offers
                      </p>
                      <p className="font-display text-lg">{listing.offers}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <PencilIcon size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => deleteListing(listing.id)}
                      >
                        <TrashIcon size={14} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {draftListings.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl">Drafts</h3>
            <div className="space-y-4">
              {draftListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="p-6 border border-border opacity-60 hover:opacity-100 transition-opacity"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <p className="text-[10px] uppercase text-primary/50 mb-1">
                        {listing.brand}
                      </p>
                      <h3 className="font-display">{listing.model}</h3>
                      <Badge variant="secondary" className="mt-2 text-[10px]">
                        Draft
                      </Badge>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground mb-1">
                        Asking Price
                      </p>
                      <h4 className="font-display text-lg">{listing.price}</h4>
                    </div>

                    <div className="lg:col-span-2">
                      <p className="text-xs text-muted-foreground">
                        Complete this listing to make it visible to buyers
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <PencilIcon size={14} className="mr-1" />
                        Continue
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => deleteListing(listing.id)}
                      >
                        <TrashIcon size={14} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {listings.length === 0 && (
          <Card className="p-12 text-center border border-border">
            <h3 className="font-display text-2xl mb-2">No listings yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create your first listing to start selling
            </p>
            <Button asChild>
              <Link href="#create-listing">Create Listing</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
