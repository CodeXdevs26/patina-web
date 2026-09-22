"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function ProfilePage({
  data,
}: {
  data?: {
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
}) {
  const [fullName, setFullName] = useState(data?.name ?? "");
  const [email, setEmail] = useState(data?.email ?? "");
  const [phone, setPhone] = useState(data?.phone_number ?? "");
  const [city, setCity] = useState("Delhi");
  const [state, setState] = useState("Delhi");
  const [status, setStatus] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", {
      name: fullName,
      email,
      phone,
      city,
      state,
    });
    setStatus("Profile updated successfully!");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
          Account Settings
        </p>
        <h1 className="text-4xl font-display">Profile</h1>
      </div>

      <Card className="p-8 border border-border space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <Label className="text-xs uppercase tracking-wider">
                Full Name
              </Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider">
              Phone Number
            </Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
          </div>

          <Separator />

          <div className="pt-4">
            <h3 className="font-display text-xl mb-6">Location</h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">City</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">
                  State
                </Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg">
              Save Changes
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
          </div>

          {status && (
            <div className="bg-green-900/20 border border-green-800 text-green-800 px-4 py-3 rounded-lg text-sm">
              {status}
            </div>
          )}
        </form>
      </Card>

      <Card className="p-8 border border-border space-y-4">
        <h3 className="font-display text-xl">Security</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password | PATINA</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button>Save Password</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/auth/login">Sign In on Another Device</Link>
        </Button> */}
      </Card>
    </div>
  );
}
