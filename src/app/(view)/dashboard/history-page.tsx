import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const mockWatches = [
  {
    id: 1,
    brand: "Rolex",
    model: "Submariner Date 126610LN",
    year: "2020",
    price: "₹9,50,000",
    trend: "+4%",
    condition: "Mint",
    location: "Delhi NCR",
  },
  {
    id: 2,
    brand: "Omega",
    model: "Seamaster 300M",
    year: "2019",
    price: "₹7,20,000",
    trend: "+2%",
    condition: "Excellent",
    location: "Mumbai",
  },
  {
    id: 3,
    brand: "Tudor",
    model: "Black Bay Chronograph",
    year: "2021",
    price: "₹5,45,000",
    trend: "+5%",
    condition: "Good",
    location: "Bangalore",
  },
  {
    id: 4,
    brand: "Seiko",
    model: "Prospex Diver",
    year: "2020",
    price: "₹1,85,000",
    trend: "+3%",
    condition: "Mint",
    location: "Pune",
  },
  {
    id: 5,
    brand: "Citizen",
    model: "Eco-Drive",
    year: "2022",
    price: "₹95,000",
    trend: "+1%",
    condition: "Like New",
    location: "Chennai",
  },
  {
    id: 6,
    brand: "Breitling",
    model: "Avenger Chronograph",
    year: "2018",
    price: "₹8,25,000",
    trend: "+7%",
    condition: "Good",
    location: "Delhi NCR",
  },
  {
    id: 7,
    brand: "Breitling",
    model: "Avenger Chronograph",
    year: "2018",
    price: "₹8,25,000",
    trend: "+7%",
    condition: "Good",
    location: "Delhi NCR",
  },
  {
    id: 8,
    brand: "Breitling",
    model: "Avenger Chronograph",
    year: "2018",
    price: "₹8,25,000",
    trend: "+7%",
    condition: "Good",
    location: "Delhi NCR",
  },
];
export default function HistoryPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 divide-x! divide-y!">
      {mockWatches.map((watch) => (
        <Card
          key={watch.id}
          className="border-0 ring-0! border-border hover:bg-muted/50 transition-colors overflow-hidden flex flex-col pt-0! last-of-type:border-b"
        >
          <div className="bg-muted/30 h-48 flex items-center justify-center">
            <Image
              src="/rolex.webp"
              alt="Watch"
              height={100}
              width={140}
              className="object-contain h-full p-6"
            />
          </div>

          <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[10px] uppercase text-primary/50 mb-1">
                  {watch.brand}
                </p>
                <h3 className="font-display text-lg">{watch.model}</h3>
              </div>
              {/* <Button variant="ghost" size="sm">
                      <HeartIcon size={16} />
                    </Button> */}
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
              <Badge variant="secondary" className="text-[10px] text-white">
                {watch.year}
              </Badge>
              <Badge variant="secondary" className="text-[10px] text-white">
                {watch.condition}
              </Badge>
              <Badge variant="secondary" className="text-[10px] text-white">
                {watch.location}
              </Badge>
            </div>

            <div className="flex-1">
              <h4 className="font-display text-2xl">{watch.price}</h4>
              <p className="text-sm text-green-600">{watch.trend}</p>
            </div>
            <p className="text-sm text-end text-muted-foreground">
              Date: {new Date().toLocaleDateString()}
            </p>
            {/* 
            <Button asChild className="w-full">
              <Link href={`/watch/${watch.id}`}>View Details</Link>
            </Button> */}
          </div>
        </Card>
      ))}
    </div>
  );
}
