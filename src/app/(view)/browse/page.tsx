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
import { useDebounce } from "react-haiku";

type Listing = {
  id: number;
  seller: {
    id: number;
    name: string;
    standing: any;
  };
  brand: string;
  model: string;
  watch_type?: string;
  reference_number: string;
  price: number;
  condition: string;
  case_size: string;
  year_of_production: string;
  location: string;
  accessories: string[];
  condition_notes: string;
  images: string[];
  brand_certificate?: string;
  market_momentum?: number;
  status: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

type ListingsResponse = {
  ok: boolean;
  message: string;
  data: {
    listings: {
      data: Listing[];
      links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
      };
      meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
          url?: string;
          label: string;
          page?: number;
          active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
      };
    };
  };
};

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000000]);
  const [condition, setCondition] = useState("all");

  const debouncedSearch = useDebounce(search, 1000);
  const debouncedPriceRange = useDebounce(priceRange, 1000);

  const [{ token }] = useCookies(["token"]);

  const { data, isPending, isError } = useQuery({
    queryKey: [
      "listing",
      debouncedSearch,
      debouncedPriceRange,
      brand,
      condition,
    ],
    queryFn: async (): Promise<{
      ok: boolean;
      message: string;
      data: {
        listings: {
          data: Array<{
            id: number;
            seller: {
              id: number;
              name: string;
              standing: any;
            };
            brand: string;
            model: string;
            watch_type?: string;
            reference_number: string;
            price: number;
            condition: string;
            case_size: string;
            year_of_production: string;
            location: string;
            accessories: Array<string>;
            condition_notes: string;
            images: Array<string>;
            brand_certificate?: string;
            market_momentum?: number;
            status: string;
            is_verified: boolean;
            created_at: string;
            updated_at: string;
          }>;
          links: {
            first: string;
            last: string;
            prev: any;
            next: string;
          };
          meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: Array<{
              url?: string;
              label: string;
              page?: number;
              active: boolean;
            }>;
            path: string;
            per_page: number;
            to: number;
            total: number;
          };
        };
      };
    }> => {
      const params = new URLSearchParams();

      const filters = {
        search: debouncedSearch,
        "filter[min_price]": debouncedPriceRange[0],
        "filter[max_price]": debouncedPriceRange[1],
        "filter[brand]": brand,
        "filter[condition]": condition !== "all" ? condition : undefined,
      };

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      });

      return howl(`/listings?${params.toString()}`, { token });
    },
  });

  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: async (): Promise<{
      ok: boolean;
      message: string;
      data: Array<string>;
    }> => {
      return howl("/watch-data/brands", { token });
    },
  });

  const listings = data?.data?.listings?.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-12 space-y-8">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Collection
          </p>
          <h1 className="text-5xl font-display">Browse Watches</h1>
        </div>

        <Card className="p-6 border border-border space-y-0">
          <div>
            <h3 className="font-display text-lg mb-4">Search & Filter</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            <Input
              placeholder="Search by brand or model"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>

              <SelectContent>
                {brandsData?.data?.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>

                <SelectItem value="Mint">Mint</SelectItem>

                <SelectItem value="Excellent">Excellent</SelectItem>

                <SelectItem value="Good">Good</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <span className="whitespace-nowrap">Price range:</span>

              <Slider
                max={20000000}
                step={100}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as number[])}
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
            {isPending
              ? "Loading watches..."
              : `Showing ${listings.length} watches`}
          </p>

          {isError && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Failed to load listings.</p>
            </Card>
          )}

          {!isPending && !isError && listings.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No watches found.</p>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x! divide-y!">
            {listings.map((watch) => {
              const image = watch.images?.[0] || "/rolex.webp";

              return (
                <Card
                  key={watch.id}
                  className="border-0 ring-0! border-border hover:bg-muted/50 transition-colors overflow-hidden flex flex-col pt-0!"
                >
                  <div className="bg-muted/30 h-48 flex items-center justify-center">
                    <Image
                      src={image}
                      alt={`${watch.brand} ${watch.model}`}
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
                    </div>

                    <div className="flex gap-2 flex-wrap mb-4">
                      <Badge
                        variant="secondary"
                        className="text-[10px] text-white"
                      >
                        {watch.year_of_production}
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
                      <h4 className="font-display text-2xl">
                        ₹{watch.price.toLocaleString("en-IN")}
                      </h4>

                      {watch.market_momentum !== undefined && (
                        <p
                          className={
                            watch.market_momentum >= 0
                              ? "text-sm text-green-600"
                              : "text-sm text-red-600"
                          }
                        >
                          {watch.market_momentum >= 0 ? "+" : ""}
                          {watch.market_momentum ?? 0}%
                        </p>
                      )}
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/watch/${watch.id}`}>View Details</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
