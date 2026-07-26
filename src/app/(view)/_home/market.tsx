"use client";
import { Badge } from "@/components/ui/badge";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const description = "A bar chart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
} satisfies ChartConfig;
export default function Market() {
  return (
    <section className="p-12">
      <div className="">
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          Price Intelligence
        </p>
        <h2 className="text-4xl font-display">India grey market index</h2>
      </div>
      <div className="w-full grid grid-cols-4 mt-12 divide-x">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div
              className="flex flex-col relative justify-start first-of-type:border-l-transparent! items-center gap-4 border-y-transparent border-r-transparent border hover:border-primary/20! hover:bg-primary/5 active:bg-primary/10 transition-all duration-300 cursor-pointer"
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
            >
              <div className="w-full p-4">
                <p className="text-[10px] uppercase text-primary">ROLEX</p>
                <h5 className="text-xl font-display">Submariner Date</h5>
                <div className="mt-4 flex flex-row justify-between items-center">
                  <div className="flex flex-col justify-end items-start">
                    <p className="text-2xl text-muted-foreground font-display">
                      ₹ 1,20,000
                    </p>
                    <div className="text-[10px] text-muted-foreground/50 space-x-2 mt-2">
                      <span>+2.3%</span>
                      <Badge className="bg-green-900/20 border-green-800 text-green-800 text-[10px]">
                        −4% vs fair market
                      </Badge>
                    </div>
                    <ChartContainer
                      className="h-18 mt-8 w-full"
                      config={chartConfig}
                    >
                      <BarChart accessibilityLayer data={chartData}>
                        {/* <CartesianGrid vertical={false} /> */}
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          hide
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                          dataKey="desktop"
                          fill="var(--color-desktop)"
                          radius={0}
                          barSize={12}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
