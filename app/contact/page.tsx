"use client";

import type React from "react";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-5 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold font-poppins text-balance">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground text-pretty font-serif">
                Ready to start your driving journey? Have questions about our
                courses? We're here to help you every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Send us a Message
                  </CardTitle>
                  <p className="text-muted-foreground font-serif text-xl">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold">Message Sent!</h3>
                      <p className="text-muted-foreground font-serif">
                        Thank you for contacting us. We'll get back to you
                        within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="Enter your email address"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select
                          onValueChange={(value) =>
                            handleInputChange("subject", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="booking">
                              Booking a Lesson
                            </SelectItem>
                            <SelectItem value="course-info">
                              Course Information
                            </SelectItem>
                            <SelectItem value="pricing">
                              Pricing Inquiry
                            </SelectItem>
                            <SelectItem value="test-prep">
                              Test Preparation
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="">
                {/* Contact Details */}
                <Card className="border-0 shadow-sm">
                  <CardContent className=" space-y-6">
                    <h3 className="text-xl font-semibold">
                      Contact Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Phone</div>
                          <div className="text-muted-foreground">
                            +61 420 991 533
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Email</div>
                          <div className="text-muted-foreground">
                            Jeevan.pandey68@gmail.com
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Address</div>
                          <div className="text-muted-foreground">
                            Lort Place, Chisholm, ACT 2905
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Operating Hours</div>
                          <div className="text-muted-foreground">
                            Monday - Sunday: 7:00 AM - 7:00 PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Follow Us</h3>
                    <p className="text-muted-foreground text-sm">
                      Stay connected for driving tips, updates, and special
                      offers.
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          target="_blank"
                          href="https://www.facebook.com/profile.php?id=61577869336902"
                          aria-label="Facebook"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-sm">
                  <CardContent>
                    <div>
                      <h1 className="font-poppins text-2xl">Quick Actions</h1>
                      <div className="flex gap-6">
                        <Link href="">
                          <Image src="/contact-icons/call_icon" alt="" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-20  bg-muted/30  ">
          {/* Map */}
          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg  flex justify-center items-center ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d149.1153875!3d-35.4208918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b164bda5d8a8031%3A0x6e141b9bf6b2fdb8!2sACT%20Capital%20Driving%20School!5e0!3m2!1sen!2sau!4v1691234567890!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
