"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

const guides = [
  {
    id: 1,
    title: "Beginner's Guide to Luxury Watches",
    description:
      "Everything you need to know to start your watch collection with confidence",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Investment Watches: Which Models Hold Value?",
    description:
      "Learn which watches appreciate over time and make sound investments",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Understanding Watch Movements",
    description:
      "Explore the differences between automatic, manual, and quartz movements",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "The Art of Negotiation in the Watch Market",
    description: "Strategies and tips for negotiating better prices on pre-owned watches",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Vintage vs Modern: What's Right for You?",
    description: "Comparing the pros and cons of vintage and contemporary timepieces",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Watch Photography 101: Showcasing Your Pieces",
    description: "Professional tips for photographing watches for online listings",
    readTime: "5 min read",
  },
];

export default function GuidesPage() {
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
            Resources
          </p>
          <h1 className="text-5xl font-display">Watch Guides</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Expert resources to help you navigate the watch market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Card
              key={guide.id}
              className="p-6 border border-border hover:bg-muted/50 transition-colors flex flex-col"
            >
              <h3 className="font-display text-lg mb-2">{guide.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {guide.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground">
                  {guide.readTime}
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/guide/${guide.id}`}>
                    Read
                    <ArrowRightIcon size={14} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 border border-border bg-muted/30">
          <div className="text-center space-y-4">
            <h2 className="font-display text-2xl">More Resources</h2>
            <p className="text-muted-foreground">
              Explore our comprehensive knowledge base to learn more about watches
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild>
                <Link href="/info/authentication">Authentication Guide</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/info/maintenance">Maintenance Tips</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
