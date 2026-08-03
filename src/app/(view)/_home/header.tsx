import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
export default function Header() {
  return (
    <header className="lg:h-[calc(100vh-4rem)] divide-x w-full border-b grid lg:grid-cols-2 gap-12 lg:gap-0 mt-12">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="w-full px-[6%] space-y-6">
          <p className="text-[8px] tracking-[0.2rem] text-primary flex gap-4 items-center uppercase">
            <span className="border-t border-primary/50 w-8" />
            India's pre-owned watch market
          </p>
          <h1 className="text-7xl leading-[1] font-display">
            Where watches <br /> become <br />
            <span className="text-primary">assets.</span>
          </h1>
          <p className="text-muted-foreground text-sm font-light leading-normal">
            Buy, sell, and price second-hand watches with confidence. Built for{" "}
            <br /> India's collectors, first-timers, and dealers — with the
            security of a <br /> financial platform.
          </p>
          <div className="w-1/2 grid grid-cols-2 gap-4">
            <Button size="lg">Browse Listings</Button>
            <Button size="lg" variant="outline">
              Sell A Watch
            </Button>
          </div>
          <Separator />
          <div className="w-1/2 grid grid-cols-4 gap-4">
            <div className="">
              <h4>12,400+</h4>
              <p className="text-[10px] text-muted-foreground font-light uppercase">
                Watches Listed
              </p>
            </div>
            <div className="">
              <h4>₹18Cr+</h4>
              <p className="text-[10px] text-muted-foreground font-light uppercase">
                Traded
              </p>
            </div>
            <div className="">
              <h4>12,400+</h4>
              <p className="text-[10px] text-muted-foreground font-light uppercase">
                Users Joined
              </p>
            </div>
            <div className="">
              <h4>12,400+</h4>
              <p className="text-[10px] text-muted-foreground font-light uppercase">
                Dealers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-radial from-[#110f0c]  to-[#111110]  grid grid-rows-2 divide-y">
        <div className="flex flex-col justify-between items-start p-12 relative">
          {/* <Image
              src="/watch.webp"
              alt="Watch"
              height={400}
              width={400}
              className="absolute top-0 right-0 h-full object-cover object-left"
            /> */}
          <div className="h-full w-full flex flex-col justify-between items-start relative">
            <Image
              src="/watch.webp"
              alt="Watch"
              width={400}
              height={400}
              className="absolute top-0 right-0 h-full object-cover object-left mix-blend-screen"
            />
            <p className="text-[10px] uppercase text-primary/50">
              Featured — Verified · Undervalued
            </p>
            <div className="space-y-4 w-full">
              <p className="text-[10px] uppercase text-primary/50">Rolex</p>
              <h3 className="font-display text-3xl">
                Submariner
                <br /> Date 126610LN
              </h3>
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
            </div>
            <div className="flex justify-between items-center w-full">
              <h4 className="font-display text-4xl">₹9,50,000</h4>{" "}
              <Badge className="bg-green-900/20 border-green-800 text-green-800 text-[10px]">
                −4% vs fair market
              </Badge>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x w-full">
          <div className="">
            <div className="h-full w-full flex flex-col justify-between items-start p-6">
              <div className="space-y-4 w-full">
                <p className="text-[10px] uppercase text-primary/50">Rolex</p>
                <h3 className="font-display text-2xl">
                  Submariner
                  <br /> Date 126610LN
                </h3>
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
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="font-display text-2xl">₹9,50,000</h4>{" "}
                <Badge className="bg-transparent text-green-800 text-[10px]">
                  ↑ 4%
                </Badge>
              </div>
            </div>
          </div>
          <div className="">
            <div className="h-full w-full flex flex-col justify-between items-start p-6">
              <div className="space-y-4 w-full">
                <p className="text-[10px] uppercase text-primary/50">Rolex</p>
                <h3 className="font-display text-2xl">
                  Submariner
                  <br /> Date 126610LN
                </h3>
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
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="font-display text-2xl">₹9,50,000</h4>{" "}
                <Badge className="bg-transparent text-green-800 text-[10px]">
                  ↑ 4%
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
