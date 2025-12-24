import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const data = {
  facebookLink: "https://www.facebook.com/profile.php?id=61577869336902",
  instaLink: "https://www.instagram.com/anupamaryal7/",
  whatsappLink: `https://wa.me/+610420991533?text=Hello!%20I%20need%20help%20with%20my%20driving%20lessons.`,

  QuickLinks: {
    About: "/about",
    Book: "/quick_bookings",
    View: "/courses",
    Testimonials: "/testimonials",
    faqs: "/faqs",
  },

  contact: {
    email: "Jeevan.pandey68@gmail.com",
    phone: "++61 0420991533",
    address: "ACT, Australia",
  },
  company: {
    name: "ACT Capital driving school",
    description:
      "An integreted platform for learning driving lessons and getting driving liscense. ",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
  { icon: MessageCircle, label: "Whatsapp", href: data.whatsappLink },
];

const QuickLinksInfo = [
  { text: "About Us", href: data.QuickLinks.About },
  { text: "Book Now", href: data.QuickLinks.Book },
  { text: "View all Courses", href: data.QuickLinks.View },
  { text: "Testimonials", href: data.QuickLinks.Testimonials },
  { text: "faq", href: data.QuickLinks.faqs },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-16 w-full place-self-end rounded-t-xl overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Company Info Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center group">
              <div className="relative flex h-[50px] sm:h-[60px] lg:h-[70px] w-[150px] sm:w-[180px] lg:w-[210px] items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-200/60 dark:group-hover:shadow-blue-800/60 group-hover:scale-105">
                <Image
                  src="/act_capital_logo_transparent.png"
                  alt="ACT Capital Logo"
                  height={200}
                  width={200}
                  className="h-full w-full object-contain p-2"
                  priority
                />
              </div>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 max-w-md text-sm sm:text-base leading-relaxed sm:max-w-xs">
              {data.company.description}
            </p>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Connect With Us
              </p>
              <ul className="flex gap-4">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <Link
                      prefetch={false}
                      href={href}
                      className="group flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md shadow-gray-200/50 dark:shadow-gray-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/60 dark:hover:shadow-blue-900/40 hover:scale-110 hover:-translate-y-1"
                    >
                      <span className="sr-only">{label}</span>
                      <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                Quick Links
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6 mx-auto sm:mx-0" />
              <ul className="space-y-3">
                {QuickLinksInfo.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="group inline-flex items-center text-sm text-gray-600 dark:text-gray-400 transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1"
                      href={href}
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-600 transition-all group-hover:w-6 group-hover:bg-blue-600 dark:group-hover:bg-blue-400" />
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                Get In Touch
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6 mx-auto sm:mx-0" />
              <ul className="space-y-4">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <a
                      className="group flex items-start justify-center sm:justify-start gap-3 text-sm transition-all duration-200 hover:translate-x-1"
                      href="#"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-200 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:scale-110">
                        <Icon className="h-4 w-4" />
                      </div>
                      {isAddress ? (
                        <address className="text-gray-600 dark:text-gray-400 not-italic pt-1.5 leading-relaxed transition-colors group-hover:text-gray-900 dark:group-hover:text-gray-200">
                          {text}
                        </address>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400 pt-1.5 leading-relaxed transition-colors group-hover:text-gray-900 dark:group-hover:text-gray-200">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-300 dark:border-gray-700 pt-8">
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              &copy; 2025 {data.company.name}
            </p>

            <p className="text-sm text-center sm:text-right">
              <span className="text-gray-600 dark:text-gray-400">
                All rights reserved.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
