
"use client";

import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { howl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, XAxis } from "recharts";

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function Market() {
  const { data } = useQuery({
    queryKey: ["index-feed"],
    queryFn: async (): Promise<{
      ok: boolean;
      message: string;
      data: {
        overall_performance: {
          current_value: number;
          momentum_percentage: number;
          chart_data: Array<{
            date: string;
            price: number;
          }>;
        };
        feed: Array<{
          brand: string;
          model: string;
          reference_number: string;
          size: string;
          display_name: string;
          current_market_price: number;
          momentum_1m_percentage: number;
          value_badge: string;
          mini_chart_data: Array<{
            date: string;
            price: number;
          }>;
        }>;
      };
    }> => {
      return howl("/market/feed");
    },
  });

  return (
    <section className="p-12">
      <div>
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          Price Intelligence
        </p>

        <h2 className="text-4xl font-display">
          India grey market index
        </h2>
      </div>

      <div className="w-full grid grid-cols-4 mt-12 divide-x">
        {data?.data?.feed?.slice(0, 4).map((watch) => {
          const hasPrice = watch.current_market_price > 0;
          const hasChartData = watch.mini_chart_data?.length > 0;

          return (
            <div
              className="flex flex-col relative justify-start first-of-type:border-l-transparent! items-center gap-4 border-y-transparent border-r-transparent border hover:border-primary/20! hover:bg-primary/5 active:bg-primary/10 transition-all duration-300 cursor-pointer"
              key={watch.reference_number}
            >
              <div className="w-full p-4">
                <p className="text-[10px] uppercase text-primary">
                  {watch.brand || "n/a"}
                </p>

                <h5 className="text-xl font-display">
                  {watch.model || "n/a"}
                </h5>

                <div className="mt-4 flex flex-row justify-between items-center">
                  <div className="flex flex-col justify-end items-start w-full">
                    <p className="text-2xl text-muted-foreground font-display">
                      {hasPrice
                        ? `₹ ${watch.current_market_price.toLocaleString(
                          "en-IN",
                        )
                        } `
                        : "n/a"}
                    </p>

                    <div className="text-[10px] text-muted-foreground/50 space-x-2 mt-2">
                      <span>
                        {hasPrice
                          ? `${watch.momentum_1m_percentage.toFixed(1)}% `
                          : "n/a"}
                      </span>

                      <Badge
                        className={
                          hasPrice
                            ? "bg-green-900/20 border-green-800 text-green-800 text-[10px]"
                            : "bg-muted/20 border-muted text-muted-foreground text-[10px]"
                        }
                      >
                        {watch.value_badge || "n/a"}
                      </Badge>
                    </div>

                    {hasChartData && (
                      <ChartContainer
                        className="h-18 mt-8 w-full"
                        config={chartConfig}
                      >
                        <AreaChart
                          accessibilityLayer
                          data={watch.mini_chart_data}
                          margin={{
                            top: 4,
                            right: 0,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient
                              id={`price - gradient - ${watch.reference_number.replace(
                                /[^a-zA-Z0-9_-]/g,
                                "-",
                              )
                                } `}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="var(--color-price)"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="var(--color-price)"
                                stopOpacity={0.01}
                              />
                            </linearGradient>
                          </defs>

                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            hide
                            axisLine={false}
                          />

                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />

                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke="var(--color-price)"
                            strokeWidth={1.5}
                            fill={`url(#price - gradient - ${watch.reference_number.replace(
                              /[^a-zA-Z0-9_-]/g,
                              "-",
                            )
                              })`}
                            dot={false}
                            activeDot={{
                              r: 3,
                              fill: "var(--color-price)",
                              strokeWidth: 0,
                            }}
                          />
                        </AreaChart>
                      </ChartContainer>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
