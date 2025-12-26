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
    <footer className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center">
              <div className="relative flex h-[60px] w-[200px] items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md">
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
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {data.company.description}
            </p>
            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Connect With Us
              </p>
              <ul className="flex gap-4">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                    >
                      <span className="sr-only">{label}</span>
                      <Icon className="h-5 w-5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QuickLinksInfo.map(({ text, href }) => (
                <li key={text}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  {isAddress ? (
                    <address className="text-sm text-gray-600 dark:text-gray-400 not-italic">
                      {text}
                    </address>
                  ) : (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; 2025 {data.company.name}. All rights reserved.
            </p>
            <p className="text-sm text-blue-800 underline dark:text-gray-400 mt-4 md:mt-0">
              Terms and Conditions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
