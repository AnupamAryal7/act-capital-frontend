import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Clock,
  Award,
  Users,
  Sparkles,
  Send,
  Heart,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-green-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-600/5 to-orange-600/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    ACT Capital
                  </h3>
                  <p className="text-sm text-slate-400">Driving School</p>
                </div>
              </Link>

              <p className="text-slate-300 leading-relaxed max-w-md">
                Empowering drivers across Canberra with professional instruction,
                modern vehicles, and a commitment to road safety excellence.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-green-600/20 text-green-300 border border-green-600/30 hover:bg-green-600/30 transition-colors duration-300">
                <Award className="w-3 h-3 mr-1" />
                Licensed & Insured
              </Badge>
              <Badge className="bg-blue-600/20 text-blue-300 border border-blue-600/30 hover:bg-blue-600/30 transition-colors duration-300">
                <Users className="w-3 h-3 mr-1" />
                500+ Happy Students
              </Badge>
              <Badge className="bg-purple-600/20 text-purple-300 border border-purple-600/30 hover:bg-purple-600/30 transition-colors duration-300">
                <Sparkles className="w-3 h-3 mr-1" />
                95% Pass Rate
              </Badge>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-blue-300 transition-all duration-300 rounded-lg"
                asChild
              >
                <Link href="#" aria-label="Facebook" className="flex items-center justify-center">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-pink-300 transition-all duration-300 rounded-lg"
                asChild
              >
                <Link href="#" aria-label="Instagram" className="flex items-center justify-center">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-blue-400 transition-all duration-300 rounded-lg"
                asChild
              >
                <Link href="#" aria-label="Twitter" className="flex items-center justify-center">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/courses", label: "Our Courses" },
                { href: "/booking", label: "Book a Lesson" },
                { href: "/testimonials", label: "Testimonials" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Phone</p>
                  <p className="text-slate-300 text-sm">+61 2 3456 7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="text-slate-300 text-sm">info@actcapitaldriving.com.au</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Location</p>
                  <p className="text-slate-300 text-sm">Lort Place, Chisholm, ACT</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Hours</p>
                  <p className="text-slate-300 text-sm">Mon-Sun: 7AM-7PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="text-center space-y-4">
            <h4 className="text-xl font-semibold text-white">Stay Updated</h4>
            <p className="text-slate-300 max-w-md mx-auto">
              Get driving tips, special offers, and the latest updates from ACT Capital Driving School.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 flex-1"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-slate-400">
            <span>© 2024 ACT Capital Driving School. Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for safe driving.</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
