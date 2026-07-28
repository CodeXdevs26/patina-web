"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      setSubmitted(true);
      console.log("Password reset email sent to:", email);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircleIcon size={64} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-display">Check Your Email</h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent password reset instructions to{" "}
              <span className="text-foreground font-semibold">{email}</span>
            </p>
          </div>

          <Alert className="bg-muted/50 border-border">
            <AlertDescription className="text-xs">
              If you don&apos;t see the email within a few minutes, check your
              spam folder or try requesting another reset.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Try Another Email
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full">
              <Link href="/auth/login">Back to Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[10px] tracking-[0.2rem] text-primary/50 uppercase">
            Reset Password
          </p>
          <h1 className="text-4xl font-display">Forgot Password?</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you instructions to reset your
            password
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
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={error ? "border-destructive" : ""}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Send Reset Link
          </Button>
        </form>

        <div className="border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
