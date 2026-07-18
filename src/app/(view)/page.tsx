import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Page() {
  return (
    <>
      <header className="h-[calc(100vh-4rem)] divide-x w-full border-b grid grid-cols-2">
        <div className="h-full flex flex-col justify-center items-center">
          <div className="w-full px-[6%] space-y-6">
            <p className="text-[8px] tracking-[0.2rem] text-primary flex gap-4 items-center uppercase">
              <div className="border-t border-primary/50 w-8" />
              India's pre-owned watch market
            </p>
            <h1 className="text-7xl leading-[1] font-display">
              Where watches <br /> become <br />
              <span className="text-primary">assets.</span>
            </h1>
            <p className="text-muted-foreground text-xs uppercase font-light leading-normal">
              Buy, sell, and price second-hand watches with confidence. Built
              for <br /> India's collectors, first-timers, and dealers — with
              the security of a <br /> financial platform.
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
          <div className="flex flex-col justify-between items-start p-12">
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
          <div className="grid grid-cols-2 divide-x w-full">
            <div className=""></div>
            <div className=""></div>
          </div>
        </div>
      </header>
      lol
    </>
  );
}
