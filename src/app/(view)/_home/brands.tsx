import { DotsThreeOutlineIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

export default function Brands() {
  return (
    <section className="p-12 border-t">
      <div className="">
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          Explore
        </p>
        <h2 className="text-4xl font-display">Browse by Brand</h2>
      </div>

      <div className="w-full grid grid-cols-3 lg:grid-cols-6 mt-12 gap-6 lg:gap-0 ">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <div
              className="lg:aspect-square flex flex-col justify-center items-center gap-4 border border-transparent hover:border-primary/20 hover:bg-primary/5 active:bg-primary/10 transition-all duration-300 cursor-pointer"
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
            >
              {index === 5 ? (
                <DotsThreeOutlineIcon className="text-primary" size={32} />
              ) : (
                <Image
                  src="/rolex.webp"
                  height={200}
                  width={200}
                  alt="Rolex"
                  className="object-contain size-34"
                />
              )}
              <h5 className="text-xl font-display">
                {index === 5 ? "More" : "Rolex"}
              </h5>

              <p className="text-sm text-muted-foreground font-light">
                115 listing
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}
