"use client";
import React from "react";
import { cn, howl } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
export default function Navbar() {
  const [{ token }] = useCookies(["token"]);
  const navs = [
    {
      label: "Browse",
      href: "/browse",
    },
    {
      label: "Price index",
      href: "/pricing",
    },
    {
      label: "Dealers",
      href: "/dealers",
    },
  ];

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
    <>
      <div className="h-16 border-b flex justify-between px-12 items-center fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div
              className={cn(
                `text-2xl tracking-[0.3rem] text-muted-foreground shimmer font-display`,
              )}
            >
              PATINA
            </div>
          </Link>
          <div className="flex space-x-2 ml-8">
            {navs.map((nav) => (
              <Button
                key={nav.label}
                variant="ghost"
                className="text-muted-foreground/80 uppercase text-[10px] bg-transparent! hover:text-primary"
                asChild
              >
                <Link href={nav.href}>{nav.label}</Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {data?.data && (
            <Button
              variant="ghost"
              className="text-muted-foreground/80 uppercase text-[10px] bg-transparent! hover:text-primary"
              asChild
            >
              <Link href="/dashboard">My Account</Link>
            </Button>
          )}
          {!data?.data?.roles[0]?.name && (
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          )}
          <Button>Get the App</Button>
        </div>
      </div>
      <div className="h-16" />
    </>
  );
}
