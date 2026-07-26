"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

export default function Arrival() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
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
            variant={selectedCategory === x ? "default" : "outline"}
            key={x}
            onClick={() => setSelectedCategory(x)}
          >
            {x}
          </Button>
        ))}
      </div>
      <div className="w-full grid grid-cols-5 mt-12 ">
        {Array(5)
          .fill("")
          .map((_, index) => (
            <div
              className="flex flex-col relative justify-start items-center gap-4 border border-transparent hover:border-primary/20 hover:bg-primary/5 active:bg-primary/10 transition-all duration-300 cursor-pointer"
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
            >
              <div className="rounded-lg border size-7 p-1 text-xs flex justify-center items-center tracking-normal text-muted-foreground/50 absolute top-2 left-2 bg-background">
                M
              </div>
              <div className="border uppercase border-primary p-1 text-[10px] flex justify-center items-center tracking-normal text-primary absolute top-2 right-2 bg-primary/20 backdrop:blur-sm">
                ✓ Verified
              </div>
              <div className="border uppercase p-1 text-[10px] flex justify-center items-center tracking-normal text-white/50 absolute top-10 right-2 bg-muted/80 backdrop:blur-sm">
                Fair value
              </div>
              <Image
                src="/watch.webp"
                height={500}
                width={800}
                alt="Rolex"
                className="object-cover w-full aspect-video"
              />
              <div className="w-full p-4">
                <p className="text-[10px] uppercase text-primary">ROLEX</p>
                <h5 className="text-xl font-display">Submariner Date</h5>
                <div className="space-x-2">
                  <Badge
                    className="text-[10px] text-muted-foreground"
                    variant="secondary"
                  >
                    2020
                  </Badge>
                  <Badge
                    className="text-[10px] text-muted-foreground"
                    variant="secondary"
                  >
                    41mm
                  </Badge>
                  <Badge
                    className="text-[10px] text-muted-foreground"
                    variant="secondary"
                  >
                    Mint
                  </Badge>
                  <Badge
                    className="text-[10px] text-muted-foreground"
                    variant="secondary"
                  >
                    Box + Papers
                  </Badge>
                  <Badge
                    className="text-[10px] text-muted-foreground"
                    variant="secondary"
                  >
                    Delhi NCR
                  </Badge>
                </div>
                <div className="mt-8 flex flex-row justify-between items-center">
                  <div className="flex flex-col justify-end items-start">
                    <p className="text-2xl text-muted-foreground font-display">
                      ₹ 1,20,000
                    </p>
                    <p className="text-[10px] text-muted-foreground/50">
                      Shipping · ₹250 shipping
                    </p>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="flex gap-1 text-primary text-xs">
                      <CheckIcon />
                      Verified
                    </p>
                    <p className="text-xs text-muted-foreground">Arjun</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
