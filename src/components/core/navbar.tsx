import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

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
    <>
      <div className="h-16 border-b flex justify-between px-12 items-center fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="flex justify-between items-center">
          <div
            className={cn(
              `text-2xl tracking-[0.3rem] text-muted-foreground shimmer font-display`,
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
      <div className="h-16" />
    </>
  );
}
