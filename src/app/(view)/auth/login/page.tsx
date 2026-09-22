"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [{ token }, setCookie] = useCookies(["token"]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (): Promise<{
      ok: boolean;
      message: string;
      data: {
        access_token: string;
        token_type: string;
        user: {
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
          permissions: Array<any>;
        };
      };
    }> => {
      return howl(`/auth/login`, {
        method: "POST",
        body: { email, password },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      try {
        setCookie("token", res.data.access_token, { path: "/" });
      } catch (e) {
      } finally {
        window.location.href = "/";
      }
    },
  });

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[10px] tracking-[0.2rem] text-primary/50 uppercase">
            Sign In
          </p>
          <h1 className="text-4xl font-display">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Access your PATINA account and explore premium timepieces
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="text-xs uppercase tracking-wider"
              >
                Password
              </Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="rememberMe" className="text-xs cursor-pointer">
              Remember me
            </Label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>

        <div className="border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
