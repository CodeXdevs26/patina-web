"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  TrendUpIcon,
  GearIcon as CogIcon,
} from "@phosphor-icons/react/dist/ssr";
import HistoryPage from "./history-page";
import ProfilePage from "./profile-page";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { howl } from "@/lib/utils";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = React.useState("profile");
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<{
      ok: boolean;
      message: string;
      data: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        phone_number: any;
        company_name: any;
        razorpay_account_id: any;
        kyc_status: string;
        kyc_rejection_reason: any;
        account_standing: string;
        average_rating: string;
        total_reviews: number;
        avatar: string;
        created_at: string;
        updated_at: string;
        roles: Array<{
          id: number;
          name: string;
          guard_name: string;
          created_at: string;
          updated_at: string;
          pivot: {
            model_type: string;
            model_id: number;
            role_id: number;
          };
        }>;
        permissions: Array<string>;
      };
    }> => {
      return howl("/profile/me", {
        token,
      });
    },
  });
  return (
    <div className="min-h-screen bg-background pt-12">
      <div className="px-12 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {currentPage === "portfolio" && <HistoryPage />}
          {currentPage === "profile" && !isPending && (
            <ProfilePage data={data?.data} />
          )}
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
