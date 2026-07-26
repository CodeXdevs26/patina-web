import { cn } from "@/lib/utils";
import React from "react";

export default function Footer() {
  return (
    <footer className="">
      <div className="p-12 grid grid-cols-4 gap-6">
        <div className="">
          <div
            className={cn(
              `text-2xl tracking-[0.3rem] text-muted-foreground shimmer font-display`,
            )}
          >
            PATINA
          </div>
          <p className="text-xs text-muted-foreground/50 mt-2">
            India's secure pre-owned watch marketplace. Built <br />
            for collectors, first-timers, and dealers.
          </p>
        </div>
        <div className="">
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Marketplace
          </p>
          <ul>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Browse Listings
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Sell a Watch
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Price Index
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Finance & Escrow
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Dealer Access
            </li>
          </ul>
        </div>
        <div className="">
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Selling on Patina
          </p>
          <ul>
            <li className="text-xs text-muted-foreground/50 mt-2">
              List a Watch
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Listing Fee — ₹999
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Patina Record
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Verified Badge
            </li>
          </ul>
        </div>
        <div className="">
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Company
          </p>
          <ul>
            <li className="text-xs text-muted-foreground/50 mt-2">
              About Patina
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Trust & Safety
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Privacy Policy
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">
              Terms of Use
            </li>
            <li className="text-xs text-muted-foreground/50 mt-2">Contact</li>
          </ul>
        </div>
      </div>
      <div className="p-4 px-6 border-t text-xs font-light text-muted-foreground/50">
        © 2026 Patina. India's secure watch marketplace.
      </div>
    </footer>
  );
}
