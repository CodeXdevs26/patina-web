"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon, CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

const faqItems = [
  {
    category: "Buying",
    items: [
      {
        q: "How do I make an offer on a watch?",
        a: "Navigate to the watch listing and click 'Make Offer'. Enter your proposed price and negotiate with the seller through our platform.",
      },
      {
        q: "Are all watches authenticated?",
        a: "Yes, every watch on PATINA goes through our rigorous authentication process before being listed. We guarantee authenticity or your money back.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept credit cards, debit cards, UPI, bank transfers, and NEFT for Indian customers.",
      },
      {
        q: "Is there a warranty on purchases?",
        a: "Most watches come with a seller warranty (typically 30 days). Additional extended warranties are available for eligible watches.",
      },
    ],
  },
  {
    category: "Selling",
    items: [
      {
        q: "How do I list a watch for sale?",
        a: "Create an account, go to Dashboard > Listings, and click 'Create New Listing'. Follow the steps to add photos, details, and pricing.",
      },
      {
        q: "What's the commission structure?",
        a: "PATINA charges a 6-8% commission on successful sales. Dealers get reduced rates starting at 4% for premium memberships.",
      },
      {
        q: "How long does authentication take?",
        a: "Our team typically authenticates watches within 48 hours of listing. Complex pieces may take up to 5 business days.",
      },
      {
        q: "Can I list multiple watches?",
        a: "Yes, there's no limit to the number of watches you can list. Dealers can manage bulk listings through their dealer dashboard.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "How are watches shipped?",
        a: "All watches are shipped via insured courier with tracking. We use top carriers and professional packaging to ensure safe delivery.",
      },
      {
        q: "What's the delivery timeframe?",
        a: "Standard delivery is 3-5 business days within India. Metro areas may get faster delivery. International shipping available for select locations.",
      },
      {
        q: "Is insurance included?",
        a: "Yes, all shipments are fully insured. The insurance covers the full watch value.",
      },
      {
        q: "Can I pick up locally?",
        a: "Yes, local pickups are available in major cities. You can arrange this directly with the seller through the platform.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "Is my data secure on PATINA?",
        a: "We use enterprise-grade encryption and follow all data protection regulations. Your payment and personal information is secure.",
      },
      {
        q: "Can I cancel or modify a listing?",
        a: "Yes, you can edit listings anytime before the first offer. Listings can be temporarily removed or closed.",
      },
      {
        q: "What if I encounter a counterfeit watch?",
        a: "Report it immediately through our support system. We have a money-back guarantee on counterfeit watches.",
      },
      {
        q: "How do I track my order?",
        a: "You'll receive tracking updates via email and SMS. Check your Dashboard > Purchase History for real-time tracking.",
      },
    ],
  },
];

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
            Help
          </p>
          <h1 className="text-5xl font-display">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Find answers to common questions about buying, selling, and using PATINA
          </p>
        </div>

        {faqItems.map((category) => (
          <div key={category.category} className="space-y-4">
            <h2 className="font-display text-2xl">{category.category}</h2>
            <div className="space-y-2">
              {category.items.map((item, index) => {
                const itemId = `${category.category}-${index}`;
                const isExpanded = expandedItems.includes(itemId);

                return (
                  <Card
                    key={itemId}
                    className="border border-border overflow-hidden"
                  >
                    <button
                      onClick={() => toggleExpanded(itemId)}
                      className="w-full p-6 text-left flex items-start justify-between hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="font-semibold text-sm flex-1">{item.q}</h3>
                      <CaretDownIcon
                        size={16}
                        className={`ml-4 flex-shrink-0 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-border pt-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        <Card className="p-8 border border-border bg-muted/30">
          <h3 className="font-display text-xl mb-4">Still need help?</h3>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
