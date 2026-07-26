"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function TermsPage() {
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

      <div className="max-w-4xl mx-auto p-12 space-y-8">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Legal
          </p>
          <h1 className="text-5xl font-display">Terms & Conditions</h1>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: 26 July 2026
          </p>
        </div>

        <Card className="p-8 border border-border space-y-8">
          <div>
            <h2 className="font-display text-2xl mb-4">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing and using the PATINA marketplace, you agree to be bound by
              these Terms & Conditions and our Privacy Policy. If you do not agree to
              these terms, please do not use our platform.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">2. User Responsibilities</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              As a user, you agree to:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>• Provide accurate and truthful information in your account</li>
              <li>• Maintain the confidentiality of your account credentials</li>
              <li>• Not engage in fraudulent or illegal activities</li>
              <li>• Comply with all applicable laws and regulations</li>
              <li>• Not attempt to hack, reverse engineer, or disrupt the platform</li>
              <li>• Treat other users with respect and civility</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">3. Authenticity Guarantee</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PATINA guarantees that all watches listed on our platform have been
              authenticated by our expert team. If a watch is found to be counterfeit,
              we will provide a full refund. However, this guarantee does not cover
              watches purchased through peer-to-peer transactions outside our platform.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">4. Buyer Protections</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              As a buyer, you are protected by:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>
                • Secure payment processing with fraud protection
              </li>
              <li>• Authenticity verification on all watches</li>
              <li>• Insured shipping with tracking</li>
              <li>• Dispute resolution system in case of issues</li>
              <li>
                • Return rights within the specified timeframe (varies by seller)
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">5. Seller Responsibilities</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Sellers on PATINA agree to:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>• Provide accurate descriptions of watches</li>
              <li>• Use only genuine photographs of the actual item</li>
              <li>• Disclose all flaws and defects</li>
              <li>• Ship items promptly as agreed</li>
              <li>• Maintain professional communication with buyers</li>
              <li>• Comply with all platform policies</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">6. Dispute Resolution</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In case of disputes between buyers and sellers, PATINA provides a
              structured dispute resolution process. Our team will review evidence
              from both parties and make a fair determination within 14 days.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">7. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PATINA is provided on an &quot;as-is&quot; basis. We are not liable for any
              indirect, incidental, or consequential damages arising from the use of
              our platform. Our maximum liability is limited to the transaction amount.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">8. Intellectual Property</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All content on PATINA, including logos, text, images, and design, is the
              intellectual property of PATINA or its content providers. Unauthorized
              reproduction or distribution is prohibited.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">9. Modifications to Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PATINA reserves the right to modify these terms at any time. Changes will
              be effective immediately upon posting. Continued use of the platform
              constitutes acceptance of modified terms.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">10. Contact Us</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For questions about these Terms & Conditions, please contact our support
              team at support@patina.in or through our contact form.
            </p>
          </div>
        </Card>

        <div className="text-center">
          <Button asChild>
            <Link href="/privacy">View Privacy Policy</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
