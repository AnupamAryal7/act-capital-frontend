import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { PopularCoursesSection } from "@/components/sections/popular-courses-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="border-2 border-green-500">
          <HeroSection />
        </div>
        <div className="border-2 border-blue-500">
          <WhyChooseUsSection />
        </div>
        <div className="border-2 border-yellow-500">
          <PopularCoursesSection />
        </div>
        <div className="border-2 border-green-500">
          <TestimonialsSection />
        </div>
        <div className="border-2 border-blue-500">
          <ContactSection />
        </div>
      </main>
      <div className="border-2 border-yellow-500">
        <Footer />
      </div>
    </div>
  );
}
