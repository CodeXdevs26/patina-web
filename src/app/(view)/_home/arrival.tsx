"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

export default function Arrival({
  data,
  type,
  setArrivalType,
}: {
  data?: {
    id: number;
    seller: {
      id: number;
      name: string;
      standing: any;
    };
    brand: string;
    model: string;
    watch_type: string;
    reference_number: string;
    price: number;
    condition: string;
    case_size: string;
    year_of_production: string;
    location: string;
    accessories: Array<string>;
    condition_notes: string;
    images: Array<string>;
    brand_certificate: any;
    market_momentum?: number;
    status: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  }[];
  type: string;
  setArrivalType: React.Dispatch<React.SetStateAction<string>>;
}) {
  type Watch = NonNullable<typeof data>[number];

  const watches = data?.length ? data : null;

  const formatPrice = (price?: number) => {
    if (typeof price !== "number") return "₹ 1,20,000";

    return `₹ ${price.toLocaleString("en-IN")}`;
  };

  const getImage = (watch?: Watch) => {
    if (watch?.images?.length && watch.images[0]) {
      return watch.images[0];
    }

    return "/watch.webp";
  };

  const getAccessories = (watch?: Watch) => {
    if (watch?.accessories?.length) {
      return watch.accessories.slice(0, 1);
    }

    return ["Box + Papers"];
  };

  return (
    <section className="p-12">
      <div className="">
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          Marketplace
        </p>
        <h2 className="text-4xl font-display">New arrivals</h2>
      </div>

      <div className="space-x-2 mt-6">
        {[
          "All",
          "Dress",
          "Casual",
          "Formal",
          "Chrono",
          "Field",
          "Vintage",
          "Diver",
          "Pilot",
          "Under 50k",
        ].map((x) => (
          <Button
            size="sm"
            variant={type === x ? "default" : "outline"}
            key={x}
            onClick={() => setArrivalType(x)}
          >
            {x}
          </Button>
        ))}
      </div>

      <div className="w-full grid grid-cols-5 mt-12">
        {watches?.slice(0, 5).map((watch) => (
          <div
            className="flex flex-col relative justify-start items-center gap-4 border border-transparent hover:border-primary/20 hover:bg-primary/5 active:bg-primary/10 transition-all duration-300 cursor-pointer"
            key={watch.id}
          >
            <div className="rounded-lg border size-7 p-1 text-xs flex justify-center items-center tracking-normal text-muted-foreground/50 absolute top-2 left-2 bg-background">
              M
            </div>

            <div className="border uppercase border-primary p-1 text-[10px] flex justify-center items-center tracking-normal text-primary absolute top-2 right-2 bg-primary/20 backdrop:blur-sm">
              ✓ {watch.is_verified ? "Verified" : "Unverified"}
            </div>

            <div className="border uppercase p-1 text-[10px] flex justify-center items-center tracking-normal text-white/50 absolute top-10 right-2 bg-muted/80 backdrop:blur-sm">
              Fair value
            </div>

            <Image
              src={getImage(watch)}
              height={500}
              width={800}
              alt={watch.model || watch.brand || "Watch"}
              className="object-cover w-full aspect-video"
            />

            <div className="w-full p-4">
              <p className="text-[10px] uppercase text-primary">
                {watch.brand || "ROLEX"}
              </p>

              <h5 className="text-xl font-display">
                {watch.model || "Submariner Date"}
              </h5>

              <div className="space-x-2">
                <Badge
                  className="text-[10px] text-muted-foreground"
                  variant="secondary"
                >
                  {watch.year_of_production || "2020"}
                </Badge>

                <Badge
                  className="text-[10px] text-muted-foreground"
                  variant="secondary"
                >
                  {watch.case_size || "41mm"}
                </Badge>

                <Badge
                  className="text-[10px] text-muted-foreground"
                  variant="secondary"
                >
                  {watch.condition || "Mint"}
                </Badge>

                {getAccessories(watch).map((accessory) => (
                  <Badge
                    key={accessory}
                    className="text-[10px] text-muted-foreground"
                    variant="secondary"
                  >
                    {accessory}
                  </Badge>
                ))}

                <Badge
                  className="text-[10px] text-muted-foreground"
                  variant="secondary"
                >
                  {watch.location || "Delhi NCR"}
                </Badge>
              </div>

              <div className="mt-8 flex flex-row justify-between items-center">
                <div className="flex flex-col justify-end items-start">
                  <p className="text-2xl text-muted-foreground font-display">
                    {formatPrice(watch.price)}
                  </p>

                  <p className="text-[10px] text-muted-foreground/50">
                    Shipping · ₹250 shipping
                  </p>
                </div>

                <div className="flex flex-col justify-end items-end">
                  <p className="flex gap-1 text-primary text-xs">
                    <CheckIcon />
                    {watch.is_verified ? "Verified" : "Unverified"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {watch.seller?.name || "Arjun"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
