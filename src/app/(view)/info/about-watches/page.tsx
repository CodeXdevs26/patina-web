"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function AboutWatchesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 z-40 bg-background">
        <div className="h-16 flex items-center px-12">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeftIcon size={16} className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-12 space-y-12">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Guide
          </p>
          <h1 className="text-5xl font-display">About Watches</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Understanding the world of timepieces and what makes a watch valuable
          </p>
        </div>

        <Card className="p-8 border border-border space-y-6">
          <div>
            <h2 className="font-display text-3xl mb-4">What Makes a Watch Valuable?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The value of a watch is determined by several key factors that collectors
              and enthusiasts consider when buying or selling timepieces. Understanding
              these elements will help you make informed decisions in the pre-owned watch
              market.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl mb-2">Brand Heritage</h3>
                <p className="text-sm text-muted-foreground">
                  Established watchmakers like Rolex, Omega, and Tudor command premium
                  prices due to their reputation for quality, precision, and desirability.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">Condition & Maintenance</h3>
                <p className="text-sm text-muted-foreground">
                  A well-maintained watch retains its value better. Regular servicing and
                  proper care can significantly impact the resale price.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">Age & Rarity</h3>
                <p className="text-sm text-muted-foreground">
                  Vintage and discontinued models often appreciate in value. Limited
                  editions and rare references are highly sought after by collectors.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">Completeness</h3>
                <p className="text-sm text-muted-foreground">
                  Watches with original boxes, papers, and complete sets command higher
                  prices than those sold without documentation.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">Movement & Mechanism</h3>
                <p className="text-sm text-muted-foreground">
                  The type of movement (automatic, manual, quartz) and its reputation for
                  accuracy affects the watch&apos;s desirability and value.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-3xl mb-4">Watch Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border p-4 rounded-lg">
                <h3 className="font-display text-lg mb-2">Sports Watches</h3>
                <p className="text-xs text-muted-foreground">
                  Designed for durability and functionality with features like water
                  resistance and robust cases.
                </p>
              </div>
              <div className="border border-border p-4 rounded-lg">
                <h3 className="font-display text-lg mb-2">Dress Watches</h3>
                <p className="text-xs text-muted-foreground">
                  Elegant and refined timepieces suitable for formal occasions with
                  minimalist designs.
                </p>
              </div>
              <div className="border border-border p-4 rounded-lg">
                <h3 className="font-display text-lg mb-2">Vintage Watches</h3>
                <p className="text-xs text-muted-foreground">
                  Collectible timepieces typically over 20-30 years old, valued for
                  their historical significance.
                </p>
              </div>
              <div className="border border-border p-4 rounded-lg">
                <h3 className="font-display text-lg mb-2">Chronographs</h3>
                <p className="text-xs text-muted-foreground">
                  Watches with stopwatch functions, originally designed for precise
                  timing in sports and aviation.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="font-display text-2xl">Learn More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto py-4" asChild>
              <Link href="/info/guides">Watch Guides</Link>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4" asChild>
              <Link href="/info/authentication">Authentication Guide</Link>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4" asChild>
              <Link href="/info/maintenance">Maintenance Tips</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
