import { Button } from "@/components/ui/button";
import React from "react";

export default function DataGrid() {
  return (
    <div className="grid grid-cols-2">
      <div className="p-12 border-r border-b space-y-12">
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          How Patina works
        </p>
        <h2 className="text-5xl font-display">
          Trust built <br /> into every <br />
          <span className="text-primary">step.</span>
        </h2>
        <p className="text-xs text-muted-foreground/50">
          Patina is India's most secure watch marketplace. Every listing <br />{" "}
          is photo-verified before going live. Every transaction is escrow-{" "}
          <br />
          protected. One trusted market.
        </p>
        <Button className="uppercase w-full" size="lg">
          Get the app
        </Button>
      </div>
      <div className="border-r border-b">
        <div className="flex flex-row gap-8 p-8 hover:bg-secondary/15">
          <div className="font-display text-5xl! text-muted-foreground/50">
            01
          </div>
          <div className="flex-1">
            <h4>Seller lists and pays the listing fee</h4>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Pays ₹999 per listing. Submits 12 photos for a photo check,
              completed within 24 hours. Listing goes live on approval. Sellers
              with a brand certificate or warranty card receive a Verified badge
              and priority placement — at no extra cost.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-8 p-8  hover:bg-secondary/15">
          <div className="font-display text-5xl! text-muted-foreground/50">
            02
          </div>
          <div className="flex-1">
            <h4>Sell directly or list publicly</h4>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Sell to Patina instantly at a guaranteed price with payment in 48
              hours, or list at full price and negotiate with real buyers. 5%
              commission on marketplace sales.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-8 p-8  hover:bg-secondary/15">
          <div className="font-display text-5xl! text-muted-foreground/50">
            03
          </div>
          <div className="flex-1">
            <h4>Buyer discovers and finances</h4>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Every listing shows price vs fair market value. Shipping cost
              quoted on each listing. 2% buyer protection fee covers escrow and
              dispute resolution.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-8 p-8  hover:bg-secondary/15">
          <div className="font-display text-5xl! text-muted-foreground/50">
            04
          </div>
          <div className="flex-1">
            <h4>Escrow releases on confirmation</h4>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Funds are held until the buyer confirms receipt. Both parties
              rated after every transaction. The Patina Record transfers to the
              new owner permanently.
            </p>
          </div>
        </div>
      </div>
      <div className="border-r border-b divide-y">
        <div className="flex flex-row gap-8 p-8 hover:bg-secondary/15">
          <div className="font-display text-5xl! text-primary/50">01</div>
          <div className="flex-1">
            <h4>Tell us about your watch</h4>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Submit 12 photos and details via the app. Our team reviews within
              24 hours and your listing goes live on approval.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-8 p-8  hover:bg-secondary/15">
          <div className="font-display text-5xl! text-primary/50">02</div>
          <div className="flex-1">
            <h4>Photo check completed</h4>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Our team reviews your 12 photos within 24 hours. Your Patina
              Record is issued on approval and your listing goes live. Provide a
              brand certificate to receive a Verified badge.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-8 p-8  hover:bg-secondary/15">
          <div className="font-display text-5xl! text-primary/50">03</div>
          <div className="flex-1">
            <h4>Accept a Patina offer or list publicly</h4>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Patina buys directly at a guaranteed price with payment in 48
              hours. Or list at full price and keep 95% of the sale.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-8 p-8  hover:bg-secondary/15">
          <div className="font-display text-5xl! text-primary/50">04</div>
          <div className="flex-1">
            <h4>Payment via escrow</h4>
            <p className="text-xs text-muted-foreground/50 mt-2">
              Escrow releases once the buyer confirms receipt. UPI, IMPS, and
              bank transfer supported.
            </p>
          </div>
        </div>
      </div>
      <div className="p-12 border-r border-b space-y-12">
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          Sell on Patina
        </p>
        <h2 className="text-5xl font-display">
          Your watch is worth <br />
          more with a record
          <br />
          behind it.
        </h2>
        <p className="text-xs text-muted-foreground/50">
          Verified listings on Patina sell faster and at higher prices. The
          Patina Record signals trust to every buyer before they even enquire.
        </p>
        <div className="space-x-2">
          <Button className="uppercase" size="lg">
            Start Selling
          </Button>
          <Button className="uppercase" size="lg" variant="outline">
            Get a Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
