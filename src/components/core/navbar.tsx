import React from "react";
import { Cormorant } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

const cormorant = Cormorant({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  const navs = [
    {
      label: "Browse",
      href: "#browse",
    },
    {
      label: "Price index",
      href: "#price-index",
    },
    {
      label: "Finance",
      href: "#finance",
    },
    {
      label: "Dealers",
      href: "#dealers",
    },
  ];
  return (
    <div className="h-16 border-b flex justify-between px-12 items-center">
      <div className="flex justify-between items-center">
        <div
          className={cn(
            `text-2xl tracking-[0.3rem] text-muted-foreground shimmer`,
            cormorant.className,
          )}
        >
          PATINA
        </div>
        <div className="flex space-x-2 ml-8">
          {navs.map((nav) => (
            <Button
              key={nav.label}
              variant="ghost"
              className="text-muted-foreground/80 uppercase text-[10px] bg-transparent! hover:text-primary"
              asChild
            >
              <Link href={nav.href}>{nav.label}</Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className="text-muted-foreground/80 uppercase text-[10px] bg-transparent! hover:text-primary"
        >
          Sell a watch
        </Button>
        <Button variant="outline">Sign In</Button>
        <Button>Get the App</Button>
      </div>
    </div>
  );
}
