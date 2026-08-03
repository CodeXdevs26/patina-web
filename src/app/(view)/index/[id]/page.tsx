"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ShieldIcon,
  ShareNetworkIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
export default function WatchDetailsPage() {
  const watchData = {
    brand: "Rolex",
    model: "Submariner Date 126610LN",
    year: "2020",
    reference: "126610LN",
    price: "₹9,50,000",
    condition: "Mint",
    location: "Delhi NCR",
    seller: "Mumbai Vintage Watches",
    verified: true,
    views: 342,
    trend: "+4% vs market",
    description:
      "Excellent condition Rolex Submariner with original box and papers. Complete set with all documentation. Maintained regularly by authorized Rolex service center.",
  };

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
      <div className="border-b sticky top-0 z-40 bg-background">
        <div className="h-16 flex items-center justify-between px-12">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/browse">
              <ArrowLeftIcon size={16} className="mr-2" />
              Back to Index
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-12 container mx-auto">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-muted/30 aspect-video rounded-lg flex items-center justify-center">
            <Image
              src="/watch.webp"
              alt="Watch"
              width={800}
              height={600}
              className="object-contain h-full w-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border border-border space-y-6">
            <div>
              <p className="text-[10px] uppercase text-primary/50 mb-2">
                {watchData.brand}
              </p>
              <h1 className="font-display text-2xl">{watchData.model}</h1>
            </div>

            <div>
              <h2 className="font-display text-4xl mb-2">{watchData.price}</h2>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-green-900/20 border-green-800 text-green-800">
                  {watchData.trend}
                </Badge>
                <Badge variant="secondary">{watchData.condition}</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3 flex-1">
              <Button size="lg" className="w-full" asChild>
                <Link href={`/watch/${watchData.model}`}>View Details</Link>
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <HeartIcon size={16} className="mr-2" />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button> */}
              <Button size="lg" variant="outline" className="w-full">
                <ShareNetworkIcon size={16} className="mr-2" />
                Share
              </Button>
            </div>

            <Separator />

            <div className="space-y-3 text-xs">
              <p>
                <span className="text-muted-foreground">Location:</span>{" "}
                {watchData.location}
              </p>
              <p>
                <span className="text-muted-foreground">Views:</span>{" "}
                {watchData.views}
              </p>
              <p className="text-muted-foreground">
                All PATINA watches come with authenticity verified status
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className="container mx-auto px-12">
        <h2 className="text-3xl font-display">Performance on similar model</h2>
        <ChartContainer config={chartConfig} className="h-48 w-full my-24">
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
    </div>
  );
}
