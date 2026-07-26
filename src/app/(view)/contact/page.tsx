"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "general", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 z-40 bg-background">
        <div className="h-16 flex items-center px-12">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeftIcon size={16} className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-12 space-y-12">
        <div>
          <p className="text-[10px] uppercase text-primary/50 tracking-[0.2rem]">
            Support
          </p>
          <h1 className="text-5xl font-display">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mt-4">
            We&apos;re here to help with any questions or concerns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card className="p-6 border border-border">
              <MailIcon size={24} className="mb-4 text-primary" />
              <h3 className="font-display text-lg mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-2">
                support@patina.in
              </p>
              <p className="text-xs text-muted-foreground">
                We&apos;ll respond within 24 hours
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <PhoneIcon size={24} className="mb-4 text-primary" />
              <h3 className="font-display text-lg mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-2">
                +91 (0) 8800 PATINA
              </p>
              <p className="text-xs text-muted-foreground">
                Mon-Fri, 9:00 AM - 6:00 PM
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <MapPinIcon size={24} className="mb-4 text-primary" />
              <h3 className="font-display text-lg mb-2">Office</h3>
              <p className="text-sm text-muted-foreground">
                Ground Floor, Plaza Towers
                <br />
                Connaught Place, New Delhi
                <br />
                Delhi 110001, India
              </p>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-8 border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-wider">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-wider">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs uppercase tracking-wider">
                    Subject
                  </Label>
                  <Select value={formData.subject} onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, subject: value }))
                  }>
                    <SelectTrigger id="subject">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="authentication">Authentication Help</SelectItem>
                      <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                      <SelectItem value="listing">Listing Help</SelectItem>
                      <SelectItem value="bug">Report a Bug</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-wider">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>

                {submitted && (
                  <div className="bg-green-900/20 border border-green-800 text-green-800 px-4 py-3 rounded-lg text-sm">
                    Thank you for your message. We&apos;ll get back to you soon!
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
