"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function PrivacyPage() {
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
          <h1 className="text-5xl font-display">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: 26 July 2026
          </p>
        </div>

        <Card className="p-8 border border-border space-y-8">
          <div>
            <h2 className="font-display text-2xl mb-4">1. Information We Collect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              We collect information to provide and improve our services:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>
                • <span className="font-semibold">Account Information:</span> Name, email,
                phone number, address
              </li>
              <li>
                • <span className="font-semibold">Payment Information:</span> Processed
                securely through third-party payment gateways
              </li>
              <li>
                • <span className="font-semibold">Transaction History:</span> Records of
                your buying and selling activities
              </li>
              <li>
                • <span className="font-semibold">Communications:</span> Messages and
                support tickets
              </li>
              <li>
                • <span className="font-semibold">Usage Data:</span> Pages visited, time
                spent, click data via cookies
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">2. How We Use Your Data</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Your data is used to:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>• Process transactions and deliver services</li>
              <li>• Verify your identity and prevent fraud</li>
              <li>• Communicate with you about your account</li>
              <li>• Improve our platform and user experience</li>
              <li>• Send promotional content (with your consent)</li>
              <li>• Comply with legal obligations</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">3. Data Security</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including SSL encryption,
              secure servers, and regular security audits. However, no online platform
              is 100% secure. Please notify us immediately of any unauthorized access.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">4. Third-Party Sharing</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              We may share data with:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>• Payment processors for transaction processing</li>
              <li>• Shipping partners for delivery services</li>
              <li>• Legal authorities when required by law</li>
              <li>
                • Analytics providers to understand platform usage (anonymized)
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">5. Your Rights</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>• Access your personal data</li>
              <li>• Correct inaccurate information</li>
              <li>• Request deletion of your data</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Request data portability</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">6. Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PATINA uses cookies to enhance your experience. You can control cookie
              settings in your browser. Some features may not work properly if cookies
              are disabled. We use both session and persistent cookies.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">7. International Data Transfers</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your data may be transferred to, stored in, and processed in countries
              other than India. By using PATINA, you consent to such transfers.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">8. Retention Period</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We retain your data for as long as necessary to provide services and
              fulfill legal obligations. Account data is retained for 3 years after
              account closure unless deletion is requested.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">9. Children's Privacy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PATINA is not intended for users under 18 years old. We do not knowingly
              collect data from minors. If we learn that a minor has provided data, we
              will delete it immediately.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl mb-4">10. Contact & Complaints</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              For privacy concerns or to exercise your rights:
            </p>
            <p className="text-sm text-muted-foreground">
              Email: privacy@patina.in
              <br />
              Address: Data Protection Officer, PATINA, New Delhi, India
            </p>
          </div>
        </Card>

        <div className="text-center">
          <Button asChild>
            <Link href="/terms">View Terms & Conditions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
