import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Header({
  data,
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
}) {
  const fallbackWatch = {
    brand: " ",
    model: " ",
    price: undefined,
    year_of_production: " ",
    case_size: " ",
    condition: " ",
    accessories: [" "],
    location: " ",
    market_momentum: " ",
    images: ["/watch.webp"],
  };

  const watches = data?.length ? data : [fallbackWatch];

  const featured = watches[0];
  const secondaryWatches = [watches[1] ?? featured, watches[2] ?? featured];

  const formatPrice = (price?: number) => {
    if (typeof price !== "number") return " ";

    return `₹${price.toLocaleString("en-IN")}`;
  };

  const getAccessories = (watch: (typeof watches)[number]) => {
    if (watch.accessories?.length) {
      return watch.accessories.slice(0, 1);
    }

    return [" "];
  };

  const getImage = (watch: (typeof watches)[number]) => {
    if (watch.images?.length && watch.images[0]) {
      return watch.images[0];
    }

    return "/watch.webp";
  };

  const getMomentum = (watch: (typeof watches)[number]) => {
    if (typeof watch.market_momentum === "number") {
      return watch.market_momentum;
    }

    return 4;
  };

  const getCondition = (watch: (typeof watches)[number]) => {
    return watch.condition || "Mint";
  };

  const getYear = (watch: (typeof watches)[number]) => {
    return watch.year_of_production || "2020";
  };

  const getCaseSize = (watch: (typeof watches)[number]) => {
    return watch.case_size || "41mm";
  };

  const getLocation = (watch: (typeof watches)[number]) => {
    return watch.location || "Delhi NCR";
  };

  const getBrand = (watch: (typeof watches)[number]) => {
    return watch.brand || "Rolex";
  };

  const getModel = (watch: (typeof watches)[number]) => {
    return watch.model || "Submariner Date 126610LN";
  };

  return (
    <header className="lg:h-[calc(100vh-4rem)] divide-x w-full border-b grid lg:grid-cols-2 gap-12 lg:gap-0 mt-12 lg:mt-0">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="w-full px-[6%] space-y-6">
          <p className="text-[8px] tracking-[0.2rem] text-primary flex gap-4 items-center uppercase">
            <span className="border-t border-primary/50 w-8" />
            India's pre-owned watch market
          </p>

          <h1 className="text-7xl leading-none font-display">
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

      <div className="h-full w-full bg-radial from-[#110f0c] to-[#111110] grid grid-rows-2 divide-y">
        <div className="flex flex-col justify-between items-start p-12 relative">
          <div className="h-full w-full flex flex-col justify-between items-start relative">
            <Image
              src={getImage(featured)}
              alt={getModel(featured)}
              width={400}
              height={400}
              className="absolute top-0 right-0 h-full object-cover object-left mix-blend-screen"
            />

            <p className="text-[10px] uppercase text-primary/50">Featured</p>

            <div className="space-y-4 w-full">
              <p className="text-[10px] uppercase text-primary/50">
                {getBrand(featured)}
              </p>

              <h3 className="font-display text-3xl">{getModel(featured)}</h3>

              <div className="space-x-2">
                <Badge
                  className="text-[10px] text-muted-foreground"
                  variant="secondary"
                >
                  {getYear(featured)}
                </Badge>

                <Badge
                  className="text-[10px] text-muted-foreground"
                  variant="secondary"
                >
                  {getCaseSize(featured)}
                </Badge>

                <Badge
                  className="text-[10px] text-muted-foreground"
                  variant="secondary"
                >
                  {getCondition(featured)}
                </Badge>

                {getAccessories(featured).map((accessory) => (
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
                  {getLocation(featured)}
                </Badge>
              </div>
            </div>

            <div className="flex justify-between items-center w-full">
              <h4 className="font-display text-4xl">
                {formatPrice(featured.price)}
              </h4>

              <Badge className="bg-green-900/20 border-green-800 text-green-800 text-[10px]">
                −4% vs fair market
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x w-full">
          {secondaryWatches.map((watch, index) => {
            const momentum = getMomentum(watch);

            return (
              <div className="" key={`${watch.model ?? "fallback"}-${index}`}>
                <div className="h-full w-full flex flex-col justify-between items-start p-6">
                  <div className="space-y-4 w-full">
                    <p className="text-[10px] uppercase text-primary/50">
                      {getBrand(watch)}
                    </p>

                    <h3 className="font-display text-2xl">{getModel(watch)}</h3>

                    <div className="space-x-2">
                      <Badge
                        className="text-[10px] text-muted-foreground"
                        variant="secondary"
                      >
                        {getYear(watch)}
                      </Badge>

                      <Badge
                        className="text-[10px] text-muted-foreground"
                        variant="secondary"
                      >
                        {getCaseSize(watch)}
                      </Badge>

                      <Badge
                        className="text-[10px] text-muted-foreground"
                        variant="secondary"
                      >
                        {getCondition(watch)}
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
                        {getLocation(watch)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <h4 className="font-display text-2xl">
                      {formatPrice(watch.price)}
                    </h4>

                    <Badge className="bg-transparent text-green-800 text-[10px]">
                      ↑ {momentum}%
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
