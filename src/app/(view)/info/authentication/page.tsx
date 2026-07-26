"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheckIcon, ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function AuthenticationPage() {
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
            Verification
          </p>
          <h1 className="text-5xl font-display">Authentication Guide</h1>
          <p className="text-lg text-muted-foreground mt-4">
            How to verify that your watch is authentic and what to look for
          </p>
        </div>

        <Card className="p-8 border border-border space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheckIcon size={32} className="text-green-600" />
              <h2 className="font-display text-3xl">Why Authentication Matters</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Counterfeit watches are a significant issue in the pre-owned market. PATINA
              is committed to ensuring all watches on our platform are verified as
              authentic. Here&apos;s what you need to know about authentication.
            </p>
          </div>

          <Separator />

          <div className="space-y-6">
            <h3 className="font-display text-2xl">Key Authentication Indicators</h3>

            <div className="space-y-4">
              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Serial Numbers</h4>
                <p className="text-sm text-muted-foreground">
                  Authentic watches have properly formatted, legible serial numbers on
                  the case back. Check these against the manufacturer&apos;s database when
                  possible.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Case Weight & Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Counterfeit watches often have incorrect weight or dimensions. Compare
                  these specifications with official manufacturer data.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Movement Quality</h4>
                <p className="text-sm text-muted-foreground">
                  Examine the internal movement if possible. Authentic movements should
                  show consistent finishing and proper markings.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Paperwork & Provenance</h4>
                <p className="text-sm text-muted-foreground">
                  Original documentation, warranty cards, and purchase history provide
                  important proof of authenticity.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Dial Quality</h4>
                <p className="text-sm text-muted-foreground">
                  Check for proper printing quality, correct fonts, and accurate color
                  matching on the dial.
                </p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Crystal & Coating</h4>
                <p className="text-sm text-muted-foreground">
                  Authentic watches have high-quality crystals with proper AR coating.
                  Test for reflections and clarity.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <h3 className="font-display text-2xl">Red Flags to Watch For</h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                Prices significantly below market average
              </p>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                Missing or unclear documentation
              </p>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                Poor quality photographs with obvious imperfections
              </p>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                Inconsistencies in case finishing or logo placement
              </p>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                Spelling errors on dial or bezel
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <h3 className="font-display text-2xl">PATINA&apos;s Verification Process</h3>
            <p className="text-muted-foreground mb-4">
              Every watch on PATINA goes through our rigorous authentication process:
            </p>
            <ol className="space-y-3">
              <li className="text-sm text-muted-foreground flex items-start gap-3">
                <span className="font-display text-primary">1.</span>
                Expert examination of all watch components
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-3">
                <span className="font-display text-primary">2.</span>
                Serial number verification with manufacturers
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-3">
                <span className="font-display text-primary">3.</span>
                Movement inspection and testing
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-3">
                <span className="font-display text-primary">4.</span>
                Documentation review and authentication report
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-3">
                <span className="font-display text-primary">5.</span>
                Professional photographing for transparency
              </li>
            </ol>
          </div>
        </Card>

        <Card className="p-8 border border-border bg-muted/30">
          <h3 className="font-display text-xl mb-4">Still Have Questions?</h3>
          <p className="text-muted-foreground mb-6">
            Contact our authentication experts for personalized guidance on any watch
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
