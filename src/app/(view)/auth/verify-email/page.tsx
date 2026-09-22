"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const navig = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: () => {
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
      navig.push("/auth/login");
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

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      // Auto-focus to next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = codes.join("");
    if (fullCode.length === 6) {
      setVerified(true);
      console.log("Email verified with code:", fullCode);
    }
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
          </div>

          <Button asChild size="lg" className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
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
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  placeholder="•"
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
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
            disabled={codes.join("").length !== 6 || isPending}
            onClick={() => mutate()}
          >
            Verify Email
          </Button>
        </form>

        <div className="border-t pt-6 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the code?
          </p>
          <Button variant="ghost" size="sm" className="text-primary">
            Resend Code
          </Button>
        </div>
      </div>
    </div>
  );
}
