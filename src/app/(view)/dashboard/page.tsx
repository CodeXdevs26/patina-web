"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  TrendUpIcon,
  GearIcon as CogIcon,
} from "@phosphor-icons/react/dist/ssr";
import HistoryPage from "./history-page";
import ProfilePage from "./profile-page";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = React.useState("profile");
  return (
    <div className="min-h-screen bg-background pt-12">
      <div className="px-12 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {currentPage === "portfolio" && <HistoryPage />}
          {currentPage === "profile" && <ProfilePage />}
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
              Quick Actions
            </p>
            <h3 className="text-2xl font-display mb-4">Get Started</h3>
          </div>

          <div className="space-y-3">
            <Button
              variant={currentPage === "portfolio" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setCurrentPage("portfolio")}
            >
              <TrendUpIcon size={16} className="mr-2" />
              Purchase History
            </Button>
            <Button
              variant={currentPage === "profile" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setCurrentPage("profile")}
            >
              <CogIcon size={16} className="mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
