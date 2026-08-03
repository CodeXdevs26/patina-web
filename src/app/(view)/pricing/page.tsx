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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
  const [priceRange, setPriceRange] = useState("all");
  const [condition, setCondition] = useState("all");

  const filteredWatches = mockWatches.filter(
    (watch) =>
      watch.brand.toLowerCase().includes(search.toLowerCase()) ||
      watch.model.toLowerCase().includes(search.toLowerCase()),
  );

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--primary)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--accent)",
    },
  } satisfies ChartConfig;
  return (
    <div className="min-h-screen bg-background">
      <div className="px-10 mt-12 space-y-12">
        <h1 className="text-4xl font-display">Market Performance</h1>
        <h1 className="text-4xl font-display text-primary">
          1,484.49 <sup className="text-xl text-green-600">+48.45%</sup>
        </h1>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <div className="p-12 space-y-8">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Collection
          </p>
          <h1 className="text-5xl font-display">Watches In The Index</h1>
        </div>

        <Card className="p-6 border border-border space-y-6">
          <div>
            <h3 className="font-display text-lg mb-4">Search & Filter</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[10px] uppercase text-primary/50 mb-1">
                          {watch.brand}
                        </p>
                        <h3 className="font-display text-lg">{watch.model}</h3>
                      </div>
                    </div>
                    <div className="my-4 flex flex-row justify-between items-center">
                      <div className="flex flex-col justify-end items-start">
                        <p className="text-2xl text-muted-foreground font-display">
                          ₹ 1,20,000
                        </p>
                        <div className="text-[10px] text-muted-foreground/50 space-x-2 mt-2">
                          <span>+2.3%</span>
                          <Badge className="bg-green-900/20 border-green-800 text-green-800 text-[10px]">
                            −4% vs fair market
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full"></div>
                  <Button asChild className="w-full">
                    <Link href={`/index/${watch.id}`}>View Details</Link>
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
