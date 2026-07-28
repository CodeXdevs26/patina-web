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
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const mockWatches = [
//   {
//     id: 1,
//     brand: "Rolex",
//     model: "Submariner Date 126610LN",
//     year: "2020",
//     price: "₹9,50,000",
//     trend: "+4%",
//     condition: "Mint",
//     location: "Delhi NCR",
//   },
//   {
//     id: 2,
//     brand: "Omega",
//     model: "Seamaster 300M",
//     year: "2019",
//     price: "₹7,20,000",
//     trend: "+2%",
//     condition: "Excellent",
//     location: "Mumbai",
//   },
//   {
//     id: 3,
//     brand: "Tudor",
//     model: "Black Bay Chronograph",
//     year: "2021",
//     price: "₹5,45,000",
//     trend: "+5%",
//     condition: "Good",
//     location: "Bangalore",
//   },
//   {
//     id: 4,
//     brand: "Seiko",
//     model: "Prospex Diver",
//     year: "2020",
//     price: "₹1,85,000",
//     trend: "+3%",
//     condition: "Mint",
//     location: "Pune",
//   },
//   {
//     id: 5,
//     brand: "Citizen",
//     model: "Eco-Drive",
//     year: "2022",
//     price: "₹95,000",
//     trend: "+1%",
//     condition: "Like New",
//     location: "Chennai",
//   },
//   {
//     id: 6,
//     brand: "Breitling",
//     model: "Avenger Chronograph",
//     year: "2018",
//     price: "₹8,25,000",
//     trend: "+7%",
//     condition: "Good",
//     location: "Delhi NCR",
//   },
// ];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");
  const [condition, setCondition] = useState("all");

  // const filteredWatches = mockWatches.filter(
  //   (watch) =>
  //     watch.brand.toLowerCase().includes(search.toLowerCase()) ||
  //     watch.model.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <div className="min-h-screen bg-background">
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
              <SelectTrigger className="w-full">
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
              <SelectTrigger className="w-full">
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
              <SelectTrigger className="w-full">
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
            Showing 99+ watches
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6">
            {Array(12)
              .fill("")
              .map((_, index) => (
                <Card
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="border border-border hover:bg-muted/50 transition-colors overflow-hidden flex flex-col pt-0!"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <Avatar size="lg" className="size-18!">
                        <AvatarImage src="https://api.dicebear.com/10.x/lorelei/svg?seed=Felix" />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <div className="flex  flex-col items-end">
                        <p className="text-[10px] uppercase text-primary/50 mb-1">
                          Joined: 2024
                        </p>
                        <h3 className="font-display text-lg">User Name</h3>
                        <div className="space-x-2">
                          <Badge
                            variant="secondary"
                            className=" border-primary text-primary bg-transparent"
                          >
                            ✓ Verified
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-muted-foreground"
                          >
                            Dealer
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis nam ea a impedit explicabo dolores, odit quibusdam
                      aspernatur ad reprehenderit modi itaque sed velit quos
                      repellat. Vitae expedita libero nobis.
                    </p>

                    <Button asChild className="w-full mt-6">
                      <Link href={`#`}>View Details</Link>
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
