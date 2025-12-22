"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Navigation,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-br from-green-200/30 to-blue-200/30 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-tr from-purple-200/25 to-pink-200/25 dark:from-purple-900/15 dark:to-pink-900/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-bl from-yellow-200/20 to-orange-200/20 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`text-center space-y-6 mb-16 lg:mb-20 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Get In Touch
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-balance leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Ready to Start Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Driving Journey?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Get in touch with us today to book your first lesson or ask any
            questions about our courses. We're here to help you every step of
            the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+61 2 3456 7890",
                  color: "from-green-500 to-green-600",
                  bgColor: "bg-green-50 dark:bg-green-950/20",
                  iconColor: "text-green-600",
                  available: "Mon-Sun: 7AM-7PM",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "info@actcapitaldriving.com.au",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-blue-50 dark:bg-blue-950/20",
                  iconColor: "text-blue-600",
                  available: "24/7 Response",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "Lort Place, Chisholm, ACT",
                  color: "from-red-500 to-red-600",
                  bgColor: "bg-red-50 dark:bg-red-950/20",
                  iconColor: "text-red-600",
                  available: "Easy Access Location",
                },
                {
                  icon: Clock,
                  title: "Hours",
                  content: "Mon-Sun: 7AM-7PM",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "bg-purple-50 dark:bg-purple-950/20",
                  iconColor: "text-purple-600",
                  available: "Flexible Scheduling",
                },
              ].map((contact, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <CardContent className="relative p-6 space-y-4">
                    {/* Icon and Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-lg ${contact.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <contact.icon
                          className={`w-6 h-6 ${contact.iconColor}`}
                        />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-slate-100/80 dark:bg-slate-700/80"
                      >
                        {contact.available}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
                        {contact.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                        {contact.content}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/booking" className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Book Your Lesson Now
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Send a Message
                  </Link>
                </Button>
              </div>

              {/* Additional CTA */}
              <div className="text-center lg:text-left">
                <Button
                  size="lg"
                  variant="ghost"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <a
                    href={`https://www.google.com/maps/place/ACT+Capital+Driving+School/@-35.4208918,149.1153875,940m/data=!3m1!1e3!4m6!3m5!1s0x6b164bda5d8a8031:0x6e141b9bf6b2fdb8!8m2!3d-35.4207218!4d149.1151493!16s%2Fg%2F11zj0f3ym9?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Or call us directly for immediate assistance</span>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div
            className={`relative transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 shadow-2xl">
                <img
                  src="/map-of-lort-place-chisholm-act-australia-with-loca.jpg"
                  alt="Map showing ACT Capital Driving School location in Lort Place, Chisholm, ACT"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Location Card */}
              <Card className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-0 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        ACT Capital Driving School
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        Lort Place, Chisholm, ACT 2905
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Mon-Sun: 7AM-7PM
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Easy Parking
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-4 right-4 w-full h-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl blur-xl"></div>
            <div className="absolute -z-20 -top-2 -right-2 w-full h-full bg-gradient-to-br from-green-200/20 to-blue-200/20 dark:from-green-900/10 dark:to-blue-900/10 rounded-3xl blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
