"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ArrowLeftIcon, ShareNetworkIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { howl } from "@/lib/utils";

type Period = "1M" | "3M" | "6M" | "1Y";

type PricePoint = {
  date: string;
  price: number;
};

type MarketData = {
  reference_number: string;
  current_market_price: number;
  indicators: {
    "52w_high": number;
    "52w_low": number;
    momentum_1m_percentage: number;
    volatility_index: string;
  };
  chart_data: {
    "1M": PricePoint[];
    "3M": PricePoint[];
    "6M": PricePoint[];
    "1Y": PricePoint[];
  };
};

type MarketResponse = {
  ok: boolean;
  message: string;
  data: MarketData;
};

const chartConfig = {
  price: {
    label: "Market Price",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function WatchDetailsPage() {
  const params = useParams();
  const [period, setPeriod] = useState<Period>("1M");

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

  const { data, isPending, isError } = useQuery({
    queryKey: ["watchDetails", params.id],

    queryFn: async (): Promise<MarketResponse> => {
      return howl(`/market/price-history/${params.id}`);
    },

    enabled: !!params.id,
  });

  const marketData = data?.data;

  const chartData = useMemo(() => {
    if (!marketData?.chart_data) return [];

    return marketData.chart_data[period].map((item) => ({
      date: item.date,
      price: item.price,
    }));
  }, [marketData, period]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (value: string) => {
    const date = new Date(value);

    if (period === "1Y") {
      return date.toLocaleDateString("en-IN", {
        month: "short",
        year: "2-digit",
      });
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-12 container mx-auto">
        {/* Image */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-muted/30 aspect-video rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/watch.webp"
              alt={watchData.model}
              width={800}
              height={600}
              priority
              className="object-contain h-full w-full"
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <Card className="p-6 border border-border space-y-6">
            <div>
              <p className="text-[10px] uppercase text-primary/50 mb-2">
                {watchData.brand}
              </p>

              <h1 className="font-display text-2xl">{watchData.model}</h1>

              {marketData?.reference_number && (
                <p className="text-xs text-muted-foreground mt-2">
                  Ref. {marketData.reference_number}
                </p>
              )}
            </div>

            <div>
              <h2 className="font-display text-4xl mb-2">
                {marketData
                  ? formatPrice(marketData.current_market_price)
                  : watchData.price}
              </h2>

              <div className="flex gap-2 flex-wrap">
                {marketData && (
                  <Badge
                    className={
                      marketData.indicators.momentum_1m_percentage >= 0
                        ? "bg-green-900/20 border-green-800 text-green-800"
                        : "bg-red-900/20 border-red-800 text-red-800"
                    }
                  >
                    {marketData.indicators.momentum_1m_percentage >= 0
                      ? "+"
                      : ""}
                    {marketData.indicators.momentum_1m_percentage}% 1M
                  </Badge>
                )}

                <Badge variant="secondary">{watchData.condition}</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3 flex-1">
              <Button size="lg" className="w-full" asChild>
                <Link href={`/watch/${watchData.model}`}>View Details</Link>
              </Button>

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

              {marketData && (
                <>
                  <p>
                    <span className="text-muted-foreground">52W High:</span>{" "}
                    {formatPrice(marketData.indicators["52w_high"])}
                  </p>

                  <p>
                    <span className="text-muted-foreground">52W Low:</span>{" "}
                    {formatPrice(marketData.indicators["52w_low"])}
                  </p>

                  <p>
                    <span className="text-muted-foreground">Volatility:</span>{" "}
                    {marketData.indicators.volatility_index}
                  </p>
                </>
              )}

              <p className="text-muted-foreground">
                All PATINA watches come with authenticity verified status
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Performance */}
      <div className="container mx-auto px-12 pb-24">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-display">
              Performance on similar model
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Historical market price movement
            </p>
          </div>
        </div>

        <Tabs
          value={period}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <TabsList>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="6M">6M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
          </TabsList>

          <TabsContent value={period} className="mt-8">
            <Card className="p-6">
              {isPending ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Loading market history...
                  </p>
                </div>
              ) : isError ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-sm text-destructive">
                    Failed to load market history.
                  </p>
                </div>
              ) : chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    No price history available for this period.
                  </p>
                </div>
              ) : (
                <ChartContainer config={chartConfig} className="h-72 w-full">
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                      top: 12,
                      bottom: 12,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="fillPrice"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-price)"
                          stopOpacity={0.3}
                        />

                        <stop
                          offset="95%"
                          stopColor="var(--color-price)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} strokeDasharray="3 3" />

                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={formatDate}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={80}
                      tickFormatter={(value) =>
                        `₹${Number(value).toLocaleString("en-IN")}`
                      }
                    />

                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) =>
                            new Date(value).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          }
                          formatter={(value) => formatPrice(Number(value))}
                        />
                      }
                    />

                    <Area
                      dataKey="price"
                      type="natural"
                      fill="url(#fillPrice)"
                      fillOpacity={0.5}
                      stroke="var(--color-price)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{
                        r: 4,
                      }}
                    />
                  </AreaChart>
                </ChartContainer>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
