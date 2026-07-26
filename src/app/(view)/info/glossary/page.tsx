"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

const glossaryTerms = [
  {
    term: "Automatic Movement",
    definition:
      "A self-winding mechanical movement that uses a rotor to wind the mainspring as the wearer moves their wrist.",
  },
  {
    term: "Bezel",
    definition:
      "The ring that holds the crystal and protects the watch face. Often rotatable on sport watches.",
  },
  {
    term: "Chronograph",
    definition:
      "A watch that includes a stopwatch function with additional subdials for measuring elapsed time.",
  },
  {
    term: "Complication",
    definition:
      "Any feature beyond basic timekeeping on a watch, such as a date window, moon phase, or perpetual calendar.",
  },
  {
    term: "Crown",
    definition:
      "The small knob on the side of the watch used to wind and set the time.",
  },
  {
    term: "Crystal",
    definition:
      "The transparent cover over the watch dial. Usually made of sapphire, glass, or acrylic.",
  },
  {
    term: "Dial",
    definition: "The face of the watch where the time is displayed with hour markers.",
  },
  {
    term: "GMT",
    definition:
      "Greenwich Mean Time. A GMT watch typically has an additional 24-hour hand for tracking a second time zone.",
  },
  {
    term: "In-House Movement",
    definition:
      "A watch movement designed and manufactured by the brand itself, rather than sourced from another maker.",
  },
  {
    term: "Lug",
    definition:
      "The protruding parts of the watch case where the bracelet or strap is attached.",
  },
  {
    term: "Lugs",
    definition:
      "The protruding arms on the watch case to which the strap or bracelet is attached.",
  },
  {
    term: "Lume",
    definition:
      "The luminous material (usually tritium or Super-LumiNova) applied to hands and markers for visibility in darkness.",
  },
  {
    term: "Manual Movement",
    definition: "A mechanical watch that must be manually wound to keep it running.",
  },
  {
    term: "Perpetual Rotor",
    definition: "The weighted rotor in an automatic watch that winds the mainspring.",
  },
  {
    term: "Quartz Movement",
    definition:
      "A battery-powered movement using a quartz crystal to maintain accurate timekeeping.",
  },
  {
    term: "Reference Number",
    definition:
      "The manufacturer's designation for a specific watch model, used to identify and differentiate variants.",
  },
  {
    term: "Seconds Hand",
    definition: "The thin hand on a watch dial that indicates seconds.",
  },
  {
    term: "Subdial",
    definition: "A smaller dial within the main watch face, typically used in chronographs.",
  },
  {
    term: "Tourbillon",
    definition:
      "A complex mechanism that improves accuracy by constantly rotating the balance wheel and hairspring.",
  },
  {
    term: "Water Resistance",
    definition:
      "The watch's ability to withstand water pressure at various depths, measured in meters or feet.",
  },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState("");

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
  );

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
            Reference
          </p>
          <h1 className="text-5xl font-display">Watch Glossary</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Essential watch terminology and definitions
          </p>
        </div>

        <Card className="p-6 border border-border">
          <Input
            placeholder="Search glossary terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-3">
            {filteredTerms.length} results
          </p>
        </Card>

        <div className="space-y-3">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item, index) => (
              <Card
                key={index}
                className="p-6 border border-border hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-display text-lg mb-2">{item.term}</h3>
                <p className="text-sm text-muted-foreground">{item.definition}</p>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center border border-border">
              <p className="text-muted-foreground">No terms found. Try a different search.</p>
            </Card>
          )}
        </div>

        <Card className="p-8 border border-border bg-muted/30">
          <h3 className="font-display text-xl mb-4">More Learning Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" asChild>
              <Link href="/info/about-watches">About Watches</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/info/guides">Watch Guides</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/info/authentication">Authentication</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
