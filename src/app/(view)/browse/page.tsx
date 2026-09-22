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
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";

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
  {
    id: 7,
    brand: "Breitling",
    model: "Avenger Chronograph",
    year: "2018",
    price: "₹8,25,000",
    trend: "+7%",
    condition: "Good",
    location: "Delhi NCR",
  },
  {
    id: 8,
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
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [condition, setCondition] = useState("all");
  const [{ token }] = useCookies(["token"]);

  const filteredWatches = mockWatches.filter(
    (watch) =>
      watch.brand.toLowerCase().includes(search.toLowerCase()) ||
      watch.model.toLowerCase().includes(search.toLowerCase()),
  );

  const { data, isPending } = useQuery({
    queryKey: ["listing"],
    queryFn: async () => {
      return howl("/listings", { token });
    },
  });

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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
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

            <div className="flex items-center gap-4">
              <span className="whitespace-nowrap">Price range:</span>
              <Slider
                defaultValue={[0, 100000]}
                max={100000}
                step={100}
                className=""
                onValueChange={(value) => setPriceRange(value as number[])}
                value={priceRange}
              />
              <div className="p-2 space-y-2 space-x-2">
                <div className="whitespace-nowrap">
                  Min: ₹{priceRange[0] ?? 0}
                </div>
                <div className="whitespace-nowrap">
                  Max: ₹{priceRange[1] ?? 0}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredWatches.length} watches
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 divide-x! divide-y!">
            {filteredWatches.map((watch) => (
              <Card
                key={watch.id}
                className="border-0 ring-0! border-border hover:bg-muted/50 transition-colors overflow-hidden flex flex-col pt-0! last-of-type:border-b"
              >
                <div className="bg-muted/30 h-48 flex items-center justify-center">
                  <Image
                    src="/rolex.webp"
                    alt="Watch"
                    height={100}
                    width={140}
                    className="object-contain h-full p-6"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[10px] uppercase text-primary/50 mb-1">
                        {watch.brand}
                      </p>
                      <h3 className="font-display text-lg">{watch.model}</h3>
                    </div>
                    {/* <Button variant="ghost" size="sm">
                      <HeartIcon size={16} />
                    </Button> */}
                  </div>

                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge
                      variant="secondary"
                      className="text-[10px] text-white"
                    >
                      {watch.year}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-[10px] text-white"
                    >
                      {watch.condition}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-[10px] text-white"
                    >
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
