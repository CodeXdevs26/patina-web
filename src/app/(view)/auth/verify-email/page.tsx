"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";

const OTP_LENGTH = 6;

function VerifyEmailForm() {
  const [codes, setCodes] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [verified, setVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [{ token }, setCookie] = useCookies(['token'])
  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: (): Promise<{
      ok: boolean
      message: string
      data: {
        access_token: string
        token_type: string
        user: {
          id: number
          name: string
          email: string
          email_verified_at: string
          phone_number: any
          company_name: any
          razorpay_account_id: any
          kyc_status: string
          kyc_rejection_reason: any
          account_standing: string
          available_listing_credits: number
          average_rating: string
          total_reviews: number
          avatar: string
          created_at: string
          updated_at: string
        }
      }
    }> => {
      return howl(`/auth/verify`, {
        method: "POST",
        body: { email, otp: codes.join("") },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      toast.success(res.message ?? "Success!");
      setVerified(true);
      setCookie('token', res.data.access_token, { path: '/' });
      window.location.href = "/auth/kyc";
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const focusInput = (index: number) => {
    document.getElementById(`code-${index}`)?.focus();
  };

  // Fills boxes starting at `start` with the digits found in `raw`
  const fillFrom = (start: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return;

    const newCodes = [...codes];
    let i = start;
    for (const d of digits) {
      if (i >= OTP_LENGTH) break;
      newCodes[i] = d;
      i++;
    }
    setCodes(newCodes);
    focusInput(Math.min(i, OTP_LENGTH - 1));
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value === "") {
      const newCodes = [...codes];
      newCodes[index] = "";
      setCodes(newCodes);
      return;
    }
    fillFrom(index, value);
  };

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    fillFrom(index, e.clipboardData.getData("text"));
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (codes.join("").length === OTP_LENGTH) mutate();
  };

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircleIcon size={64} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-display">Email Verified</h1>
            <p className="text-sm text-muted-foreground">
              Your email has been successfully verified. You can now access all
              features of PATINA.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to KYC page in 5 seconds...
            </p>
          </div>

          {/* <Button asChild size="lg" className="w-full">
            <Link href="/auth/login">Continue to Login</Link>
          </Button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[10px] tracking-[0.2rem] text-primary/50 uppercase">
            Verification
          </p>
          <h1 className="text-4xl font-display">Verify Your Email</h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a 6-digit code to your email address. Enter it below
            to verify your account.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">
              Verification Code
            </Label>
            <div className="flex gap-2 justify-center">
              {codes.map((code, index) => (
                <Input
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length OTP boxes
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  placeholder="•"
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onPaste={(e) => handlePaste(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 text-center text-lg font-display"
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Code expires in:{" "}
              <span
                className={
                  timeLeft < 60 ? "text-destructive font-semibold" : ""
                }
              >
                {formatTime(timeLeft)}
              </span>
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={codes.join("").length !== OTP_LENGTH || isPending}
          >
            {isPending ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <div className="border-t pt-6 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the code?
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-primary"
          >
            Resend Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailForm />
    </Suspense>
  );
}