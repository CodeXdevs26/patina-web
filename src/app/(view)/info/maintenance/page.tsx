"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function MaintenancePage() {
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
            Care Guide
          </p>
          <h1 className="text-5xl font-display">Maintenance & Care</h1>
          <p className="text-lg text-muted-foreground mt-4">
            How to keep your watch in pristine condition for years to come
          </p>
        </div>

        <Card className="p-8 border border-border space-y-8">
          <div>
            <h2 className="font-display text-3xl mb-4">Daily Care Tips</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Proper daily care is the foundation of watch maintenance. These simple
              habits will help preserve your timepiece and maintain its value.
            </p>
            <div className="space-y-4">
              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Avoid Water Exposure</h4>
                <p className="text-sm text-muted-foreground">
                  Remove your watch before swimming or bathing unless it&apos;s specifically
                  rated for that activity. Salt water is particularly damaging.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Protect from Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Avoid dropping or bumping your watch. Sudden impacts can damage the
                  internal mechanism.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Store Safely</h4>
                <p className="text-sm text-muted-foreground">
                  Store your watch in a cool, dry place. Use a watch box or safe for
                  valuable pieces.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Regular Cleaning</h4>
                <p className="text-sm text-muted-foreground">
                  Wipe your watch with a soft cloth regularly to remove dust and oils.
                  Never use harsh chemicals.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <h2 className="font-display text-3xl mb-4">Professional Servicing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Even with perfect care, watches need professional servicing to maintain
              accuracy and functionality.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">How Often Should You Service?</h4>
                <p className="text-sm text-muted-foreground">
                  Most watches should be serviced every 3-5 years, depending on usage
                  and manufacturer recommendations. Daily wear watches may need more
                  frequent service.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">What Does Servicing Include?</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Complete disassembly and cleaning</li>
                  <li>• Parts inspection and replacement if needed</li>
                  <li>• Lubrication with proper oils</li>
                  <li>• Reassembly and timing adjustment</li>
                  <li>• Water resistance testing</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Choosing a Service Center</h4>
                <p className="text-sm text-muted-foreground">
                  For valuable watches, always use authorized service centers or
                  specialized watchmakers. They have the proper equipment and expertise.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <h2 className="font-display text-3xl mb-4">Common Issues & Solutions</h2>

            <div className="space-y-4">
              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Losing Time</h4>
                <p className="text-sm text-muted-foreground">
                  If your watch consistently loses time, it may need regulation or
                  servicing. Have a professional check the movement.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Moisture Inside the Crystal</h4>
                <p className="text-sm text-muted-foreground">
                  This indicates the water resistance seal has failed. Get professional
                  service immediately to prevent damage.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Stopped Movement</h4>
                <p className="text-sm text-muted-foreground">
                  A watch that suddenly stops may need winding, battery replacement, or
                  professional inspection.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Stuck Crown</h4>
                <p className="text-sm text-muted-foreground">
                  Never force a stuck crown. This may indicate salt corrosion or internal
                  damage. Seek professional help.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="font-display text-3xl">Preservation for Value</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you&apos;re collecting or investing in watches, maintenance directly impacts
              resale value. Keep all original documentation, maintain service records, and
              avoid modifications to your timepiece.
            </p>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Need professional maintenance for your watch?
          </p>
          <Button asChild>
            <Link href="/contact">Find a Service Center</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
