import Header from "./_home/header";
import Marquee from "react-fast-marquee";

import Brands from "./_home/brands";
import Arrival from "./_home/arrival";
import Market from "./_home/market";
import Verif from "./_home/verif";
import DataGrid from "./_home/data-grid";

export default function Page() {
  return (
    <>
      <Header />
      <Marquee speed={30} pauseOnHover>
        {Array(10)
          .fill({
            title: "Rolex Submariner",
            price: "₹ 1,20,000",
            trend: "+6.5%",
          })
          .map((item, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: sss
              key={index}
              className="flex flex-row gap-4 border-r p-3 items-center"
            >
              <h3 className="text-xs text-muted-foreground/50">{item.title}</h3>
              <p className="text-xl text-muted-foreground font-display">
                {item.price}
              </p>
              <p className="text-sm text-green-800">{item.trend}</p>
            </div>
          ))}
      </Marquee>
      <Brands />
      <Arrival />
      <Market />
      <Verif />
      <div className="py-24 bg-muted/30 text-center">
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          Why pre-owned watches
        </p>
        <h2 className="text-5xl font-display my-6">
          "The pre-owned watch market is set to <br /> become the industry's
          fastest-growing <br /> segment, reaching{" "}
          <span className="text-primary">$29–32 billion</span> in sales by{" "}
          <br />
          2025."
        </h2>
        <p className="text-[10px] uppercase text-muted-foreground/50 tracking-[0.2rem]">
          McKinsey & Company · Business of Fashion
        </p>
      </div>
      <DataGrid />
      <div className="p-12 bg-muted/30">
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          For dealers
        </p>
        <h2 className="text-5xl font-display my-6">
          Bulk listings, lower commissions,
          <br />
          and a Dealer Verified badge.
        </h2>
        <p className="text-xs text-muted-foreground/50">
          Dealers get access to bulk listing tools, a pricing insights
          dashboard, priority placement, and commissions as low as 4%. Starting
          at ₹10,000/month.
        </p>
      </div>
    </>
  );
}
