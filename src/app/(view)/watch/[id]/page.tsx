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
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { howl } from "@/lib/utils";

export default function WatchDetailsPage() {
  const params = useParams();
  const { id } = params;

  const { data, isPending } = useQuery({
    queryKey: ["watchDetails"],
    queryFn: async (): Promise<{
      ok: boolean;
      message: string;
      data: {
        listing: {
          id: number;
          seller: {
            id: number;
            name: string;
            standing: any;
          };
          brand: string;
          model: string;
          watch_type: any;
          reference_number: string;
          price: number;
          condition: string;
          case_size: string;
          year_of_production: string;
          location: string;
          accessories: Array<string>;
          condition_notes: string;
          images: Array<string>;
          brand_certificate: string;
          market_momentum: any;
          status: string;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        market_data: any;
      };
    }> => {
      return howl(`/listings/${id}`);
    },
    enabled: !!id,
  });

  const watchData = {
    brand: data?.data.listing.brand || "N/A",
    model: data?.data.listing.model || "N/A",
    year: data?.data.listing.year_of_production || "N/A",
    reference: data?.data.listing.reference_number || "Loading..",
    price: data?.data.listing.price || "Loading..",
    condition: data?.data.listing.condition || "Loading..",
    location: data?.data.listing.location || "N/A",
    seller: data?.data.listing.seller?.name || "N/A",
    verified: data?.data.listing.is_verified || true,
    // views: 342,
    trend: data?.data.market_data?.trend || "N/A",
    description: data?.data.listing.condition_notes || "N/A",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 z-40 bg-background">
        <div className="h-16 flex items-center justify-between px-12">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/browse">
              <ArrowLeftIcon size={16} className="mr-2" />
              Back to Browse
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-12 container mx-auto">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-muted/30 aspect-video rounded-lg flex items-center justify-center">
            <Image
              src={data?.data?.listing?.images?.[0] || "/watch.webp"}
              alt="Watch"
              width={800}
              height={600}
              className="object-contain h-full w-full"
            />
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="condition">Condition Report</TabsTrigger>
              <TabsTrigger value="seller">Seller Info</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              <Card className="p-6 border border-border">
                <h3 className="font-display text-lg mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground mb-1">
                      Reference
                    </p>
                    <p className="text-sm">{watchData.reference}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground mb-1">
                      Year
                    </p>
                    <p className="text-sm">{watchData.year}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground mb-1">
                      Case Size
                    </p>
                    <p className="text-sm">{data?.data?.listing?.case_size}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground mb-1">
                      Watch Type
                    </p>
                    <p className="text-sm">
                      {data?.data?.listing?.watch_type ?? "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground mb-1">
                      Movement
                    </p>
                    <p className="text-sm">Automatic</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground mb-1">
                      Condition
                    </p>
                    <p className="text-sm">{watchData.condition}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border border-border">
                <h3 className="font-display text-lg mb-4">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {watchData.description}
                </p>
              </Card>

              <Card className="p-6 border border-border">
                <h3 className="font-display text-lg mb-4">
                  What&apos;s Included
                </h3>
                <ul className="space-y-2">
                  {data?.data?.listing?.accessories?.map((accessory) => (
                    <li
                      className="text-sm flex items-center gap-2"
                      key={accessory}
                    >
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {accessory}
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="condition" className="space-y-6 mt-6">
              <Card className="p-6 border border-border">
                <h3 className="font-display text-lg mb-4">Condition Report</h3>
                <p>{data?.data?.listing?.condition_notes}</p>
                {/* <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-2">Case</p>
                    <p className="text-xs text-muted-foreground">
                      Minor scratches consistent with regular wear
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-semibold mb-2">Crystal</p>
                    <p className="text-xs text-muted-foreground">
                      Clean, no scratches or cracks
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-semibold mb-2">Dial & Hands</p>
                    <p className="text-xs text-muted-foreground">
                      Perfect condition, no fading
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-semibold mb-2">Bracelet</p>
                    <p className="text-xs text-muted-foreground">
                      Light scratches on links, properly sized
                    </p>
                  </div>
                </div> */}
              </Card>
            </TabsContent>

            {data?.data?.listing?.seller && (
              <TabsContent value="seller" className="space-y-6 mt-6">
                <Card className="p-6 border border-border">
                  <h3 className="font-display text-lg mb-4">
                    Seller Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <p className="text-xs font-semibold">MW</p>
                      </div>
                      <div>
                        <p className="font-semibold">{watchData.seller}</p>
                        <div className="flex items-center gap-1">
                          <ShieldIcon size={14} className="text-green-600" />
                          <p className="text-xs text-green-600">
                            Verified Dealer
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground mb-1">
                          Member Since
                        </p>
                        <p className="text-sm">2018</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground mb-1">
                          Total Sales
                        </p>
                        <p className="text-sm">245 watches</p>
                      </div>
                    </div>

                    <Separator />

                    <Button className="w-full">Contact Seller</Button>
                  </div>
                </Card>
              </TabsContent>
            )}
          </Tabs>
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
              <h2 className="font-display text-4xl mb-2">₹{watchData.price}</h2>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-green-900/20 border-green-800 text-green-800">
                  {watchData.trend}
                </Badge>
                <Badge variant="secondary">{watchData.condition}</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3 flex-1">
              <Button size="lg" className="w-full">
                Make Offer
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
              {/* <p>
                <span className="text-muted-foreground">Views:</span>{" "}
                {watchData.views}
              </p> */}
              <p className="text-muted-foreground">
                All PATINA watches come with authenticity verified status
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
