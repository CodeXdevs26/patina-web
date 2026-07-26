import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  CreditCardIcon,
  ShieldIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
export default function Verif() {
  return (
    <section className="p-12 grid grid-cols-2 gap-12">
      <div className="">
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          Secure Marketplace
        </p>
        <h2 className="text-4xl font-display">
          Every listing is photo-verified.
        </h2>
        <p className="w-2/3 text-xs text-muted-foreground/50 mt-2">
          No listing goes live without a photo check. Sellers with a brand
          certificate, warranty card, or original invoice receive a Verified
          badge — the strongest trust signal on the platform.
        </p>
        <div className="mt-8">
          <Card className="border-l-3! border-primary! ring-primary/30 bg-primary/10">
            <CardContent className="px-6 flex justify-between items-center">
              <div className="">
                <h4 className="text-sm font-semibold">Listing fee</h4>
                <p className="text-xs text-muted-foreground/50">
                  Photo check · Within 24 hrs · 12-point protocol
                </p>
              </div>
              <div className="flex flex-col justify-end items-end">
                <h4 className="text-xl font-display text-primary">₹999</h4>
                <p className="text-xs text-muted-foreground/50">per listing</p>
              </div>
            </CardContent>
          </Card>
          <Card className="pl-1">
            <CardContent className="px-6 flex justify-between items-center">
              <div className="">
                <h4 className="text-sm font-semibold">Brand certificate</h4>
                <p className="text-xs text-muted-foreground/50">
                  Warranty card, invoice, or brand cert · Gets Verified badge
                </p>
              </div>
              <div className="flex flex-col justify-end items-end">
                <h4 className="text-xl font-display text-primary">Free</h4>
                <p className="text-xs text-muted-foreground/50">
                  Priority placement
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="px-6 flex justify-between items-center">
              <div className="">
                <h4 className="text-sm font-semibold">Dealer subscription</h4>
                <p className="text-xs text-muted-foreground/50">
                  Bulk listings · Lower commission · Dealer badge
                </p>
              </div>
              <div className="flex flex-col justify-end items-end">
                <h4 className="text-xl font-display text-primary">
                  From ₹10K/mo
                </h4>
                <p className="text-xs text-muted-foreground/50">dealer tier</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="">
        <Card>
          <CardContent className="flex gap-4">
            <div className="aspect-square! size-8 flex items-center justify-center p-2 bg-primary/10 text-primary rounded-sm border border-primary/50">
              <ShieldIcon size={18} />
            </div>
            <div className="flex-1">
              <h4>Patina Record</h4>
              <p className="text-xs text-muted-foreground/50">
                Every verified listing receives a Patina Record — a digital
                record that confirms the photo check passed and travels with the
                watch through future sales on the platform.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex gap-4">
            <div className="aspect-square! size-8 flex items-center justify-center p-2 bg-primary/10 text-primary rounded-sm border border-primary/50">
              <UserIcon size={18} />
            </div>
            <div className="flex-1">
              <h4>Verified badge</h4>
              <p className="text-xs text-muted-foreground/50">
                Sellers who provide a brand authenticity certificate, original
                warranty card, or purchase invoice are awarded a gold Verified
                badge — the highest trust signal on Patina.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex gap-4">
            <div className="aspect-square! size-8 flex items-center justify-center p-2 bg-primary/10 text-primary rounded-sm border border-primary/50">
              <CreditCardIcon size={18} />
            </div>
            <div className="flex-1">
              <h4>Escrow Protection</h4>
              <p className="text-xs text-muted-foreground/50">
                Funds are held in escrow until the buyer confirms receipt and
                authenticity. No payment clears before both parties are
                satisfied.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
