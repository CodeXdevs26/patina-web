import React from "react";

export default function Page() {
  return (
    <>
      <header className="h-[calc(100vh-4rem)] divide-x w-full border-b grid grid-cols-2">
        <div className="h-full flex flex-col justify-center items-center">
          <div className="w-full px-[6%] space-y-6">
            <p className="text-[8px] tracking-[0.2rem] text-primary flex gap-4 items-center uppercase">
              <div className="border-t border-primary/50 w-8" />
              India's pre-owned watch market
            </p>
            <h1 className="text-6xl font-bold leading-[1.2]">
              Where watches <br /> become <br />
              <span className="text-primary">assets.</span>
            </h1>
          </div>
        </div>
        <div className="h-full w-full bg-radial from-[#110f0c]  to-[#111110]  grid grid-rows-2 divide-y">
          <div className=""></div>
          <div className="grid grid-cols-2 divide-x w-full">
            <div className=""></div>
            <div className=""></div>
          </div>
        </div>
      </header>
      lol
    </>
  );
}
