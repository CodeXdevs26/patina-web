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
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "react-haiku";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("-average_rating");
  const debouncedSearch = useDebounce(search, 1000);

  const { data, isPending } = useQuery({
    queryKey: ["delers", debouncedSearch, sortBy],
    queryFn: async (): Promise<{
      ok: boolean;
      message: string;
      data: {
        dealers: {
          data: {
            current_page: number;
            data: Array<{
              id: number;
              name: string;
              company_name: string;
              avatar: string;
              joined_year: string;
              is_verified: boolean;
              standing: string;
              rating: string;
              reviews_count: number;
              description: string;
            }>;
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Array<{
              url?: string;
              label: string;
              page?: number;
              active: boolean;
            }>;
            next_page_url: any;
            path: string;
            per_page: number;
            prev_page_url: any;
            to: number;
            total: number;
          };
          meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
          };
        };
      };
    }> => {
      return howl(`/dealers?filter[search]=${debouncedSearch}&sort=${sortBy}`);
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="p-12 space-y-8">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Collection
          </p>
          <h1 className="text-5xl font-display">Browse Dealers</h1>
        </div>

        <Card className="p-6 border border-border space-y-6">
          <div>
            <h3 className="font-display text-lg mb-4">Search & Filter</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="col-span-2"></div>
            <Input
              placeholder="Search by Details"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-average_rating">
                  Rating: Highest to Lowest
                </SelectItem>
                <SelectItem value="average_rating">
                  Ratin: Low to High
                </SelectItem>
                {/* <SelectItem value="trending">Trending</SelectItem> */}
              </SelectContent>
            </Select>

            {/* <Select value={condition} onValueChange={setCondition}>
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
            </Select> */}
          </div>
        </Card>

        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Showing {data?.data?.dealers?.data?.to} watches
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6">
            {isPending && (
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <Spinner /> Loading...
              </p>
            )}
            {data?.data?.dealers?.data?.data?.map((data, index) => (
              <Card
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="border border-border hover:bg-muted/50 transition-colors overflow-hidden flex flex-col pt-0!"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <Avatar size="lg" className="size-18!">
                      <AvatarImage
                        src={
                          data?.avatar ||
                          "https://api.dicebear.com/10.x/lorelei/svg?seed=Felix"
                        }
                      />
                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                    <div className="flex  flex-col items-end">
                      <p className="text-[10px] uppercase text-primary/50 mb-1">
                        Joined: {data?.joined_year || "N/A"}
                      </p>
                      <h3 className="font-display text-lg mb-2">
                        {data?.name || "User Name"}
                      </h3>
                      <div className="space-x-2">
                        {data?.is_verified && (
                          <Badge
                            variant="secondary"
                            className=" border-primary text-primary bg-transparent"
                          >
                            ✓ Verified
                          </Badge>
                        )}
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
                    {data?.description || "No description available."}
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
