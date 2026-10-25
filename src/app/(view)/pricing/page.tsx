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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("India");
  const [max_price, setMaxPrice] = useState("All");
  const chartConfig = {
    price: {
      label: "Price",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  const { data, isPending } = useQuery({
    queryKey: ["index-feed", search, location, max_price],
    queryFn: async (): Promise<{
      ok: boolean;
      message: string;
      data: {
        overall_performance: {
          current_value: number;
          momentum_percentage: number;
          chart_data: Array<{
            date: string;
            price: number;
          }>;
        };
        feed: Array<{
          brand: string;
          model: string;
          reference_number: string;
          size: string;
          display_name: string;
          current_market_price: number;
          momentum_1m_percentage: number;
          value_badge: string;
          mini_chart_data: Array<{
            date: string;
            price: number;
          }>;
        }>;
      };
    }> => {
      return howl(`/market/feed?filter[watch_type]=[${search}]&filter[location]=${location}&filter[max_price]=${max_price}`);
    },
  });

  const chartData =
    data?.data?.overall_performance?.chart_data.map((item) => ({
      date: item.date,
      price: item.price,
    })) ?? [];

  // if (isPending) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-muted-foreground text-sm flex items-center gap-2">
  //         <Spinner /> Loading...
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-10 mt-12 space-y-12">
        <h1 className="text-4xl font-display">Market Performance</h1>
        <h1 className="text-4xl font-display text-primary">
          ₹{data?.data?.overall_performance?.current_value.toFixed(2)}{" "}
          <sup className="text-xl text-green-600">
            {data?.data?.overall_performance?.momentum_percentage.toFixed(2)}%
          </sup>
        </h1>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />
              }
            />
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-price)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-price)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="price"
              type="natural"
              fill="url(#fillPrice)"
              fillOpacity={0.4}
              stroke="var(--color-price)"
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

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="India">India</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </Card>

        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Showing {data?.data?.feed?.length ?? "0"} watches
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 divide-x! divide-y!">
            {isPending ?
              <div className="min-h-[20dvh] flex items-center justify-center">
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  <Spinner /> Loading...
                </p>
              </div>
              : data?.data?.feed?.map((watch) => (
                <Card
                  key={watch?.reference_number}
                  className="border-0 ring-0! border-border hover:bg-muted/50 transition-colors overflow-hidden flex flex-col pt-0! last-of-type:border-b"
                >
                  <div className="bg-muted/30 h-48 flex items-center justify-center">
                    {/* <Image
                    src="/rolex.webp"
                    alt="Watch"
                    height={100}
                    width={140}
                    className="object-contain h-full p-6"
                  /> */}
                    <ChartContainer config={chartConfig} className="h-48 w-full">
                      <AreaChart
                        accessibilityLayer
                        data={watch?.mini_chart_data}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <YAxis
                          domain={["dataMin", (dataMax: number) => dataMax * 2]}
                          hide
                        />

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
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-price)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>

                        <Area
                          dataKey="price"
                          type="natural"
                          fill="url(#fillPrice)"
                          fillOpacity={0.4}
                          stroke="var(--color-price)"
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-[10px] uppercase text-primary/50 mb-1">
                            {watch?.brand ?? "N/A"}
                          </p>
                          <h3 className="font-display text-lg">
                            {watch?.model ?? "N/A"}
                          </h3>
                        </div>
                      </div>
                      <div className="my-4 flex flex-row justify-between items-center w-full ">
                        <div className="flex flex-col justify-end items-start w-full">
                          <p className="text-2xl text-muted-foreground font-display">
                            ₹{" "}
                            {watch?.current_market_price?.toLocaleString(
                              "en-IN",
                            ) ?? "N/A"}
                          </p>
                          <div className="text-[10px] text-muted-foreground/50 space-x-2 mt-2 w-full flex items-center justify-end ">
                            <span>{watch?.size ?? "N/A"}</span>
                            <Badge className="bg-green-900/20 border-green-800 text-green-800 text-[10px]">
                              {watch?.value_badge ?? "N/A"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full"></div>
                    <Button asChild className="w-full">
                      <Link href={`/pricing/${watch?.reference_number}`}>
                        View Details
                      </Link>
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
