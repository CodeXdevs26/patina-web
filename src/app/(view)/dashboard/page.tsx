"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  TrendUpIcon,
  GearIcon as CogIcon,
  DoorOpenIcon,
} from "@phosphor-icons/react/dist/ssr";
import HistoryPage from "./history-page";
import ProfilePage from "./profile-page";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { howl } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = React.useState("profile");
  const [{ token }, , removeToken] = useCookies(["token"]);
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <DoorOpenIcon size={16} className="mr-2" />
                  Log Out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to log out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be logged out of your account and will need to log
                    back in to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go Back</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => {
                      try {
                        removeToken("token");
                        window.location.assign("/");
                      } catch (e) {
                        console.error("Error logging out:", e);
                      }
                    }}
                  >
                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
