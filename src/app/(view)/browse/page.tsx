"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeartIcon } from "@phosphor-icons/react/dist/ssr";

const mockWatches = [
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
  {
    id: 4,
    brand: "Seiko",
    model: "Prospex Diver",
    year: "2020",
    price: "₹1,85,000",
    trend: "+3%",
    condition: "Mint",
    location: "Pune",
  },
  {
    id: 5,
    brand: "Citizen",
    model: "Eco-Drive",
    year: "2022",
    price: "₹95,000",
    trend: "+1%",
    condition: "Like New",
    location: "Chennai",
  },
  {
    id: 6,
    brand: "Breitling",
    model: "Avenger Chronograph",
    year: "2018",
    price: "₹8,25,000",
    trend: "+7%",
    condition: "Good",
    location: "Delhi NCR",
  },
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");
  const [condition, setCondition] = useState("all");

  const filteredWatches = mockWatches.filter(
    (watch) =>
      watch.brand.toLowerCase().includes(search.toLowerCase()) ||
      watch.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 z-40 bg-background">
        <div className="h-16 flex items-center px-12">
          <h1 className="text-2xl font-display tracking-[0.3rem] text-muted-foreground">
            PATINA
          </h1>
        </div>
      </div>

      <div className="p-12 space-y-8">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Collection
          </p>
          <h1 className="text-5xl font-display">Browse Watches</h1>
        </div>

        <Card className="p-6 border border-border space-y-6">
          <div>
            <h3 className="font-display text-lg mb-4">Search & Filter</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Search by brand or model"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Listings</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="mint">Mint</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-2">₹0 - ₹2L</SelectItem>
                <SelectItem value="2-5">₹2L - ₹5L</SelectItem>
                <SelectItem value="5-10">₹5L - ₹10L</SelectItem>
                <SelectItem value="10+">₹10L+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredWatches.length} watches
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWatches.map((watch) => (
              <Card
                key={watch.id}
                className="border border-border hover:bg-muted/50 transition-colors overflow-hidden flex flex-col"
              >
                <div className="bg-muted/30 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground/50">
                      [Watch Image]
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[10px] uppercase text-primary/50 mb-1">
                        {watch.brand}
                      </p>
                      <h3 className="font-display text-lg">{watch.model}</h3>
                    </div>
                    <Button variant="ghost" size="sm">
                      <HeartIcon size={16} />
                    </Button>
                  </div>

                  <div className="flex gap-2 flex-wrap mb-4">
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

                  <div className="mb-4 flex-1">
                    <h4 className="font-display text-2xl">{watch.price}</h4>
                    <p className="text-sm text-green-600">{watch.trend}</p>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/watch/${watch.id}`}>View Details</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
